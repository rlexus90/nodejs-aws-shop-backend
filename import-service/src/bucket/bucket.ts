import {
  CreateBucketCommand,
  GetBucketLocationCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const client = new S3Client({});

export const bucket = async () => {
  const command = new CreateBucketCommand({
    Bucket: 'aws-shop-import',
    CreateBucketConfiguration: {
      LocationConstraint: 'eu-west-2',
    },
  });

  try {
    await client.send(
      new GetBucketLocationCommand({
        Bucket: 'aws-shop-import',
      })
    );
    console.log('aws-shop-import exist');
  } catch {
    try {
      const { Location } = await client.send(command);
      console.log(`aws-shop-import created with location ${Location}`);
    } catch (err) {
      console.error(err);
    }
  }
};
