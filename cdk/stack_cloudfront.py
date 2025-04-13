from aws_cdk import Stack, CfnOutput, RemovalPolicy
from constructs import Construct
from stack_api import ApiStack
from stack_web import WebStack
import aws_cdk.aws_cloudfront as cloudfront
import aws_cdk.aws_cloudfront_origins as origins
import aws_cdk.aws_certificatemanager as acm
import aws_cdk.aws_s3_deployment as s3_deployment
import aws_cdk.aws_s3 as s3

API_VERSION = "v1"
DOMAIN = "jack-wharton.com"
DOMAIN_CERT_ARN = "arn:aws:acm:us-east-1:688567293248:certificate/0c93c897-a84a-429f-bc50-45b4a20911f9" # CF domain certs must be in us-east-1

class CloudFrontStack(Stack):
    """
    # Cloudfront distribution

    Cloudfront is responsible for making all the other services available to the
    user through a single shared domain.

    ## Routing Behaviors
    
    - /*            =>  Website S3 Bucket
    - /api/v1/*     =>  API Load Balancer
    """

    def __init__(
        self, 
        scope: Construct, 
        id: str, 
        *, 
        web_stack: WebStack, 
        api_stack: ApiStack, 
        **kwargs
    ) -> None:
        super().__init__(scope, id, **kwargs)

        # Create new bucket for storing static files needed for the API and Website
        static_bucket = s3.Bucket(
            self,
            "StaticBucket",
        )

        # Copy contents of the assets folder into the bucket
        # s3_deployment.BucketDeployment(
        #     self,
        #     "DeployStaticAssets",
        #     sources=[s3_deployment.Source.asset("../assets")],
        #     destination_bucket=static_bucket
        # )

        # # Get domain certificate
        certificate = acm.Certificate.from_certificate_arn(
            self,
            "CloudFrontCertificate",
            DOMAIN_CERT_ARN
        )

        # Define the CloudFront distribution
        cloudfront_distribution = cloudfront.Distribution(
            self, 
            "CloudFrontDistribution",
            default_behavior=cloudfront.BehaviorOptions(
                origin=origins.S3StaticWebsiteOrigin(web_stack.bucket),
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
            ),
            additional_behaviors={
                f"/api/{API_VERSION}/*": cloudfront.BehaviorOptions(
                    origin=origins.HttpOrigin(
                        api_stack.ecs_service.load_balancer.load_balancer_dns_name,
                        protocol_policy=cloudfront.OriginProtocolPolicy.HTTP_ONLY
                    ),
                    allowed_methods=cloudfront.AllowedMethods.ALLOW_ALL,
                    viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
                ),
                "/static/*": cloudfront.BehaviorOptions(
                    origin=origins.S3Origin(static_bucket),
                    viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
                )
            },
            domain_names= [DOMAIN],
            certificate=certificate
        )

        # Output the CloudFront URL
        CfnOutput(self, "CloudFrontURL", value=cloudfront_distribution.domain_name)
