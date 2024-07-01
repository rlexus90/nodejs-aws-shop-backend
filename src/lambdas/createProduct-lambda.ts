import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
const { aws_lambda: lambda } = cdk;
import * as dotenv from 'dotenv';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

dotenv.config();

export class CreateProductLambda extends Construct {
  integration: HttpLambdaIntegration;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const lambdaFunc = new lambda.Function(this, 'Create product', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('dist/createProduct'),
      handler: 'index.handler',
      environment: {
        PRODUCTS_DB: process.env.PRODUCTS_DB || 'string',
        STOCKS_DB: process.env.STOCKS_DB || 'string',
      },
    });

    this.integration = new HttpLambdaIntegration(
      'Create product integration',
      lambdaFunc
    );
  }
}
