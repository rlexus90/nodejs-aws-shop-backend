import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { products, stocks } from "../src/mock/mockData";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const fillProducts = async () => {

  const stack = products.map(item => new PutCommand({
    TableName: 'AWS_Shop_Products',
    Item: item
  }))

  await Promise.all(stack.map(command => docClient.send(command)));
  console.log('Products added');
}

const fillStocks = async () => {

  const stack = stocks.map(item => new PutCommand({
    TableName: 'AWS_Shop_Stocks',
    Item: item
  }))

  await Promise.all(stack.map(command => docClient.send(command)));
  console.log('Stock added');
}


fillProducts();
fillStocks();