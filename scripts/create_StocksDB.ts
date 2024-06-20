import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

 const createStocks = async () => {
  const command = new CreateTableCommand({
    TableName: 'AWS_Shop_Stocks',
    AttributeDefinitions: [
      {
        AttributeName: 'product_id',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'product_id',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  });

  const response = await client.send(command);
  console.log(response);
  return response;
};

createStocks();