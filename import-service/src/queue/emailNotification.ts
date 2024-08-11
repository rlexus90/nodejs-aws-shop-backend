import {
  CreateTopicCommand,
  GetTopicAttributesCommand,
  ListTopicsCommand,
  SNSClient,
  SubscribeCommand,
} from '@aws-sdk/client-sns';
import { names } from '../constants';
import * as dotenv from 'dotenv';

dotenv.config();

const { EMAIL_CREATE, EMAIL_UPDATE } = process.env;

export const createEmailNotification = async () => {
  const client = new SNSClient();
  const Name = names.emailNotify;

  const command = new CreateTopicCommand({
    Name,
  });

  try {
    await client.send(command);

    const { Topics } = await client.send(new ListTopicsCommand());
    const topic = Topics?.find((el) => el.TopicArn?.includes(Name));
    const TopicArn = topic ? topic.TopicArn : null;
    if (!TopicArn) return;

    await client.send(
      new SubscribeCommand({
        TopicArn,
        Protocol: 'email',
        Endpoint: EMAIL_UPDATE,
      })
    );

    await client.send(
      new SubscribeCommand({
        TopicArn,
        Protocol: 'email',
        Endpoint: EMAIL_CREATE,
        Attributes: {
          FilterPolicy: JSON.stringify({
            result: [{ prefix: 'Wrong message' }],
          }),
        },
      })
    );

    console.log(`${Name} created`);
  } catch (err) {
    console.log(err);
  }
};
