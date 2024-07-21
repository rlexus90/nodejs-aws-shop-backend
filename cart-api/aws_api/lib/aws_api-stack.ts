import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';




export class AwsApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

const cartServiceLambda = new Function(this, 'CartServiceLambda', {
  runtime: Runtime.NODEJS_20_X,
  code: Code.fromAsset('./dist'),
  handler: 'main.handler'
});

const api = new RestApi(this, 'CartServiceAPI',{
  deploy: true,
});

const proxy = api.root.addProxy({
  defaultIntegration: new LambdaIntegration(cartServiceLambda,{proxy:true})
})


  }
}
