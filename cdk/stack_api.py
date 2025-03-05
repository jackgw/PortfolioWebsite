from aws_cdk import Stack, SecretValue
from constructs import Construct
import aws_cdk.aws_ec2 as ec2
import aws_cdk.aws_ecs as ecs
import aws_cdk.aws_ecs_patterns as ecs_patterns
import aws_cdk.aws_codebuild as codebuild
import aws_cdk.aws_codepipeline as codepipeline
import aws_cdk.aws_codepipeline_actions as codepipeline_actions
import aws_cdk.aws_ecr as ecr

class ApiStack(Stack):
    """
    # AWS Deployment Stack for the backend API.

    ## Elastic Container Registry (ECR)

    The repository for storing the API docker images once they are built

    ## Elastic Container Service (ECS) + Fargate Spot

    The service responsible for managing the docker containers.
    This stack uses AWS Fargate for a serverless deployment strategy
    where resources are only allocated as they are needed.

    Fargate Spot is an additional configuration options where the service
    is made interruptable in exchange for an up to 70% cost reduction.

    ## Virtual Private Cloud (VPC)

    A private network to contain and isolate all API resources.

    ## CI/CD with CodePipeline 
    
    Automatically builds and deploys the API when changes are made to the repository.

    Steps:
        - **Source**
            - Watches for changes to the `main` branch of this repository.
        - **Build**
            - builds the docker image and pushes it to the ECR repository.
        - **Deploy**
            - Deploys the updated image to ECS for use by Fargate.
    """

    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # Create VPC
        self.vpc = ec2.Vpc(self, "ApiVPC", max_azs=3)

        # Create an ECR Repository for the Docker image (automatically created)
        self.ecr_repo = ecr.Repository(self, "ApiECRRepo")

        # Create ECS Cluster
        self.ecs_cluster = ecs.Cluster(
            self,
            "ApiECSCluster",
            vpc=self.vpc,
        )

        # Create Fargate Service and ALB
        image = ecs_patterns.ApplicationLoadBalancedTaskImageOptions(
            image=ecs.ContainerImage.from_registry("amazon/amazon-ecs-sample") #.from_ecr_repository(self.ecr_repo),
        )
        self.ecs_service = ecs_patterns.ApplicationLoadBalancedFargateService(
            self,
            "ApiService",
            cluster=self.ecs_cluster,
            cpu=256,
            memory_limit_mib=512,
            desired_count=1,
            task_image_options=image,
            capacity_provider_strategies=[ecs.CapacityProviderStrategy(
                capacity_provider="FARGATE_SPOT",
                weight=1
            )]
        )

        # Configure health check to correctly determine if the API is active
        self.ecs_service.target_group.configure_health_check(
            path="/api/v1/status",  # Update if the API version changes.
        )

        # Grant ECR Pull Permissions to Task Execution Role
        self.ecr_repo.grant_pull(self.ecs_service.task_definition.execution_role)


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
            branch="main",
        )

        ## BUILD STAGE ##

        # CodeBuild Project to build the Docker image
        build_project = codebuild.PipelineProject(
            self, 
            "ApiBuildProject",
            build_spec=codebuild.BuildSpec.from_object({
                "version": "0.2",
                "phases": {
                    "pre_build": {
                        "commands": [
                            "echo Logging in to Amazon ECR...",
                            "aws --version",    # DEBUG
                            "ls -R",            # DEBUG
                            "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $REPOSITORY_URI",
                            "COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)",
                            "BUILD_TAG=$(echo $CODEBUILD_BUILD_ID | awk -F\":\" '{print $2}')",
                            "BUILD_LABEL=build-$BUILD_TAG"
                        ]
                    },
                    "build": {
                        "commands": [
                            "echo Build started on `date`",
                            "echo Building the Docker image...",
                            "docker build -f ./api/docker/Dockerfile -t $REPOSITORY_URI:latest ./api",
                            "docker tag $REPOSITORY_URI:latest $REPOSITORY_URI:$BUILD_LABEL",
                            "docker tag $REPOSITORY_URI:latest $REPOSITORY_URI:$COMMIT_HASH",
                            "printf '[{\"name\":\"%s\",\"imageUri\":\"%s\"}]' $CONTAINER_NAME $REPOSITORY_URI:$BUILD_LABEL > imagedefinitions.json"
                        ]
                    },
                    "post_build": {
                        "commands": [
                            "echo Build completed on `date`",
                            "echo Pushing the Docker images...",
                            "docker push $REPOSITORY_URI:latest",
                            "docker push $REPOSITORY_URI:$BUILD_LABEL",
                            "docker push $REPOSITORY_URI:$COMMIT_HASH"
                        ]
                    }
                },
                "artifacts": {
                    "files": [
                        "imagedefinitions.json"
                    ]
                }
            }),
            environment=codebuild.BuildEnvironment(
                build_image=codebuild.LinuxBuildImage.STANDARD_5_0,
                privileged=True,  # Required to build Docker images
            ),
            environment_variables={
                "REPOSITORY_URI": codebuild.BuildEnvironmentVariable(value=self.ecr_repo.repository_uri),
                "AWS_DEFAULT_REGION": codebuild.BuildEnvironmentVariable(value=self.region),
                "CONTAINER_NAME": codebuild.BuildEnvironmentVariable(value=self.ecs_service.task_definition.default_container.container_name),
            },
        )

        # Grant ECR permissions to build project
        self.ecr_repo.grant_pull_push(build_project.role)

        # CodeBuild Action
        build_action = codepipeline_actions.CodeBuildAction(
            action_name="BuildDockerImage",
            project=build_project,
            input=source_output,
            outputs=[codepipeline.Artifact("BuildOutput")],
        )

        ## DEPLOY STAGE ##

        # Deploy Action to ECS
        deploy_action = codepipeline_actions.EcsDeployAction(
            action_name="DeployToECS",
            service=self.ecs_service.service,
            input=codepipeline.Artifact("BuildOutput"),
        )

        # CodePipeline
        pipeline = codepipeline.Pipeline(self, "ApiPipeline")

        # Add stages to the pipeline
        pipeline.add_stage(
            stage_name="Source",
            actions=[source_action],
        )
        pipeline.add_stage(
            stage_name="Build",
            actions=[build_action],
        )
        pipeline.add_stage(
            stage_name="Deploy",
            actions=[deploy_action],
        )

