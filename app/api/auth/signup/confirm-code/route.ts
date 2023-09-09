import { NextRequest, NextResponse } from 'next/server';
import { confirmSignUp, resendConfirmationCode } from '@/services/CognitoAuth';
import { getSecretHash } from '@/lib/secretHash';
import { ExpiredCodeException } from '@aws-sdk/client-cognito-identity-provider';
import { ExpiredCodeError } from '@/constants/errors';

export async function POST(req: NextRequest) {
  if (!req.body) return NextResponse.json({}, { status: 401 });
  const request = await req.json();
  const { email, code } = request;
  const secretHash = getSecretHash(email);
  try {
    const {
      $metadata: { httpStatusCode },
    } = await confirmSignUp(email, code, secretHash);
    return NextResponse.json({}, { status: httpStatusCode });
  } catch (error) {
    console.log({ error });
    let message = 'Server error';
    let status = 500;
    let code = '0000';
    if (error instanceof ExpiredCodeException) {
      message = ExpiredCodeError.message;
      status = ExpiredCodeError.status;
      code = ExpiredCodeError.code;
    }
    return NextResponse.json({ message, code }, { status });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const email = params.get('email');
  if (!email) {
    return NextResponse.json(
      { message: 'Email missing', code: '0002' },
      { status: 400 }
    );
  }
  const secretHash = getSecretHash(email);
  try {
    const {
      $metadata: { httpStatusCode },
    } = await resendConfirmationCode(email, secretHash);
    return NextResponse.json(
      { message: 'Confirmation code resend' },
      { status: httpStatusCode }
    );
  } catch (error) {
    console.log({ error });
    let message = 'Error when resending confirmation code';
    let status = 500;
    let code = '0000';
    return NextResponse.json({ message, code }, { status });
  }
}
