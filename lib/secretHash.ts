import { createHmac } from 'crypto';

const getSecretHash = (email: string) => {
  // create the hmac with the sha256 algorithm and a secret key
  const hasher = createHmac('sha256', process.env.COGNITO_CLIENT_SECRET!);

  // add the value we want to hash
  hasher.update(email + process.env.COGNITO_CLIENT_ID);

  // get the hashed value as base64
  let secretHash = hasher.digest('base64');
  return secretHash;
};

export { getSecretHash };
