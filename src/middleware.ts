import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const sessionCookie = getSessionCookie(request);
  console.log("middleware");

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/authentication", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/appointments/:path*",
    "/clinic-form/:path*",
    "/doctors/:path*",
    "/patients/:path*",
    "/subscription/:path*",
    //"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
