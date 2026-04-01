import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function getUserIdFromSession(
  req: Request | NextRequest,
): Promise<string | null> {
  const token = await getToken({
    req: req as any,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) return null;

  const userId = (token as any).id ?? (token as any).sub ?? null;
  return typeof userId === "string" ? userId : null;
}

export async function verifyUserOrThrow(
  req: Request | NextRequest,
): Promise<string> {
  const id = await getUserIdFromSession(req);
  if (!id) {
    const err: any = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
  return id;
}

export default getUserIdFromSession;
