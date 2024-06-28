const csv = require('csv-parser');
const fs = require('fs');
import path = require('path');
const results: any[] = [];

fs.createReadStream(path.resolve(__dirname, 'test.csv'))
  .pipe(csv())
  .on('data', (data: any) => results.push(data))
  .on('end', () => {
    console.log(results);
  });
