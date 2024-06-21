import * as cdk from 'aws-cdk-lib';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Construct } from 'constructs';
const { aws_lambda: lambda } = cdk;

import * as dotenv from 'dotenv';
dotenv.config();

export class GetProductsIdLambda extends Construct {
  integration: HttpLambdaIntegration;

  constructor (scope: Construct, id: string){
    super(scope, id);

    const lambdaFunc = new lambda.Function(this, 'Get-Product-ID', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('dist/getProductId'),
      handler: 'index.handler',
			environment: {
        PRODUCTS_DB: process.env.PRODUCTS_DB || 'AWS_Shop_Products',
        STOCKS_DB: process.env.STOCKS_DB || 'AWS_Shop_Stocks',
      },
    });


		this.integration = new HttpLambdaIntegration(
      'Get products by Id integration',
      lambdaFunc
    );
  }
}
