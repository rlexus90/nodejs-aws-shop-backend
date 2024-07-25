import { APIGatewayRequestAuthorizerEventV2 } from 'aws-lambda';

export const handler = async (event: APIGatewayRequestAuthorizerEventV2) => {
  if (!event.identitySource[0])
    return {
      isAuthorized: false,
    };

  try {
    const [type, credentials] = event.identitySource[0].split(' ');
    if (type.trim() !== 'Basic')
      return {
        isAuthorized: false,
      };

    const encodedCredentials = atob(credentials);

    const [login, password] = encodedCredentials.split('=');
    const expectedPassword = process.env[login.trim()];

    const [loginAdditional, passwordAdditional] = encodedCredentials.split(':');
    const expectedPasswordAdditional = process.env[loginAdditional.trim()];

    console.log(credentials, expectedPassword, password);
    console.log(credentials, expectedPasswordAdditional, passwordAdditional);

    if (
      expectedPassword?.trim() === password.trim() ||
      expectedPasswordAdditional?.trim() === passwordAdditional.trim()
    )
      return { isAuthorized: true };
  } catch {
    return { isAuthorized: false };
  }

  return { isAuthorized: false };
};
