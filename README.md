# Portfolio Application

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [License](#license)

## Introduction
The Portfolio Application is a full-stack web application made for personal use by Jack Wharton. The technoligy stack consists of a FastAPI backend paired with an AngularJS frontend. Both services are hosted on AWS through an included CDK stack definition.

## Project Structure
```
├── api
|   ├── app
|   ├── docker
|   ├── requirements.txt
|   └── .env
├── cdk
|   ├── cdk.py
|   ├── stack_api.py
|   ├── stack_cloudfront.py
|   └── stack_web.py
├── web
|   ├── src
|   ├── angular.json
|   └── package.json
├── static
└── README.md
```

## Technologies Used
### Backend:
- FastAPI
- Docker

### Frontend:
- AngularJS

### Deployment
- AWS CDK

## Environment Variables
Create a `.env` file in the `/api` directory and define the following environment variables (substitute your own values):
```
SES_SENDER_EMAIL=source@example.com
SES_DESTINATION_EMAIL=dest@example.com
AWS_REGION=us-west-2
AWS_ACCESS_KEY=<access-key>
AWS_SECRET_ACCESS_KEY=<secret-key>
DATABASE_URL=postgresql://user:password@host:port/dbname
```
In AWS, create a new secret in the secrets manager called `portfolio_api_env`, make it a key/value type secret, and add all the same keys/values as the local .env file. This will be used for deployment as the .env file is not included in the repo.

## Local Installation
### Prerequisites:
- Docker
- NPM
- Angular CLI

### Backend
1. Navigate to the api docker directory:
   ```bash
   cd api/docker
   ```
2. Run docker locally via script:
   ```bash
   ./start_docker.sh
   ```
4. Test the backend connection:
   - Status: `http://localhost/`
   - API Version: `http://localhost/api/v1/version`

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Access the local website
   - Website: `http://localhost:4200`

## Deployment
### Architecture
The `cdk` directory contains the specification for the deployment of the entire service on AWS, broken up into 3 stacks:
1. ApiStack
   - A docker image stored in ECR and managed using ECS and Fargate.
   - A CI/CD pipeline to automatically build the docker image and deploy to ECR/ECS when changes to this GitHub repository are detected.
2. WebStack
   - Static website files hosted in S3
   - A CI/CD pipeline to automatically compile the website and upload static files to S3 when changes to this GitHub repository are detected.
3. CloudFrontStack
   - A cloudfront distribution with two origins/behaviors: one for the website s3 bucket, and one for the api ECS load balancer.

### Deploying with the AWS CDK
1. Prerequisites:
   - Python 3.x
   - Node Version Manager (nvm)
   - (AWS CLI)[https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html]
2. Create a GitHub access token
   - Grant full access to repo, workflow, and admin:repo_hook scopes.
3. Store GitHub access token in AWS Secrets Manager.
   - Open AWS Secrets Manager console
   - Add new secret
   - Type: "Other type of secret"
   - Key/Value Pairs: Plaintext
   - Paste secret key (ghp_...) in plaintext box.
   - Secret name: "github_auth_token"
   - Save
4. Generate AWS access credentials
   - Open AWS IAM console
   - Create new user with "Administrator" permissions
   - View newly created IAM user
   - Security Credentials -> Access Keys -> Create Access Key
   - Choose "Other" type and a relavent description tag.
   - Copy access key and secret key to local .env file.
5. Store env variables in AWS Secrets Manager.
   - Open AWS Secrets Manager console
   - Add new secret
   - Type: "Other type of secret"
   - Key/Value Pairs: Key/value
   - Copy all keys and values from local .env file
   - Secret name: "portfolio_api_env"
   - Save
6. Configure AWS CLI with credentials
   ```bash
   aws configure
   ```
7. Ensure updated version of Node.js
   ```bash
   nvm install 22.0.0
   ```
8. Navigate to the `cdk` directory
   ```bash
   cd cdk
   ```
9. Create a virtual environment
   ```bash
   python -m venv venv
   ```
10. Activate virtual environment
   ```bash
   source venv/bin/activate
   ```
11. Bootstrap AWS CDK
   ```bash
   cdk bootstrap
   ```
12. Deploy all CDK stacks
   ```bash
   cdk deploy --all
   ```

### Shutting down deployment
```bash
cdk destroy --all
```

## API Documentation
The API route documentation is available via FastAPI's interactive docs:
- Swagger UI: `http://localhost/api/v1/docs`
- Redoc UI: `http://localhost/api/v1/redoc`

## License
This project is licensed under the MIT License.