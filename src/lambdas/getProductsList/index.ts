import { APIGatewayProxyEvent } from 'aws-lambda';
import { returnResponse } from '../../lib/returnResponse';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();
const {PRODUCTS_DB} = process.env

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: APIGatewayProxyEvent) => {
  const command = new ScanCommand({
    TableName: PRODUCTS_DB,
  });

  const response = await docClient.send(command);
  const products = response.Items;


  if (products) return returnResponse(200, products);

  return returnResponse(404, { message: 'Product not found' });
};

