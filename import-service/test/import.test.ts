jest.mock('@aws-sdk/s3-request-presigner');
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

jest.mock('@aws-sdk/client-s3');
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { handler as importService } from '../src/lambdas/import-file/index';
import { APIGatewayProxyEventV2 } from 'aws-lambda/trigger/api-gateway-proxy';

describe('Import file tests', () => {
  const expectedParams = {
    Bucket: 'aws-shop-import',
    Key: `uploaded/test.csv`,
  };

  const expectResponse = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS',
    },
    body: 'https://some-path.com',
  };

  test('Function return url', async () => {
    const getSignedUrlMock: jest.Mock = getSignedUrl as any;
    getSignedUrlMock.mockResolvedValue('https://some-path.com');

    const resp = await importService({
      queryStringParameters: { name: 'test.csv' },
    } as unknown as APIGatewayProxyEventV2);

    expect(PutObjectCommand).toHaveBeenCalledWith(expectedParams);

    expect(resp).toEqual(expectResponse);
  });
});
