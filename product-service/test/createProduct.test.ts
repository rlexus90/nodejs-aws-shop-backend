import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { CreateProductDTO } from '../src/API/DTO/createProductDTO';
import { handler } from '../src/lambdas/createProduct';

const createDTO: CreateProductDTO = {
  count: 1,
  price: 100,
  description: 'description',
  title: 'w',
};

test('Function create product', async () => {
  await handler({ body: JSON.stringify(createDTO) } as APIGatewayProxyEvent);

  expect(true).toBe(true);
});
