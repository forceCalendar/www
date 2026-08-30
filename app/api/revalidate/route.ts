import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

/**
 * Invalidates the cached npm registry lookups behind the release banner.
 * Called by the core and interface publish workflows right after a release.
 *
 * POST /api/revalidate
 * Authorization: Bearer <REVALIDATE_TOKEN>
 */
export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_TOKEN;
  if (!expected) {
    return NextResponse.json({ error: "Revalidation is not configured" }, { status: 503 });
  }
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token || !timingSafeEqual(token, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidateTag("npm-releases", "max");
  return NextResponse.json({ revalidated: true, tag: "npm-releases", at: new Date().toISOString() });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
