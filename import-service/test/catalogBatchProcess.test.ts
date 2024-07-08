jest.mock('@aws-sdk/client-sns');

import { handler as batch } from '../src/lambdas/catalogBatchProcess';
import { SQSEvent } from 'aws-lambda';
import { SQSEventMock } from './mockData';
import { mockClient } from 'aws-sdk-client-mock';
import { ListTopicsCommand, SNSClient } from '@aws-sdk/client-sns';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const SNSMock = mockClient(SNSClient);
SNSMock.on(ListTopicsCommand).resolves({ Topics: [{ TopicArn: 'arn' }] });

const DBMock = mockClient(DynamoDBDocumentClient);
DBMock.on(PutCommand).resolves({});

beforeEach(() => {
  DBMock.reset();
});

test('Function work correctly', async () => {
  const res = await batch(SQSEventMock as unknown as SQSEvent);

  console.log(res);
  expect(res).toEqual(['updated', 'created', 'Wrong message']);
  expect(true).toBe(true);
});
