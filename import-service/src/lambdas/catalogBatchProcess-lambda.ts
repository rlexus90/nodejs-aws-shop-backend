import {
  Architecture,
  CreateEventSourceMappingCommand,
  CreateFunctionCommand,
  GetEventSourceMappingCommand,
  LambdaClient,
  ListEventSourceMappingsCommand,
  PackageType,
  Runtime,
  UpdateFunctionCodeCommand,
} from '@aws-sdk/client-lambda';
import {
  GetQueueAttributesCommand,
  GetQueueUrlCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { readFile } from 'fs/promises';
import path = require('path');
import { names } from '../constants';
import * as dotenv from 'dotenv';

dotenv.config();

export const catalogBatchProcessLambda = async () => {
  const { PRODUCTS_DB, STOCKS_DB } = process.env;
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
    Environment: {
      Variables: {
        PRODUCTS_DB: PRODUCTS_DB || 'string',
        STOCKS_DB: STOCKS_DB || 'string',
      },
    },
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

  const { EventSourceMappings } = await client.send(
    new ListEventSourceMappingsCommand({
      FunctionName,
    })
  );

  if (EventSourceMappings?.length === 0) {
    try {
      const clientSQS = new SQSClient();
      const { QueueUrl } = await clientSQS.send(
        new GetQueueUrlCommand({
          QueueName: names.queueName,
        })
      );
      const { Attributes } = await clientSQS.send(
        new GetQueueAttributesCommand({
          QueueUrl,
          AttributeNames: ['QueueArn'],
        })
      );

      if (Attributes?.QueueArn) {
        const trigger = new CreateEventSourceMappingCommand({
          FunctionName,
          EventSourceArn: Attributes.QueueArn,
          BatchSize: 5,
          MaximumBatchingWindowInSeconds: 10,
        });

        await client.send(trigger);
      }
    } catch (err) {
      console.error(err);
    }
  }
};
