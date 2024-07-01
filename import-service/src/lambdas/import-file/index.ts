import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { APIGatewayProxyEventV2 } from 'aws-lambda/trigger/api-gateway-proxy';

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const { name } = event.queryStringParameters as { name: string };
    if (!name) return;

    const client = new S3Client({});
    const command = new PutObjectCommand({
      Bucket: 'aws-shop-import',
      Key: `uploaded/${name}`,
    });
    const resp = await getSignedUrl(client, command, {
      expiresIn: 3600,
    });

    console.log(resp);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS',
      },
      body: resp,
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS',
      },
      body: JSON.stringify({ err }),
    };
  }
};
