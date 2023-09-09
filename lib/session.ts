import { getServerSession } from 'next-auth/next';
import { NextAuthOptions, TokenSet } from 'next-auth';
import { Provider } from 'next-auth/providers';
import { JWT } from 'next-auth/jwt';
import { SessionInterface, UserProfile } from '@/types';
import jsonwebtoken from 'jsonwebtoken';
import { PayloadToken } from '@/types/token';
import CognitoProvider from 'next-auth/providers/cognito';
import { refreshToken } from '@/services/CognitoAuth';

type TProvider = 'Google' | 'Facebook';
interface IJWT extends JWT {
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  tokenType?: 'Bearer';
  sub?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

const {
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
  AWS_REGION,
  COGNITO_POOL_ID,
  COGNITO_DOMAIN,
  NEXTAUTH_URL,
  ADMIN_EMAIL,
} = process.env;
function getProvider(provider: TProvider): Provider {
  return {
    id: `cognito_${provider.toLocaleLowerCase()}`,
    name: `Cognito${provider}`,
    type: 'oauth',
    clientId: COGNITO_CLIENT_ID!,
    clientSecret: COGNITO_CLIENT_SECRET!,
    issuer: `https://cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_POOL_ID}`,
    wellKnown: `https://cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_POOL_ID}/.well-known/openid-configuration`,
    authorization: {
      url: `${COGNITO_DOMAIN}/oauth2/authorize`,
      params: {
        response_type: 'code',
        client_id: COGNITO_CLIENT_ID,
        client_secret: COGNITO_CLIENT_SECRET,
        identity_provider: provider,
        redirect_uri: `${NEXTAUTH_URL}/api/auth/callback/cognito_${provider.toLowerCase()}`,
      },
    },
    checks: ['state', 'nonce'],
    token: {
      url: `${COGNITO_DOMAIN}/oauth2/token`,
      params: {
        grant_type: 'authorization_code',
        client_id: COGNITO_CLIENT_ID,
        client_secret: COGNITO_CLIENT_SECRET,
        redirect_uri: `${NEXTAUTH_URL}/api/auth/callback/cognito_${provider.toLowerCase()}`,
      },
    },
    userinfo: {
      url: `${COGNITO_DOMAIN}/oauth2/userInfo`,
    },
    idToken: true,
    profile: function (profile) {
      return {
        id: profile.sub,
        ...profile,
      };
    },
  };
}

const providers: TProvider[] = ['Google', 'Facebook'];

export const authOptions: NextAuthOptions = {
  providers: [
    ...providers.map((provider: TProvider) => getProvider(provider)),
    CognitoProvider({
      clientId: COGNITO_CLIENT_ID!,
      clientSecret: COGNITO_CLIENT_SECRET!,
      issuer: `https://cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_POOL_ID}`,
      idToken: true,
    }),
  ],
  theme: {
    colorScheme: 'light',
    logo: '/logo.svg',
  },
  callbacks: {
    async jwt({ token, account }): Promise<IJWT> {
      const itoken = token as IJWT;

      if (account) {
        console.log({ account });
        return {
          ...itoken,
          accessToken: account.access_token,
          idToken: account.id_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
          tokenType: 'Bearer',
        };
      }

      if (Date.now() < itoken.expiresAt!) {
        return token;
      }

      try {
        const tokens: TokenSet = await refreshToken(itoken.refreshToken!);
        if (!tokens.access_token) throw tokens;

        const expiresAt = Date.now() + Number(tokens.expires_in) * 1000;
        return {
          ...itoken,
          accessToken: tokens.access_token,
          idToken: tokens.id_token,
          expiresAt,
        };
      } catch (error) {
        console.error('Error refreshing access and id tokens: ', error);
        return { ...token, error: 'RefreshTokensError' as const };
      }
    },
    async session({
      session,
      token,
    }: {
      session: any;
      token: IJWT;
    }): Promise<SessionInterface> {
      try {
        const decodedToken = jsonwebtoken.decode(token.idToken || '', {
          complete: true,
        });
        const payloadToken = decodedToken?.payload as PayloadToken;
        const newSession = {
          ...session,
          token: token.accessToken,
          user: {
            username: payloadToken['cognito:username'],
            id: payloadToken.sub,
            email: payloadToken.email,
            picture: payloadToken.picture,
            given_name: payloadToken.given_name,
            family_name: payloadToken.family_name,
            gender: payloadToken.gender,
            name: payloadToken.name || payloadToken.nickname,
            birthdate: payloadToken.birthdate,
            isAdmin: payloadToken.email === ADMIN_EMAIL,
          },
        };

        return newSession;
      } catch (error: any) {
        console.error('Error retrieving user data: ', error.message);
        return session;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
