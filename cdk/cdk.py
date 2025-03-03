from aws_cdk import App
from stack_api import ApiStack
from stack_web import WebStack
from stack_cloudfront import CloudFrontStack

app = App()

api = ApiStack(app, "PortfolioApi")
web = WebStack(app, "PortfolioWeb")
CloudFrontStack(app, "PortfolioCloudfront", web_stack=web, api_stack=api)

app.synth()