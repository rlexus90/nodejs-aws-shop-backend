import { APIGatewayProxyEvent } from 'aws-lambda';
import { returnProducts } from '../src/lib/returnProducts';
import { handler } from '../src/lambdas/getProductId';

const products = returnProducts();

test('Function return product by id', async () => {
  const resp = await handler({ pathParameters: { productId: products[0].id } } as unknown as APIGatewayProxyEvent);
  expect(resp.statusCode).toBe(200);
  expect(JSON.parse(resp.body)).toEqual(products[0]);
});


test('Function return 404', async () => {
  const resp = await handler({ pathParameters: { productId:'some wrong id' } } as unknown as APIGatewayProxyEvent);
  expect(resp.statusCode).toBe(404);
  expect(JSON.parse(resp.body).message).toEqual('Product not found');
});

test('Function return 40', async () => {
  const resp = await handler({ pathParameters: { } } as unknown as APIGatewayProxyEvent);
  expect(resp.statusCode).toBe(403);
  expect(JSON.parse(resp.body).message).toEqual('You must enter Id');
});