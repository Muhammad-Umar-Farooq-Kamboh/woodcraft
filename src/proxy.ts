import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;
  const normalizedPathname =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  // Allow access to auth routes without authentication
  if (/^\/(signin|signup)(\/|$)/.test(normalizedPathname)) {
    return NextResponse.next();
  }

  // If no token (not authenticated), redirect to signin
  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const userRole = (token.role as string | undefined)?.toLowerCase();

  // Define allowed routes for each role
  const rolePermissions = {
    admin: ["/admin", "/profile"],
    employee: ["/employee", "/profile"],
    supplier: ["/supplier", "/profile"],
    customer: ["/customer", "/profile"],
  } as const;
  // console.log("Test");

  type RoleType = keyof typeof rolePermissions;

  const roleRoutes: Record<RoleType, string> = {
    admin: "/admin",
    employee: "/employee",
    supplier: "/supplier",
    customer: "/customer",
  };

  const isRole = (role: string | undefined): role is RoleType => {
    return Boolean(role && role in rolePermissions);
  };

  if (!isRole(userRole)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const allowedRoutes = rolePermissions[userRole];
  const isAllowed = allowedRoutes.some(
    (route) =>
      normalizedPathname === route ||
      normalizedPathname.startsWith(`${route}/`),
  );

  if (isAllowed) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(roleRoutes[userRole], request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
