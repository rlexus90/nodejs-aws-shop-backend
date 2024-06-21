import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GetProductsLambda } from '../lambdas/getProducts-lambda';
import { GetProductsIdLambda } from '../lambdas/getProductId-lambda';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
const {
  aws_apigatewayv2: apigateway,
  aws_apigatewayv2_integrations: integrations,
} = cdk;

export class GetProductsAPI extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const getProducts = new GetProductsLambda(this, 'Get Products').integration;

    const getProductId = new GetProductsIdLambda(this, 'Get product bby Id')
      .integration;

    const api = new apigateway.HttpApi(scope, 'Get Products API');

    api.addRoutes({
      path: '/product',
      methods: [apigateway.HttpMethod.GET],
      integration: getProducts,
    });

    api.addRoutes({
      path: '/product/{productId}',
      methods: [apigateway.HttpMethod.GET],
      integration: getProductId,
    });
  }
}
