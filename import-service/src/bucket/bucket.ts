import {
  CreateBucketCommand,
  GetBucketLocationCommand,
  PutBucketCorsCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { names } from '../constants';

const client = new S3Client({});
const Bucket = names.bucketName;

export const bucket = async () => {
  const command = new CreateBucketCommand({
    Bucket,
    CreateBucketConfiguration: {
      LocationConstraint: 'eu-west-2',
    },
  });

  const cors = new PutBucketCorsCommand({
    Bucket,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ['*'],
          AllowedMethods: ['PUT', 'POST', 'DELETE'],
          AllowedOrigins: ['*'],
          ExposeHeaders: [],
          MaxAgeSeconds: 3000,
        },
      ],
    },
  });

  try {
    await client.send(
      new GetBucketLocationCommand({
        Bucket,
      })
    );
    console.log('aws-shop-import exist');
  } catch {
    try {
      const { Location } = await client.send(command);
      await client.send(cors);
      console.log(`aws-shop-import created with location ${Location}`);
    } catch (err) {
      console.error(err);
    }
  }
};
