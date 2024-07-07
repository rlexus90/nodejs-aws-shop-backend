import {
  Architecture,
  CreateEventSourceMappingCommand,
  CreateFunctionCommand,
  LambdaClient,
  PackageType,
  Runtime,
  UpdateFunctionCodeCommand,
} from '@aws-sdk/client-lambda';
import { GetQueueUrlCommand, SQSClient } from '@aws-sdk/client-sqs';
import { readFile } from 'fs/promises';
import path = require('path');
import { names } from '../constants';

export const catalogBatchProcessLambda = async () => {
  const client = new LambdaClient({});
  const code = await readFile(
    path.resolve(__dirname, '../../dist', 'catalogBatchProcess.zip')
  );

  const FunctionName = names.catalogBatchProcessLambdaName;

  const create = new CreateFunctionCommand({
    Code: { ZipFile: code },
    FunctionName,
    Role: 'arn:aws:iam::540415712502:role/Lambda_to_DB',
    Architectures: [Architecture.arm64],
    Handler: 'catalogBatchProcess/index.handler',
    PackageType: PackageType.Zip,
    Runtime: Runtime.nodejs20x,
  });

  const update = new UpdateFunctionCodeCommand({
    ZipFile: code,
    FunctionName,
    Architectures: [Architecture.arm64],
  });



  try {
    await client.send(update);
    console.log('Catalog-batch-process-lambda updated');
  } catch {
    try {
      await client.send(create);
      console.log('Catalog-batch-process-lambda created');
    } catch (err) {
      console.log(err);
    }
  }

  try{
const clientSQS = new SQSClient();
const resp = await clientSQS.send(new GetQueueUrlCommand({
  QueueName:
}))

    // const trigger = new CreateEventSourceMappingCommand({
    // FunctionName,
    // })
  }catch(err){
    console.error(err);
  }
};
