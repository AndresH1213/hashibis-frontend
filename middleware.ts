import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const isAdminRoute = (req: NextRequest) => {
  return req.url.includes('/admin') || req.nextUrl.href.includes('/admin');
};

const isAdminEmail = (email: string) => email === process.env.ADMIN_EMAIL;

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (isAdminRoute(req)) {
    if (isAdminEmail(session?.email || '')) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/'));
  }

  // redirect for auth routes with session
  if (session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signup', '/signup/confirm-code', '/login', '/admin/products'],
};
