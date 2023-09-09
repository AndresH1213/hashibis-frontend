import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandOutput,
  AdminGetUserCommand,
  SignUpCommand,
  ResendConfirmationCodeCommand,
  AdminInitiateAuthCommand,
  ListUsersCommand,
  SignUpCommandInput,
  AdminInitiateAuthCommandInput,
  AdminUpdateUserAttributesCommand,
  AdminUpdateUserAttributesCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { SignUpParams } from '@/types';

const client = new CognitoIdentityProviderClient({
  region: process.env.APP_AWS_REGION,
});

export const getUser = async (username: string) => {
  const input = {
    UserPoolId: process.env.COGNITO_POOL_ID,
    Username: username,
  };
  const command = new AdminGetUserCommand(input);
  const response = await client.send(command);
  return response;
};

export const getUserBySub = async (sub: string) => {
  const input = {
    UserPoolId: process.env.COGNITO_POOL_ID,
    Filter: `sub="${sub}"`,
  };
  const command = new ListUsersCommand(input);
  const response = await client.send(command);
  return response;
};

export const updateUserAttributes = async (
  username: string,
  attribute: { name: string; value: string }
) => {
  const input: AdminUpdateUserAttributesCommandInput = {
    UserAttributes: [
      {
        Name: attribute.name,
        Value: attribute.value,
      },
    ],
    Username: username,
    UserPoolId: process.env.COGNITO_POOL_ID,
  };
  const command = new AdminUpdateUserAttributesCommand(input);
  return await client.send(command);
};

export const signUp = async (params: SignUpParams) => {
  const { givenName, familyName, ...creds } = params;
  const input: SignUpCommandInput = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    SecretHash: creds.secretHash,
    Password: creds.password,
    Username: creds.email,
    UserAttributes: [
      {
        Name: 'given_name',
        Value: givenName,
      },
      {
        Name: 'family_name',
        Value: familyName,
      },
      {
        Name: 'name',
        Value: `${givenName} ${familyName}`,
      },
    ],
  };
  const command = new SignUpCommand(input);
  const response = await client.send(command);
  return response;
};

export const confirmSignUp = async (
  email: string,
  code: string,
  secretHash: string
): Promise<ConfirmSignUpCommandOutput> => {
  const input = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    SecretHash: secretHash,
    Username: email,
    ConfirmationCode: code,
  };
  const command = new ConfirmSignUpCommand(input);
  const response = await client.send(command);
  return response;
};

export const resendConfirmationCode = async (
  email: string,
  secretHash: string
) => {
  const input = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    SecretHash: secretHash,
    Username: email,
  };
  const command = new ResendConfirmationCodeCommand(input);
  const response = await client.send(command);
  return response;
};

export const SignInCognito = async (
  username: string,
  password: string,
  secretHash: string
) => {
  const input: AdminInitiateAuthCommandInput = {
    AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID,
    UserPoolId: process.env.COGNITO_POOL_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  };
  const command = new AdminInitiateAuthCommand(input);
  const response = await client.send(command);
  return response;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await fetch(`${process.env.COGNITO_DOMAIN}/oauth2/token`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.COGNITO_CLIENT_ID!,
      client_secret: process.env.COGNITO_CLIENT_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    method: 'POST',
  });
  return await response.json();
};
