import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

const { aws_lambda: lambda } = cdk;

export class AuthorizationServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const authorizerLambda = new lambda.Function(this, 'BasicAuthorizer', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('src/basicAuthorizer'),
      handler: 'index.handler',
      environment: {
        rlexus90: 'TEST_PASSWORD',
      },
    });
  }
}
