import {
  ApiGatewayV2Client,
  CreateApiCommand,
  CreateDeploymentCommand,
  CreateIntegrationCommand,
  CreateRouteCommand,
  CreateStageCommand,
  ProtocolType,
} from '@aws-sdk/client-apigatewayv2';
import { GetFunctionCommand, LambdaClient } from '@aws-sdk/client-lambda';
import { access, writeFile } from 'fs/promises';
import path = require('path');
import { names } from '../constants';

export const createApi = async () => {
  const client = new ApiGatewayV2Client({});
  const RouteKey = 'GET /import';

  try {
    const clientLambda = new LambdaClient({});
    const resp = await clientLambda.send(
      new GetFunctionCommand({
        FunctionName: names.importLambdaName,
      })
    );
    const arn = resp.Configuration?.FunctionArn;

    const command = new CreateApiCommand({
      Name: names.apiName,
      ProtocolType: ProtocolType.HTTP,
    });

    const { ApiId } = await client.send(command);

    const res = await client.send(
      new CreateIntegrationCommand({
        ApiId,
        IntegrationMethod: 'GET',
        IntegrationType: 'AWS_PROXY',
        IntegrationUri: arn,
        PayloadFormatVersion: '2.0',
      })
    );

    if (res.IntegrationId) {
      await client.send(
        new CreateRouteCommand({
          ApiId,
          RouteKey,
          Target: `integrations/${res.IntegrationId}`,
        })
      );
    }

    const createStageResult = await client.send(
      new CreateStageCommand({
        ApiId,
        StageName: 'prod',
      })
    );

    await client.send(
      new CreateDeploymentCommand({
        ApiId,
        StageName: createStageResult.StageName,
      })
    );

    await writeFile(path.resolve(__dirname, 'info.txt'), `${ApiId}`);
    console.log(`Api created ID: ${ApiId}`);
    return ApiId;
  } catch (err) {
    console.log(err);
  }
  return;
};
