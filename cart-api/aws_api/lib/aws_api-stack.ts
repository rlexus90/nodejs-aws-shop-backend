import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();



export class AwsApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

// const cartServiceLambda = new Function(this, 'CartServiceLambda', {
//   runtime: Runtime.NODEJS_20_X,
//   code: Code.fromAsset('./dist'),
//   handler: 'main.handler',
// 	environment:{
// 		PRISMA_CLI_BINARY_TARGETS:'native,rhel-openssl-1.0.x'
// 	}
// });


const cartServiceLambda = new NodejsFunction(this, 'CartServiceLambda2',{
	runtime: Runtime.NODEJS_20_X,
	handler:'index.handler',
	entry: path.join(__dirname,'../dist', `main.js`),
	timeout: cdk.Duration.seconds(20),
	environment:{
		DATABASE_URL: process.env.DATABASE_URL
	},
	bundling: {
		nodeModules: ['@prisma/client', 'prisma'],
		commandHooks: {
			beforeBundling(_inputDir: string, _outputDir: string) {
				return []
			},
			beforeInstall(inputDir: string, outputDir: string) {
				console.log(inputDir)
				return [`cp -R ..${inputDir}/prisma ${outputDir}/`]
			},
			afterBundling(_inputDir: string, outputDir: string) {
				return [
					`cd ../${outputDir}`,
					`yarn prisma generate`,
					`rm -rf node_modules/@prisma/engines`,
					`rm -rf node_modules/@prisma/client/node_modules node_modules/.bin node_modules/prisma`,
				]
			},
		},
	},

})

const api = new RestApi(this, 'CartServiceAPI',{
  deploy: true,
});

const proxy = api.root.addProxy({
  defaultIntegration: new LambdaIntegration(cartServiceLambda,{proxy:true})
})


  }
}
