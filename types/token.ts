export interface PayloadToken {
  at_hash: string;
  sub: string;
  email: string;
  'cognito:groups'?: string[];
  email_verified: boolean;
  iss: string;
  'cognito:username'?: string;
  given_name?: string;
  picture?: string;
  origin_jti?: string;
  aud: string;
  identities?: Identity[];
  token_use: string;
  auth_time: number;
  gender?: string;
  birthdate?: string;
  name?: string;
  nickname?: string;
  exp: number;
  iat: number;
  family_name?: string;
  jti: string;
}

export interface Identity {
  userId: string;
  providerName: string;
  providerType: string;
  issuer?: string | null;
  primary?: string;
  dateCreated?: string;
}
