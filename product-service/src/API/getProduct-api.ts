import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GetProductsLambda } from '../lambdas/getProducts-lambda';
import { GetProductsIdLambda } from '../lambdas/getProductId-lambda';
import { CreateProductLambda } from '../lambdas/createProduct-lambda';

const { aws_apigatewayv2: apigateway } = cdk;

export class GetProductsAPI extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const getProducts = new GetProductsLambda(this, 'Get Products').integration;

    const getProductId = new GetProductsIdLambda(this, 'Get product bby Id')
      .integration;

    const createProduct = new CreateProductLambda(this, 'Create Product')
      .integration;

    const api = new apigateway.HttpApi(scope, 'Get Products API', {
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'user',
          '*',
        ],
        allowMethods: [apigateway.CorsHttpMethod.ANY],
        allowOrigins: ['*'],
      },
    });

    api.addRoutes({
      path: '/products',
      methods: [apigateway.HttpMethod.GET],
      integration: getProducts,
    });

    api.addRoutes({
      path: '/products/{productId}',
      methods: [apigateway.HttpMethod.GET],
      integration: getProductId,
    });

    api.addRoutes({
      path: '/products',
      methods: [
        apigateway.HttpMethod.POST,
        apigateway.HttpMethod.PUT,
        apigateway.HttpMethod.OPTIONS,
      ],
      integration: createProduct,
    });
  }
}
