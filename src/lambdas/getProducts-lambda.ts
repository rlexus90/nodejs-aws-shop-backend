
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
const { aws_lambda: lambda } = cdk;

export class GetProductsLambda extends Construct {
  getProducts: cdk.aws_lambda.IFunction;

  constructor (scope: Construct, id: string){
    super(scope, id);

    this.getProducts = new lambda.Function(this, 'Get Products List', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('src/lambdas/getProductsList'),
      handler: 'getProductsList.handler',
    });


  }
}
