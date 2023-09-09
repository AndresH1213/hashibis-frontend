import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { refreshToken, updateUserAttributes } from '@/services/CognitoAuth';

export async function POST(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!req.body) return NextResponse.json({}, { status: 401 });
  if (!session) return NextResponse.json({}, { status: 403 });

  const { imageUrl } = await req.json();

  try {
    const resp = await updateUserAttributes(session.sub!, {
      name: 'picture',
      value: imageUrl,
    });

    return NextResponse.json({}, { status: resp.$metadata.httpStatusCode });
  } catch (error) {
    console.log({ error: JSON.stringify(error) });
    let message = 'Server error';
    let status = 500;
    let code = '0000';
    return NextResponse.json({ message, code }, { status });
  }
}
