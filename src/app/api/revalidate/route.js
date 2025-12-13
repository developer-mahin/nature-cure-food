import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const revalidationAttempts = new Map();
const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS_PER_WINDOW = 30;

function checkRateLimit(identifier) {
  const now = Date.now();
  const attempts = revalidationAttempts.get(identifier) || [];

  const recentAttempts = attempts.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (recentAttempts.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  recentAttempts.push(now);
  revalidationAttempts.set(identifier, recentAttempts);

  return true;
}

export async function POST(request) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const { secret, tag, tags, path, paths, tenant } = body;

    const expectedSecret = process.env.REVALIDATION_SECRET;

    if (!expectedSecret) {
      console.error(
        "⚠️ REVALIDATION_SECRET not configured in environment variables"
      );
      return NextResponse.json(
        { success: false, message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      console.warn("🚨 Unauthorized revalidation attempt detected", {
        timestamp: new Date().toISOString(),
        tenant: tenant || "unknown",
        ip: request.headers.get("x-forwarded-for") || "unknown",
      });

      return NextResponse.json(
        { success: false, message: "Invalid secret token" },
        { status: 401 }
      );
    }

    const expectedTenant = process.env.NEXT_PUBLIC_TENANT_ID || "natural-plus";

    if (tenant && tenant !== expectedTenant) {
      console.warn("🚨 Invalid tenant attempted revalidation", {
        received: tenant,
        expected: expectedTenant,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { success: false, message: "Invalid tenant" },
        { status: 403 }
      );
    }

    const rateLimitKey = `${tenant || expectedTenant}-revalidation`;

    if (!checkRateLimit(rateLimitKey)) {
      console.warn("⚠️ Rate limit exceeded for revalidation", {
        tenant: tenant || expectedTenant,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          success: false,
          message: "Rate limit exceeded. Max 30 requests per minute.",
        },
        { status: 429 }
      );
    }

    const tagsToRevalidate = tags || (tag ? [tag] : []);
    const pathsToRevalidate = paths || (path ? [path] : []);

    if (tagsToRevalidate.length === 0 && pathsToRevalidate.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No tags or paths provided for revalidation",
        },
        { status: 400 }
      );
    }

    const revalidatedTags = [];
    const revalidatedPaths = [];

    for (const tagItem of tagsToRevalidate) {
      try {
        revalidateTag(tagItem);
        revalidatedTags.push(tagItem);
      } catch (error) {
        console.error(`Error revalidating tag: ${tagItem}`, error);
      }
    }

    for (const pathItem of pathsToRevalidate) {
      try {
        revalidatePath(pathItem);
        revalidatedPaths.push(pathItem);
      } catch (error) {
        console.error(`Error revalidating path: ${pathItem}`, error);
      }
    }

    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      revalidated: true,
      tenant: tenant || expectedTenant,
      tags: revalidatedTags,
      paths: revalidatedPaths,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    console.error("❌ Revalidation error:", {
      message: error.message,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during revalidation",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "operational",
    endpoint: "/api/revalidate",
    message: "Revalidation API is running",
    timestamp: new Date().toISOString(),
  });
}
