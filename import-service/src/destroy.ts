import {
  ApiGatewayV2Client,
  DeleteApiCommand,
} from '@aws-sdk/client-apigatewayv2';
import { DeleteFunctionCommand, LambdaClient } from '@aws-sdk/client-lambda';
import { DeleteBucketCommand, S3Client } from '@aws-sdk/client-s3';
import {
  DeleteQueueCommand,
  GetQueueUrlCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { names } from './constants';
import { returnApiId } from './api/api';

const destroy = async () => {
  const S3 = new S3Client();
  const Lambda = new LambdaClient();
  const Api = new ApiGatewayV2Client();
  const Queue = new SQSClient();

  // await S3.send(new DeleteBucketCommand({Bucket: names.bucketName}));

  // const ApiId = await returnApiId();
  // if(ApiId) await Api.send(new DeleteApiCommand({ApiId,}));

  // try {
  //   const { QueueUrl } = await Queue.send(
  //     new GetQueueUrlCommand({
  //       QueueName: names.queueName,
  //     })
  //   );
  //   if (QueueUrl) await Queue.send(new DeleteQueueCommand({ QueueUrl }));
  // } catch {}

  // await Lambda.send(new DeleteFunctionCommand({FunctionName:names.importLambdaName}));

  // await Lambda.send(new DeleteFunctionCommand({FunctionName:names.fileParserLambdaName}));

  await Lambda.send(
    new DeleteFunctionCommand({
      FunctionName: names.catalogBatchProcessLambdaName,
    })
  );

  console.log('Resources deleted');
};

destroy();
