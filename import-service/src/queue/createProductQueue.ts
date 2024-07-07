import {
  CreateQueueCommand,
  GetQueueUrlCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { names } from '../constants';

export const createProductQueue = async () => {
  const client = new SQSClient();
  const QueueName = names.queueName;

  const command = new CreateQueueCommand({
    QueueName,
    Attributes: {
      // DelaySeconds: '1',
      ReceiveMessageWaitTimeSeconds: '20',
    },
  });

  try {
    const { QueueUrl } = await client.send(
      new GetQueueUrlCommand({
        QueueName,
      })
    );
    console.log('Create-product-queue exist');
  } catch {
    try {
      await client.send(command);
      console.log('Create-product-queue created');
    } catch (err) {
      console.log(err);
    }
  }
};
