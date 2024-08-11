import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { SQSEvent } from 'aws-lambda';
import * as uuid from 'uuid';
import { ProductDB, ProductIncome, StocksDB } from '../../lib/transformProduct';
import {
  ListTopicsCommand,
  PublishCommand,
  SNSClient,
} from '@aws-sdk/client-sns';
import { names } from '../../constants';

import * as dotenv from 'dotenv';

dotenv.config();

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const sns = new SNSClient();
const Name = names.emailNotify;
const { PRODUCTS_DB, STOCKS_DB } = process.env;

export const handler = async (event: SQSEvent) => {
  const { Records } = event;
  console.log(`Messages count ${Records.length}`);

  const stack = Records.map((record) => writeToDB(JSON.parse(record.body)));

  const result = await Promise.all(stack);

  const { Topics } = await sns.send(new ListTopicsCommand());
  const topic = Topics?.find((el) => el.TopicArn?.includes(Name));
  const TopicArn = topic ? topic.TopicArn : null;

  if (TopicArn)
    await sns.send(
      new PublishCommand({
        TopicArn,
        Message: JSON.stringify({ result: result.join(', ') }),
      })
    );

  console.log(result);

  return result;
};

async function writeToDB(data: ProductIncome) {
  if (!(Number.isFinite(Number(data.price)) && Number(data.price) >= 0))
    return Promise.resolve('Wrong message');

  if (data.id) {
    const product: ProductDB = {
      id: data.id,
      description: data.description,
      title: data.title,
      price: Math.trunc(Number(data.price) * 100) / 100 || 0,
    };
    const stock: StocksDB = {
      product_id: data.id,
      count: data.count ? Number(data.count) : 0,
    };

    try {
      await docClient.send(
        new PutCommand({
          TableName: PRODUCTS_DB,
          Item: product,
        })
      );

      await docClient.send(
        new PutCommand({
          TableName: STOCKS_DB,
          Item: stock,
        })
      );

      console.log('updated');
      return Promise.resolve('updated');
    } catch (err) {
      console.log(err);
      console.log('Error');
      return 'Error';
    }
  } else {
    const id = uuid.v4();
    const product: ProductDB = {
      id,
      description: data.description,
      title: data.title,
      price: Math.trunc(Number(data.price) * 100) / 100 || 0,
    };
    const stock: StocksDB = {
      product_id: id,
      count: data.count ? Number(data.count) : 0,
    };

    try {
      await docClient.send(
        new PutCommand({
          TableName: PRODUCTS_DB,
          Item: product,
        })
      );

      await docClient.send(
        new PutCommand({
          TableName: STOCKS_DB,
          Item: stock,
        })
      );

      console.log('Created');
      return Promise.resolve('created');
    } catch (err) {
      console.log(err);
      console.log('Error');
      return 'Error';
    }
  }
}
