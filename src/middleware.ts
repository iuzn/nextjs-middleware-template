import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)'],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers.get('host') || '';

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.vercel.app`, '')
      : hostname.replace(`.localhost:3000`, '');

  if (currentHost == 'app') {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (hostname === 'localhost:3000') {
    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.rewrite(url);
}
