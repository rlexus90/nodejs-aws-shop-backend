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
import { names } from '../constants';

export const importLambda = async () => {
	const FunctionName = names.importLambdaName;
  const client = new LambdaClient({});
  const code = await readFile(
    path.resolve(__dirname, '../../dist', 'import-file.zip')
  );

  const create = new CreateFunctionCommand({
    Code: { ZipFile: code },
    FunctionName,
    Role: 'arn:aws:iam::540415712502:role/Lambda_S3',
    Architectures: [Architecture.arm64],
    Handler: 'import-file/index.handler',
    PackageType: PackageType.Zip,
    Runtime: Runtime.nodejs20x,
  });

  const update = new UpdateFunctionCodeCommand({
    ZipFile: code,
    FunctionName,
    Architectures: [Architecture.arm64],
  });

  try {
    await client.send(update);
    console.log(`${FunctionName} updated`);
  } catch {
    try {
      await client.send(create);
      console.log(`${FunctionName} created`);
    } catch (err) {
      console.log(err);
    }
  }
};
