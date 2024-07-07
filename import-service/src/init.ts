import { api } from './api/api';
import { bucket } from './bucket/bucket';
import { fileParserLambda } from './lambdas/fileParser-lambda';
import { importLambda } from './lambdas/import-lambda';

async function init() {
  console.log('\x1b[32m');
  await bucket();
  await importLambda();
  await fileParserLambda();
  await api();
}

init();
