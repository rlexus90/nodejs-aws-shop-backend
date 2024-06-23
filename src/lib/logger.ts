import { APIGatewayProxyEventV2 } from "aws-lambda/trigger/api-gateway-proxy";


export const logger = (event:APIGatewayProxyEventV2 ) => {
	const { requestContext, pathParameters, body } = event;
	const {method,path}=requestContext.http


  if (pathParameters)
    console.log(`Path: ${path||''}
  HTTP Method: ${method||''}
  Path Parameters: ${JSON.stringify(pathParameters||'')}
  Body: ${body||''}`);

  console.log(`Path: ${path||''}
  HTTP Method: ${method||''}
  Body: ${body||''}`);
};
