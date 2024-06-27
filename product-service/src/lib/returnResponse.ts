export const returnResponse = (
  status: number,
  body: string | object | any[]
) => {
  if (typeof body === 'string')
    return {
      statusCode: status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS',
      },
      body,
    };

  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS',
    },
    body: JSON.stringify(body),
  };
};
