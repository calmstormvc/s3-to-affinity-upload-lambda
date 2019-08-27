# Serverless AWS S3 -> Affinity File Upload

## Usage

Use Serverless to deploy this to AWS where it will create all needed resources using AWS Cloudformation.

Check out the docs for [serverless - deploying](https://serverless.com/framework/docs/providers/aws/guide/deploying/).

After that any file with the correct naming scheme placed in the created bucket will be uploaded to it's associated organization in Affinity.

## Credentials

Info on setting up AWS credentials for deployment can be found in the [serverless docs - credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/).