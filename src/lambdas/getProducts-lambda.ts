import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
const { aws_lambda: lambda } = cdk;
import * as dotenv from 'dotenv';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

dotenv.config();

export class GetProductsLambda extends Construct {
  integration: HttpLambdaIntegration;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const lambdaFunc = new lambda.Function(this, 'Get-Products-List', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('dist/getProductsList'),
      handler: 'index.handler',
      environment: {
        PRODUCTS_DB: process.env.PRODUCTS_DB || 'AWS_Shop_Products',
        STOCKS_DB: process.env.STOCKS_DB || 'AWS_Shop_Stocks',
      },
    });

    this.integration = new HttpLambdaIntegration(
      'Get products integration',
      lambdaFunc
    );
  }
}
