import { APIGatewayRequestAuthorizerEventV2 } from 'aws-lambda';

export const handler = async (event: APIGatewayRequestAuthorizerEventV2) => {
  if (!event.identitySource[0])
    return {
      isAuthorized: false,
    };

    try {
    const credentials = event.identitySource[0].split(' ')[1];
    const encodedCredentials = atob(credentials);
    const [login, password] = encodedCredentials.split('=');

    const expectedPassword = process.env[login.trim()];
    console.log(credentials, expectedPassword, password);

    if (expectedPassword?.trim() === password.trim())
      return { isAuthorized: true };
  } catch {
    return { isAuthorized: false };
  }

  return { isAuthorized: false };
};
