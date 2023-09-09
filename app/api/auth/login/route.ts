import { getSecretHash } from '@/lib/secretHash';
import { SignInCognito } from '@/services/CognitoAuth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (!req.body) return NextResponse.json({}, { status: 405 });

  const { email, password } = await req.json();
  const secretHash = getSecretHash(email);
  try {
    const response = await SignInCognito(email, password, secretHash);
    return NextResponse.json(
      { ...response.AuthenticationResult },
      { status: response.$metadata.httpStatusCode }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        ok: false,
        msg: 'Error login user',
      },
      { status: error['$metadata']?.httpStatusCode }
    );
  }
}
