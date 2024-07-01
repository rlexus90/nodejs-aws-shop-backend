import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { products, stocks } from '../src/mock/mockData';
import * as dotenv from 'dotenv';
import { ProductDB, StocksDB } from '../src/types/product';
import * as uuid from 'uuid';

dotenv.config();

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// const products:ProductDB[] =[];
// const stocks:StocksDB[] =[];

// let i =100;

// while(i>=0){
//   const id = uuid.v4();
//   products.push({
//     description: "Short Product Description2",
//     id,
//     price: 23,
//     title: "Product",
//   });
//   stocks.push({ product_id: id,
//     count: 2,})

//     i-=1;
// }

const fillProducts = async () => {
  const stack = products.map(
    (item) =>
      new PutCommand({
        TableName: process.env.PRODUCTS_DB,
        Item: item,
      })
  );

  await Promise.all(stack.map((command) => docClient.send(command)));
  console.log('Products added');
};

const fillStocks = async () => {
  const stack = stocks.map(
    (item) =>
      new PutCommand({
        TableName: process.env.STOCKS_DB,
        Item: item,
      })
  );

  await Promise.all(stack.map((command) => docClient.send(command)));
  console.log('Stock added');
};

fillProducts();
fillStocks();
