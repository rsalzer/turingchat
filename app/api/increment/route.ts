import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST() {
  const count = await redis.incr("counter");
  return NextResponse.json({ count });
}

export async function GET() {
  const count = await redis.get("counter");
  return NextResponse.json({ count });
}
