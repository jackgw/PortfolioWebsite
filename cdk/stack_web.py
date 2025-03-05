from aws_cdk import Stack, SecretValue
from constructs import Construct
import aws_cdk.aws_s3 as s3
import aws_cdk.aws_codepipeline as codepipeline
import aws_cdk.aws_codepipeline_actions as codepipeline_actions
import aws_cdk.aws_codebuild as codebuild
import aws_cdk.aws_iam as iam

class WebStack(Stack):
    """
    # AWS deployment stack for the frontend website

    ## Simple Storage Service (S3) Bucket

    The S3 bucket where the static built website will be stored and served to the user.

    ## CI/CD with CodePipeline 
    
    Automatically builds and deploys the website when changes are made to the repository.

    Steps:
        - **Source**
            - Watches for changes to the `main` branch of this repository.
        - **Build**
            - builds the app into static files.
        - **Deploy**
            - Deploys static files to S3.
    """

    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # S3 Bucket to store the built React app
        self.bucket = s3.Bucket(
            self, 
            "Web", 
            website_index_document="index.html", 
            website_error_document="index.html",
            block_public_access=s3.BlockPublicAccess.BLOCK_ACLS
        )

        # Allow public access to bucket
        self.bucket.add_to_resource_policy(iam.PolicyStatement(
            actions=["s3:GetObject"],
            resources=[f"{self.bucket.bucket_arn}/*"],
            principals=[iam.ArnPrincipal("*")]
        ))

        #============== CI/CD ==============#

        ## SOURCE STAGE ##

        # CodePipeline Source (GitHub repository)
        source_output = codepipeline.Artifact()

        # GitHub authentication (Make sure to set up GitHub credentials in AWS Secrets Manager)
        source_action = codepipeline_actions.GitHubSourceAction(
            action_name="GitHubSource",
            owner="jackgw",
            repo="PortfolioWebsite",
            oauth_token=SecretValue.secrets_manager("github_auth_token"),
            output=source_output,
            branch="main",  # or the branch you want to use
        )

        ## BUILD STAGE ##

        # CodeBuild project to build the React app
        build_project = codebuild.PipelineProject(
            self,
            "WebBuildProject",
            build_spec=codebuild.BuildSpec.from_object({
                "version": "0.2",
                "phases": {
                    "install": {
                        "runtime-versions": {
                            "nodejs": "22"
                        },
                        "commands": [
                            "cd web",
                            "npm install -g npm@latest",
                            "npm install -g @angular/cli",
                            "npm install"
                        ]
                    },
                    "build": {
                        "commands": [
                            "npm run build"
                        ]
                    }
                },
                "artifacts": {
                    "files": [
                        "**/*"
                    ],
                    "base-directory": "web/dist"
                }
            }),
            environment=codebuild.BuildEnvironment(
                build_image=codebuild.LinuxBuildImage.AMAZON_LINUX_2_5
            )
        )

        # Grant permissions to CodeBuild to write to the S3 bucket
        self.bucket.grant_read_write(build_project.role)

        # CodeBuild Action
        build_stage = codepipeline_actions.CodeBuildAction(
            action_name="BuildReactApp",
            project=build_project,
            input=source_output,
            outputs=[codepipeline.Artifact("CompiledApp")],
        )

        ## DEPLOY STAGE ##

        # Deploy Action to S3
        deploy_stage = codepipeline_actions.S3DeployAction(
            action_name="DeployToS3",
            bucket=self.bucket,
            input=codepipeline.Artifact("CompiledApp"),
        )

        ## FULL PIPELINE ##

        # CodePipeline for continuous integration and deployment
        pipeline = codepipeline.Pipeline(self, "WebPipeline")

        # Add stages to the pipeline
        pipeline.add_stage(
            stage_name="Source",
            actions=[source_action]
        )
        pipeline.add_stage(
            stage_name="Build",
            actions=[build_stage]
        )
        pipeline.add_stage(
            stage_name="Deploy",
            actions=[deploy_stage]
        )