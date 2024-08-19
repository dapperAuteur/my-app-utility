import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if ((req.nextUrl.pathname.startsWith("/create-user") || req.nextUrl.pathname.startsWith("/create-transaction")) && req.nextauth.token.role !== "admin") {      
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
    "/create-user",
    "/create-transaction",
    "/client-member",
    "/member"
  ]
};