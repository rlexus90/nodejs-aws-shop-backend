import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import * as dotenv from 'dotenv';
import { compareDataRequest } from '../../lib/compareData';
import { logger } from '../../lib/logger';
import { returnResponse } from '../../lib/returnResponse';
import { ProductDB, StocksDB } from '../../types/product';

dotenv.config();

export const handler = async (event: APIGatewayProxyEventV2) => {
  logger(event);

  const { PRODUCTS_DB, STOCKS_DB } = process.env;

  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  const productId = event.pathParameters?.productId;
  if (!productId) return returnResponse(403, { message: 'You must enter Id' });

  const commandProduct = new DeleteCommand({
    TableName: PRODUCTS_DB,
    Key: {
      id: productId,
    },
  });

  const commandStock = new DeleteCommand({
    TableName: STOCKS_DB,
    Key: {
      product_id: productId,
    },
  });

  try {
    await docClient.send(commandProduct);

    await docClient.send(commandStock);

    return returnResponse(204, { message: 'Product deleted' });
  } catch (e) {
    console.log(e);
    const { message } = e as Error;
    return returnResponse(500, { message: `${message}` });
  }
};
