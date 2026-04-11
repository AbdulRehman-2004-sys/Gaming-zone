import { NextResponse, type NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const { pathname } = req.nextUrl;

  // Protected Admin API Routes
  if (pathname.startsWith('/api/admin')) {
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      const { payload } = await jose.jwtVerify(token, JWT_SECRET);
      
      if (payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
      }
    } catch (error) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  // Protected User Routes (General Authenticated)
  if (pathname.startsWith('/api/user')) {
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      await jose.jwtVerify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*', '/api/user/:path*'],
};
