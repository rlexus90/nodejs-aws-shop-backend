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
        'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS, PUT',
      },
      body,
    };

  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods:': 'POST, GET, OPTIONS, PUT',
    },
    body: JSON.stringify(body),
  };
};
