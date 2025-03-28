from aws_cdk import Stack, CfnOutput
from constructs import Construct
from stack_api import ApiStack
from stack_web import WebStack
import aws_cdk.aws_cloudfront as cloudfront
import aws_cdk.aws_cloudfront_origins as origins

API_VERSION = "v1"

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
                )
            }
        )

        # Output the CloudFront URL
        CfnOutput(self, "CloudFrontURL", value=cloudfront_distribution.domain_name)
