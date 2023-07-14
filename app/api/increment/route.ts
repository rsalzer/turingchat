import Redis from "ioredis";
import { NextResponse } from "next/server";

const redis = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
});

export async function POST() {
  const count = await redis.incr("counter");
  return NextResponse.json({ count });
}

export async function GET() {
  const count = await redis.get("counter");
  return NextResponse.json({ count });
}
