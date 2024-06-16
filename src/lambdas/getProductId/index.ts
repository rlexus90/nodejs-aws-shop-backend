import { APIGatewayProxyEvent } from 'aws-lambda';
import { returnProducts } from '../../lib/returnProducts';
import { returnResponse } from '../../lib/returnResponse';

export const handler = async (event: APIGatewayProxyEvent) => {
  const products = returnProducts();
  const  productId  = event.pathParameters?.productId;

	if(!productId) return returnResponse(403, {message: 'You must enter Id'})

  const product = products.find((product) => product.id === productId);

  if (product) return returnResponse(200, product);

  return returnResponse(404, { message: 'Product not found' });
};
