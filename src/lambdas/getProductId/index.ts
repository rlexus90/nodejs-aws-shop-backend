import { APIGatewayProxyEvent } from 'aws-lambda';
import { returnResponse } from '../../lib/returnResponse';
import * as dotenv from 'dotenv';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { compareDataRequest } from '../../lib/compareData';
import { ProductDB, StocksDB } from '../../types/product';

dotenv.config();
const { PRODUCTS_DB, STOCKS_DB } = process.env;

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: APIGatewayProxyEvent) => {
  const productId = event.pathParameters?.productId;
  if (!productId) return returnResponse(403, { message: 'You must enter Id' });

  const commandProduct = new GetCommand({
    TableName: PRODUCTS_DB,
    Key: {
      id: productId,
    },
  });

  const commandStock = new GetCommand({
    TableName: STOCKS_DB,
    Key: {
      product_id: productId,
    },
  });

  const responseProduct = await docClient.send(commandProduct);
  const product = responseProduct.Item;
  const responseStock = await docClient.send(commandStock);
  const stock = responseStock.Item;

  if (product)
    return returnResponse(
      200,
      compareDataRequest(product as ProductDB, stock as StocksDB)
    );

  return returnResponse(404, { message: 'Product not found' });
};
