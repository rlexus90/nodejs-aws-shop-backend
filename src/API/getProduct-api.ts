import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GetProductsLambda } from '../lambdas/getProducts-lambda';
import { GetProductsIdLambda } from '../lambdas/getProductId-lambda';
const { aws_apigatewayv2: apigateway, aws_apigatewayv2_integrations:integrations } = cdk;

export class GetProductsAPI extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const getProducts =
      new integrations.HttpLambdaIntegration(
        'Get products integration',
        new GetProductsLambda(this, 'Get Products').getProducts
      );

			const getProductId = new integrations.HttpLambdaIntegration('Get product by Id',
				new GetProductsIdLambda(this, 'Get product bby Id').getProduct
			)

    const api = new apigateway.HttpApi(scope, 'Get Products API');

    api.addRoutes({
      path: '/product',
      methods: [apigateway.HttpMethod.GET],
      integration: getProducts,
    });

		api.addRoutes({
			path:'/product/{productId}',
			methods: [apigateway.HttpMethod.GET],
			integration: getProductId
		})
  }
}
