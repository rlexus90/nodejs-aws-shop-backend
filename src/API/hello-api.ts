import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HelloLambda } from '../lambdas/hello-lambda';
const { aws_apigatewayv2: apigateway } = cdk;

export class HelloApi extends Construct{
  constructor(
    scope: Construct,
    id: string,
  ) {
    super(scope, id);
		const helloFn = new cdk.aws_apigatewayv2_integrations.HttpLambdaIntegration(
      'Hello-integration',
      new HelloLambda(this, id,).helloFn
    );

    const api = new apigateway.HttpApi(scope, 'hello-api');
    api.addRoutes({
      path: '/hello',
      methods: [apigateway.HttpMethod.GET],
      integration: helloFn,
    });
  }
}
