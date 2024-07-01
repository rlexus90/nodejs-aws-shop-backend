import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  TransactWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEventV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';
import { CreateProductDTO, validateBody } from './DTO/createProductDTO';
import { returnResponse } from '../../lib/returnResponse';
import { ProductDB, StocksDB } from '../../types/product';
import { logger } from '../../lib/logger';

dotenv.config();

export const handler = async (event: APIGatewayProxyEventV2) => {
  logger(event);

  const err = validateBody(event.body);
  if (err) return returnResponse(400, err);

  const { PRODUCTS_DB, STOCKS_DB } = process.env;

  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  try {
    const { count, price, description, title } = JSON.parse(
      event.body as string
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

    const command = new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: PRODUCTS_DB,
            Item: product,
          },
        },
        {
          Put: {
            TableName: STOCKS_DB,
            Item: stock,
          },
        },
      ],
    });

    await docClient.send(command);

    return returnResponse(201, {});
  } catch (e) {
    const { message } = e as Error;
    return returnResponse(500, { message: `${message}` });
  }
};
