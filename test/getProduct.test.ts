import { handler } from '../src/lambdas/getProductsList';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { returnProducts } from '../src/lib/returnProducts';

test('Function return all Products', async () => {
  const resp = await handler({} as APIGatewayProxyEvent);

  expect(resp.statusCode).toBe(200);
  expect(JSON.parse(resp.body)).toEqual(returnProducts());
});
