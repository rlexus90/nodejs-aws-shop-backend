import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../src/lambdas/getProductId';
import { products } from '../src/mock/mockData';


const product ={
  description: "Short Product Description1",
  id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
  price: 24,
  title: "ProductOne",
  count: 1,
}

test('Function return product by id', async () => {
  const resp = await handler({ pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa'} } as unknown as APIGatewayProxyEvent);
  
  expect(resp.statusCode).toBe(200);
  expect(JSON.parse(resp.body)).toEqual(product);
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