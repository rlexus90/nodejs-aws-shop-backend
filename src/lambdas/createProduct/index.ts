import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEventV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';
import { CreateProductDTO } from '../../API/DTO/createProductDTO';
import { returnResponse } from '../../lib/returnResponse';
import { ProductDB, StocksDB } from '../../types/product';
import { logger } from '../../lib/logger';

dotenv.config();

export const handler = async (event: APIGatewayProxyEventV2) => {
  logger(event);

  const { PRODUCTS_DB, STOCKS_DB } = process.env;

  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  if (!event.body)
    return returnResponse(400, { message: 'Body can not be empty' });

  try {
    const { count, price, description, title } = JSON.parse(
      event.body
    ) as CreateProductDTO;

    const id = uuid.v4();
    const product: ProductDB = {
      id,
      price,
      description,
      title,
    };
    const stock: StocksDB = {
      product_id: id,
      count,
    };
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

    return returnResponse(201, {});
  } catch (e) {
    const { message } = e as Error;
    return returnResponse(500, { message: `${message}` });
  }
};
