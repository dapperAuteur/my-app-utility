import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // is this middleware working
    console.log('6 middleware req.nextauth.token.role :>> ', req.nextauth.token.role);
    if ((req.nextUrl.pathname.startsWith("/create") ) && req.nextauth.token.role !== "admin") {      
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
    console.log('10 middleware req.nextauth.token.role :>> ', req.nextauth.token.role);
    if ((req.nextUrl.pathname.endsWith(`/edit`)) && req.nextauth.token.role !== "admin") {
      console.log('12 middleware req.nextauth.token.role :>> ', req.nextauth.token.role);
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({token}) => !!token,
    }
  }
)

export const config = {
  matcher: [
    "/client-member",
    "/create-account",
    "/create-tag",
    "/create-transaction",
    "/create-user",
    "/member"
  ]
};