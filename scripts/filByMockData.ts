import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { products, stocks } from "../src/mock/mockData";
import * as dotenv from 'dotenv'

dotenv.config();

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const fillProducts = async () => {

  const stack = products.map(item => new PutCommand({
    TableName: process.env.PRODUCTS_DB,
    Item: item
  }))

  await Promise.all(stack.map(command => docClient.send(command)));
  console.log('Products added');
}

const fillStocks = async () => {

  const stack = stocks.map(item => new PutCommand({
    TableName: process.env.STOCKS_DB,
    Item: item
  }))

  await Promise.all(stack.map(command => docClient.send(command)));
  console.log('Stock added');
}


fillProducts();
fillStocks();