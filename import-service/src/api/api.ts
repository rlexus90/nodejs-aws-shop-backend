import {
  ApiGatewayV2Client,
  CreateDeploymentCommand,
  CreateIntegrationCommand,
  CreateRouteCommand,
  CreateStageCommand,
  GetRoutesCommand,
  IntegrationType,
  Route,
  UpdateRouteCommand,
} from '@aws-sdk/client-apigatewayv2';
import path = require('path');
import { checkApi } from '../lib/checkApi';
import { GetFunctionCommand, LambdaClient } from '@aws-sdk/client-lambda';

export const api = async () => {
  const client = new ApiGatewayV2Client();
  const ApiId = await checkApi(client);

  // const { Items } = await client.send(new GetRoutesCommand({ ApiId }));
  // const { RouteId } = Items?.find(
  //   (item) => item.RouteKey === RouteKey
  // ) as Route;

  // if (RouteId) {
  //   await client.send(
  //     new UpdateRouteCommand({
  //       ApiId,
  //       RouteId,
  //     })
  //   );
  // } else {
  //   await client.send(
  //     new CreateRouteCommand({
  //       ApiId,
  //       RouteKey,
  //     })
  //   );
  // }

  // try {
  //   const clientLambda = new LambdaClient({});
  //   const resp = await clientLambda.send(
  //     new GetFunctionCommand({
  //       FunctionName: 'Say-hello',
  //     })
  //   );
  //   const url = resp.Code?.Location;
  //   console.log(url);

  //   client.send(
  //     new CreateIntegrationCommand({
  //       ApiId,
  //       IntegrationType: IntegrationType.AWS,
  //       IntegrationUri: url,
  //     })
  //   );
  // } catch (err) {
  //   console.log(err);
  // }
};

// try {
//   // create integration for each type of action: GET POST PUT
//   const res = await client.send(new CreateIntegrationCommand({
//       ApiId: API_ID,
//       IntegrationMethod: "GET",
//       IntegrationType: "AWS_PROXY",
//       IntegrationUri: "arn:aws:lambda:us-east-1:<your-acount-number>:function:<your-lambda-name>",
//       PayloadFormatVersion: "2.0"
//   }))

//   // if the integration creation is successful, us the integration id to tie it to a route.
//   // in this case if GET to host/items or host/items/{id} is called the lambda function supplied in the previous step would be called.
//   if (res.IntegrationId) {
//       await client.send(new CreateRouteCommand({
//           ApiId: API_ID,
//           RouteKey: "GET /items",
//           Target: `integrations/${res.IntegrationId}`
//       }))
//   }

//   if (res.IntegrationId) {
//       console.log(res.IntegrationId)
//       await client.send(new CreateRouteCommand({
//           ApiId: API_ID,
//           RouteKey: "GET /items/{id}",
//           Target: `integrations/${res.IntegrationId}`
//       }
//       ))
//   }

//   // Once we set up the desired routes and integration we need to create a stage before we deploy our API.
//   const createStageResult = await client.send(new CreateStageCommand({
//       ApiId: API_ID,
//       StageName: "stage-one",
//   }))

//   // if stage creation is successful, deploy that stage / version of the API.
//   if (createStageResult.StageName){
//       const data = await client.send(new CreateDeploymentCommand({
//           ApiId: API_ID,
//           StageName: createStageResult.StageName
//       }))
//       console.log(data)
//   }

// } catch (error) {
//   console.log(error)
// }
