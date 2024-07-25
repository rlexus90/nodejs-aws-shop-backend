export const MockFile = `title,description,price,count
First product,Description for first product,10,1
Five product,Description for five product,50,5
Fourth product,Description for fourth product,40,4
Second product,Description for second product,20,2
Three product,Description for three product,30,3`;

export const mockEvent = {
  Records: [
    {
      s3: {
        bucket: { name: 'S3BucketName' },
        object: {
          key: 'imported/someObject',
        },
      },
    },
  ],
};

export const v = JSON.stringify({
  id: '585013bc-e050-4bf6-b79f-c28c49b93931',
  title: 'Fourth product',
  description: 'Description for fourth product',
  price: '5',
  count: '4',
});

export const SQSEventMock = {
  Records: [
    {
      body: JSON.stringify({
        id: '585013bc-e050-4bf6-b79f-c28c49b93931',
        title: 'Fourth product',
        description: 'Description for fourth product',
        price: '5',
        count: '4',
      }),
    },
    {
      body: JSON.stringify({
        title: 'Fourth product',
        description: 'Description for fourth product',
        price: '5',
        count: '4',
      }),
    },
    {
      body: JSON.stringify({
        title: 'Fourth product',
        description: 'Description for fourth product',
        price: '-5',
        count: '4',
      }),
    },
  ],
};
