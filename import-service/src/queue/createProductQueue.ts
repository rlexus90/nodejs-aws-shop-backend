import { CreateQueueCommand, SQSClient } from '@aws-sdk/client-sqs';
import { names } from '../constants';

export const createProductQueue = async () => {
  const client = new SQSClient();
  const QueueName = names.queueName;

  const command = new CreateQueueCommand({
    QueueName,
    Attributes: {
      // DelaySeconds: '1',
    },
  });

  try {
    await client.send(command);
    console.log('Create-product-queue created');
  } catch (err) {
    console.log(err);
    console.error('Create-product-queue exist');
  }
};
