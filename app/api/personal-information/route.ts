import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { refreshToken } from '@/services/CognitoAuth';
import { putPersonalInformation } from '@/services/PersonalInformation';
import { removeEmptyProperties } from '@/lib/utils';

export async function POST(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!req.body) return NextResponse.json({}, { status: 401 });
  if (!session) return NextResponse.json({}, { status: 403 });
  const form = await req.json();
  const personalInformation = removeEmptyProperties(form);

  const { access_token } = await refreshToken(session.refreshToken as string);
  try {
    const resp = await putPersonalInformation(
      personalInformation,
      access_token
    );

    if (resp.status === 400) {
      const { errors } = await resp.json();
      return NextResponse.json({ errors }, { status: resp.status });
    }

    return NextResponse.json({}, { status: resp.status });
  } catch (error) {
    let message = 'Server error';
    let status = 500;
    let code = '0000';
    return NextResponse.json({ message, code }, { status });
  }
}
