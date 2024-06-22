import { APIGatewayProxyEvent } from 'aws-lambda';
import { returnResponse } from '../../lib/returnResponse';
import { returnProducts } from '../../lib/returnProducts';


export const handler = async (event: APIGatewayProxyEvent) => {
const products = returnProducts();
if (products) return returnResponse(200, products)
  
  return returnResponse(404, {message:'Product not found'})
}