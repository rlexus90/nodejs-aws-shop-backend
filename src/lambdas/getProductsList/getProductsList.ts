import { APIGatewayProxyEvent } from 'aws-lambda';
import { returnResponse } from './returnResponse';
import { returnProducts } from './returnProducts';


export const handler = async (event: APIGatewayProxyEvent) => {

  return returnResponse(200, returnProducts())
}