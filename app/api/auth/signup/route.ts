import { NextRequest, NextResponse } from 'next/server';
import { signUp } from '@/services/CognitoAuth';
import { getSecretHash } from '@/lib/secretHash';

export async function POST(req: NextRequest) {
  if (!req.body) return NextResponse.json({}, { status: 401 });
  const request = await req.json();
  const { email, password, givenName, familyName } = request;
  const secretHash = getSecretHash(email);
  try {
    const response = await signUp({
      email,
      password,
      secretHash,
      givenName,
      familyName,
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    let message = 'Server error';
    let status = 500;
    let code = '0000';
    return NextResponse.json({ message, code }, { status });
  }
}
