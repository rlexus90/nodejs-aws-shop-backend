export const handler = async (event: any) => {
  console.log('hello');
  console.log(event);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS',
    },
    body: JSON.stringify({ event }),
  };
};
