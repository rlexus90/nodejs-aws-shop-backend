import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
const { aws_lambda: lambda } = cdk;

export class HelloLambda extends Construct {
  helloFn: cdk.aws_lambda.IFunction;

  constructor (scope: Construct, id: string){
    super(scope, id);

    this.helloFn = new lambda.Function(this, 'Hello Word', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('src/lambdas/hello'),
      handler: 'hello.handler',
    });


  }
}
