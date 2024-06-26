import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { returnResponse } from '../../lib/returnResponse';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';
import { compareDataRequest } from '../../lib/compareData';
import { ProductDB, StocksDB } from '../../types/product';
import { logger } from '../../lib/logger';

dotenv.config();

export const handler = async (event: APIGatewayProxyEventV2) => {
  logger(event);

  const { PRODUCTS_DB, STOCKS_DB } = process.env;

  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);
  const commandProduct = new ScanCommand({
    TableName: PRODUCTS_DB,
  });

  const commandStock = new ScanCommand({
    TableName: STOCKS_DB,
  });

  try {
    const responseProduct = await docClient.send(commandProduct);
    const products = responseProduct.Items;
    const responseStock = await docClient.send(commandStock);
    const stocks = responseStock.Items;

    if (products)
      return returnResponse(
        200,
        compareDataRequest(products as ProductDB[], stocks as StocksDB[])
      );

    return returnResponse(404, { message: 'Product not found' });
  } catch (e) {
    const { message } = e as Error;
    return returnResponse(500, { message: `${message}` });
  }
};
