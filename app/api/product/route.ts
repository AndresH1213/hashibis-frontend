import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { createProduct, getProducts, updateProduct } from '@/services/Product';
import { refreshToken } from '@/services/CognitoAuth';

export async function POST(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!req.body) return NextResponse.json({}, { status: 401 });
  if (!session) return NextResponse.json({}, { status: 403 });
  const form = await req.json();
  const { access_token } = await refreshToken(session.refreshToken as string);

  try {
    const { status } = await createProduct(form, access_token);
    return NextResponse.json({}, { status });
  } catch (error) {
    let message = 'Server error';
    let status = 500;
    let code = '0000';
    return NextResponse.json({ message, code }, { status });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!req.body) return NextResponse.json({}, { status: 401 });
  if (!session) return NextResponse.json({}, { status: 403 });
  const form = await req.json();
  const { access_token } = await refreshToken(session.refreshToken as string);

  try {
    const { status } = await updateProduct(form, access_token);
    return NextResponse.json({}, { status: status });
  } catch (error) {
    console.log(error);
    let message = 'Server error';
    let status = 500;
    let code = '0000';
    return NextResponse.json({ message, code }, { status });
  }
}

export async function GET(req: NextRequest) {
  try {
    const resp = await getProducts();
    if (resp.status !== 200) {
      return NextResponse.json(
        { msg: 'Error retrieving products' },
        { status: resp.status }
      );
    }
    const { items } = await resp.json();
    return NextResponse.json({ products: items }, { status: 200 });
  } catch (error) {
    let message = 'Server error';
    let status = 500;
    let code = '0000';
    return NextResponse.json({ message, code }, { status });
  }
}
