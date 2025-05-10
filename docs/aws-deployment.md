# AWS Deployment Guide

This document provides instructions for deploying the Node.js MongoDB template to AWS.

## Prerequisites

- AWS Account
- AWS CLI configured
- Node.js and npm installed

## Deployment Options

### Option 1: AWS Elastic Beanstalk

Elastic Beanstalk is a good choice for simple Node.js applications:

1. Install the EB CLI:
   ```
   npm install -g aws-eb-cli
   ```

2. Initialize EB:
   ```
   eb init
   ```

3. Create the environment:
   ```
   eb create
   ```

4. Deploy:
   ```
   eb deploy
   ```

### Option 2: AWS EC2 with MongoDB

For more control, you can use EC2:

1. Launch an EC2 instance with Amazon Linux 2
2. Install Node.js, MongoDB, and other dependencies
3. Clone your repository
4. Set up environment variables
5. Start your application with PM2:
   ```
   npm install -g pm2
   pm2 start server.js
   ```

### Option 3: AWS ECS (Docker)

For containerized deployment:

1. Create a Dockerfile in your project root
2. Build and push your Docker image to ECR
3. Create an ECS cluster and service
4. Configure your task definition

### Option 4: AWS Lambda with MongoDB Atlas

For serverless deployment:

1. Adapt the application to work with Lambda
2. Use MongoDB Atlas for the database
3. Create an API Gateway
4. Deploy using the Serverless Framework or AWS SAM

## Database Options

### MongoDB Atlas

For production, MongoDB Atlas is recommended:

1. Create a MongoDB Atlas account
2. Set up a new cluster
3. Configure your database user and network access
4. Update your connection string in environment variables

### Amazon DocumentDB

If you prefer an AWS managed service:

1. Create a DocumentDB cluster
2. Configure security groups and access
3. Update your application to use the DocumentDB connection string

## Monitoring and Logging

- Set up CloudWatch for logs and metrics
- Consider using AWS X-Ray for distributed tracing
- Implement health checks

## CI/CD Pipeline

1. Create a CodePipeline
2. Configure CodeBuild to run tests
3. Set up automatic deployment to your chosen service

## Security Best Practices

- Use IAM roles for service access
- Keep secrets in AWS Secrets Manager
- Enable VPC for private networking
- Implement proper security groups

## Cost Optimization

- Choose the right instance sizes
- Use Auto Scaling for variable loads
- Consider reserved instances for predictable workloads
- Monitor and optimize MongoDB usage