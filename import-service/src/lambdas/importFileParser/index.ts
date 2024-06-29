import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { S3Event } from 'aws-lambda';
import * as CSV from 'csv-string';
import { createProduct } from '../../lib/createProduct';
import { ProductIncome } from '../../lib/transformProduct';

export const handler = async (event: S3Event) => {
  const client = new S3Client();
  const Bucket = event.Records[0].s3.bucket.name;
  const source = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, ' ')
  );
  const fileName = source.split('/')[1].toString();
  console.log(fileName);

  try {
    const getObjResp = await client.send(
      new GetObjectCommand({
        Bucket,
        Key: source,
      })
    );

    const data = (await getObjResp.Body?.transformToString()) as string;
    const products = CSV.parse(data, {
      output: 'objects',
    });

    console.log(products);
    products.map((product) => createProduct(product as ProductIncome));
  } catch (err) {
    console.log(err);
  }

  try {
    await client.send(
      new CopyObjectCommand({
        CopySource: `${Bucket}/${source}`,
        Bucket,
        Key: `parsed/${fileName}`,
      })
    );

    await client.send(
      new DeleteObjectCommand({
        Bucket,
        Key: source,
      })
    );
  } catch (err) {
    console.log(err);
  }
};
