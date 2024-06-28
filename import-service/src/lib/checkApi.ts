import {
  ApiGatewayV2Client,
  GetApiCommand,
} from '@aws-sdk/client-apigatewayv2';
import path = require('path');
import { createApi } from '../api/createApi';
import { access, readFile, rm } from 'fs/promises';

export const checkApi = async (client: ApiGatewayV2Client) => {
  const infoFile = path.resolve(__dirname, '../api', 'info.txt');
  try {
    await access(infoFile);
    const key = await readFile(infoFile, {
      encoding: 'utf-8',
    });
    try {
      const { Name } = await client.send(
        new GetApiCommand({
          ApiId: key,
        })
      );
      return key;
    } catch {
      await rm(infoFile);
      return await createApi();
    }
  } catch {
    return await createApi();
  }
};
