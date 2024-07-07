import { CreateTopicCommand, GetTopicAttributesCommand, SNSClient } from '@aws-sdk/client-sns';
import { names } from '../constants';

export const createEmailNotification = async () => {
  const client = new SNSClient();
  const Name = names.emailNotify;

  const command = new CreateTopicCommand({
    Name,
  });

  try {
await client.send(command);

const {}=await client.send{new GetTopicAttributesCommand({
	
})}
    console.log(resp);
  } catch (err) {
    console.log(err);
    // try {
    //   await client.send(command);
    //   console.log('Create-product-queue created');
    // } catch (err) {
    //   console.log(err);
    // }
  }
};
