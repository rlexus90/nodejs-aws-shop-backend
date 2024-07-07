import { api } from './api/api';
import { bucket } from './bucket/bucket';
import { catalogBatchProcessLambda } from './lambdas/catalogBatchProcess-lambda';
import { fileParserLambda } from './lambdas/fileParser-lambda';
import { importLambda } from './lambdas/import-lambda';
import { createProductQueue } from './queue/createProductQueue';

async function init() {
  console.log('\x1b[32m');
  await bucket();
  await importLambda();
  await fileParserLambda();
  await createProductQueue();
  await catalogBatchProcessLambda();
  await api();
}

init();
