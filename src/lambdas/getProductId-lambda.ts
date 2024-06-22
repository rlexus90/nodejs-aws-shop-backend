import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
const { aws_lambda: lambda } = cdk;

export class GetProductsIdLambda extends Construct {
  getProduct: cdk.aws_lambda.IFunction;

  constructor (scope: Construct, id: string){
    super(scope, id);

    this.getProduct = new lambda.Function(this, 'Get-Product-ID', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('dist/getProductId'),
      handler: 'index.handler',
    });


  }
}
