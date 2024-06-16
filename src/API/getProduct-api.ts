import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GetProductsLambda } from '../lambdas/getProducts-lambda';
const { aws_apigatewayv2: apigateway } = cdk;

export class GetProductsAPI extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const getProducts =
      new cdk.aws_apigatewayv2_integrations.HttpLambdaIntegration(
        'Get products integration',
        new GetProductsLambda(this, id).getProducts
      );

    const api = new apigateway.HttpApi(scope, 'Get Products API');
    api.addRoutes({
      path: '/products',
      methods: [apigateway.HttpMethod.GET],
      integration: getProducts,
    });
  }
}
