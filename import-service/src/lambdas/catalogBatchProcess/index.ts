import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  TransactWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import { SQSEvent } from 'aws-lambda';
import * as uuid from 'uuid';
import { ProductDB, ProductIncome, StocksDB } from '../../lib/transformProduct';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const { PRODUCTS_DB, STOCKS_DB } = process.env;

export const handler = async (event: SQSEvent) => {
  const { Records } = event;
  console.log(`Messages count ${Records.length}`);

  const result = Records.map((record) => writeToDB(JSON.parse(record.body)));

  const antort = await Promise.all(result);
  console.log(`Done ${Records.length}`);
  console.log(antort);
};

async function writeToDB(data: ProductIncome) {
  if (!(Number.isFinite(Number(data.price)) && Number(data.price) >= 0)) return;

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
      return 'updated';
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
      return 'created';
    } catch (err) {
      console.log(err);
      console.log('Error');
      return 'Error';
    }
  }
}
