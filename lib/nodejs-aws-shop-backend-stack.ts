import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HelloApi } from '../src/API/hello-api';
import { HelloLambda } from '../src/lambdas/hello-lambda';
import { GetProductsAPI } from '../src/API/getProduct-api';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

const { aws_lambda: lambda, aws_apigateway: apigateway } = cdk;

export class NodejsAwsShopBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    new GetProductsAPI(this, id);

    // new HelloApi(this, id);
  }
}
