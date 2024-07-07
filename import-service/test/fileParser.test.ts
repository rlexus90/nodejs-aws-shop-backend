import { S3Event } from 'aws-lambda';
import { handler as parserFn } from '../src/lambdas/importFileParser/index';
import { MockFile, mockEvent } from './mockData';
import { mockClient } from 'aws-sdk-client-mock';

jest.mock('../src/lib/sendMessage');
import { sendMessage } from '../src/lib/sendMessage';

jest.mock('@aws-sdk/client-s3');
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

describe('Parser Test', () => {
  test('Function work correctly', async () => {
    const S3ClientMock = mockClient(S3Client);
    S3ClientMock.on(GetObjectCommand).resolves({
      Body: { transformToString: () => MockFile },
    } as any);

    await parserFn(mockEvent as S3Event);
    expect(GetObjectCommand).toHaveBeenCalled();
    expect(CopyObjectCommand).toHaveBeenCalled();
    expect(DeleteObjectCommand).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(5);
    expect(true).toBe(true);
  });
});
