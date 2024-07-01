import {
  Architecture,
  CreateFunctionCommand,
  LambdaClient,
  PackageType,
  Runtime,
  UpdateFunctionCodeCommand,
} from '@aws-sdk/client-lambda';
import { readFile } from 'fs/promises';
import path = require('path');

export const importLambda = async () => {
  const client = new LambdaClient({});
  const code = await readFile(
    path.resolve(__dirname, '../../dist', 'import-file.zip')
  );

  const create = new CreateFunctionCommand({
    Code: { ZipFile: code },
    FunctionName: 'Import-product-lambda',
    Role: 'arn:aws:iam::540415712502:role/Lambda_S3',
    Architectures: [Architecture.arm64],
    Handler: 'import-file/index.handler',
    PackageType: PackageType.Zip,
    Runtime: Runtime.nodejs20x,
  });

  const update = new UpdateFunctionCodeCommand({
    ZipFile: code,
    FunctionName: 'Import-product-lambda',
    Architectures: [Architecture.arm64],
  });

  try {
    await client.send(update);
    console.log('Import-product-lambda updated');
  } catch {
    try {
      await client.send(create);
      console.log('Import-product-lambda created');
    } catch (err) {
      console.log(err);
    }
  }
};
