import { ProductIncome } from './transformProduct';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

export const sendMessage = async (
  product: ProductIncome,
  QueueUrl: string | undefined
) => {
  const client = new SQSClient();

  if (QueueUrl)
    return client.send(
      new SendMessageCommand({
        QueueUrl,
        MessageBody: JSON.stringify(product),
      })
    );
  return;
};
