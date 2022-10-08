# Next.js Middleware Template

## Features

- Next.js 12 (Uses [Next.js Middleware](https://nextjs.org/docs/middleware))
- React 18
- TypeScript
- Tailwind CSS 3
- Jest
- ESLint
- Prettier
- Husky & Lint Staged
- Conventional Commit Lint
- Standard Version Changelog

## Getting Started

You can use the following commands to get started:

```bash
# Install dependencies
yarn

# Run the development server
yarn dev
```

Next.js will start a development server at http://localhost:3000. You can start editing the page by modifying src/pages/home/index.tsx. The page auto-updates as you edit the file. You can see the changes on your browser.

## Middleware working logic

Next.js middleware is a function that runs during the processing of a request. When a request reaches a middleware function, the middleware function can process the request or delegate it to another middleware function. When a middleware function processes the request, the request is terminated and a response is returned. If a middleware function delegates the request to another middleware function, the request is processed when it reaches the delegated middleware function and the response is returned when the request is processed.

## Example

```ts
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  return NextResponse.next();

  const hostname = req.headers.get('host') || ''; // We can get the hostname from the request headers

  // We define the current host based on the environment,
  // if it is production we remove the .vercel.app from the hostname,
  // if it is development we remove the .localhost:3000 from the hostname
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.vercel.app`, '')
      : hostname.replace(`.localhost:3000`, '');

  if (currentHost == 'app') {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  } // We can call the pages under the pages/app directory with a url like app.localhost:3000.

  if (hostname === 'localhost:3000') {
    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  } // If the hostname is localhost:3000, rewrite the request to /home

  return NextResponse.rewrite(url);
}
```
