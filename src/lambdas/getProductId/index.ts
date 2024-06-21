import { APIGatewayProxyEvent } from 'aws-lambda';
import { returnResponse } from '../../lib/returnResponse';
import * as dotenv from 'dotenv';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

dotenv.config();
const { PRODUCTS_DB } = process.env;

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: APIGatewayProxyEvent) => {
  const productId = event.pathParameters?.productId;
	if (!productId) return returnResponse(403, { message: 'You must enter Id' });

  const command = new GetCommand({
    TableName: PRODUCTS_DB,
    Key: {
      id: productId,
    },
  });

  const response = await docClient.send(command);
  const product = response.Item

  if (product) return returnResponse(200, product);

  return returnResponse(404, { message: 'Product not found' });
};
