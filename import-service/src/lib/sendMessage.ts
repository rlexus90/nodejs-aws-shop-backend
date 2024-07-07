import { names } from '../constants';
import { ProductIncome, transformProduct } from './transformProduct';
import {
  GetQueueUrlCommand,
  SQSClient,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';

export const sendMessage = async (
  product: ProductIncome,
  QueueUrl: string | undefined
) => {
  const client = new SQSClient();

  try {
    if (QueueUrl) {
      const resp = await client.send(
        new SendMessageCommand({
          QueueUrl,
          MessageBody: JSON.stringify(product),
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
};
