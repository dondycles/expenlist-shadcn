import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && req.nextUrl.pathname === "/auth")
    return NextResponse.redirect(new URL("/lists", req.url));

  if (user && req.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL("/lists", req.url));

  if (!user && req.nextUrl.pathname === "/lists")
    return NextResponse.redirect(new URL("/auth", req.url));

  return res;
}

export const config = {
  matcher: ["/", "/auth", "/lists"],
};
