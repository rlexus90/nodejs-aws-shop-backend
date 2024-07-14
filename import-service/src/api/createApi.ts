import {
  ApiGatewayV2Client,
  CreateApiCommand,
  CreateAuthorizerCommand,
  CreateDeploymentCommand,
  CreateIntegrationCommand,
  CreateRouteCommand,
  CreateStageCommand,
  ProtocolType,
} from '@aws-sdk/client-apigatewayv2';
import {
  GetFunctionCommand,
  LambdaClient,
  ListFunctionsCommand,
} from '@aws-sdk/client-lambda';
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

    const lambdaList = await clientLambda.send(new ListFunctionsCommand());

    const authLambda = lambdaList.Functions?.find((fn) =>
      fn.FunctionName?.includes('BasicAuthorizer')
    );

    const command = new CreateApiCommand({
      Name: names.apiName,
      ProtocolType: ProtocolType.HTTP,
      CorsConfiguration: {
        AllowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
        ],
        AllowMethods: ['GET'],
        AllowOrigins: ['*'],
      },
    });

    const { ApiId } = await client.send(command);

    const integration = await client.send(
      new CreateIntegrationCommand({
        ApiId,
        IntegrationMethod: 'GET',
        IntegrationType: 'AWS_PROXY',
        IntegrationUri: arn,
        PayloadFormatVersion: '2.0',
      })
    );

    const auth = await client.send(
      new CreateAuthorizerCommand({
        ApiId,
        AuthorizerType: 'REQUEST',
        IdentitySource: undefined,
        Name: 'Import_auth',
        AuthorizerPayloadFormatVersion: '2.0',
        EnableSimpleResponses: true,
        AuthorizerUri: `arn:aws:apigateway:us-west-2:lambda:path/2015-03-31/functions/${authLambda?.FunctionArn}/invocations`,
      })
    );


    if (integration.IntegrationId && auth.AuthorizerId) {
      await client.send(
        new CreateRouteCommand({
          ApiId,
          RouteKey,
          Target: `integrations/${integration.IntegrationId}`,
          AuthorizationType: 'CUSTOM',
          AuthorizerId: auth.AuthorizerId,
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
