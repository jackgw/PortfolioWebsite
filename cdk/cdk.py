from aws_cdk import App

from cdk.stack_api import ApiStack
from cdk.stack_web import WebStack
from cdk.stack_cloudfront import CloudFrontStack

app = App()

api = ApiStack(app, "PortfolioApi")
web = WebStack(app, "PortfolioWeb")
CloudFrontStack(app, "PortfolioCloudfront", web_stack=web, api_stack=api)

app.synth()