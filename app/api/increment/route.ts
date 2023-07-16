import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  const data = await req.json();
  const hash: string = data.hash;
  const keys: string[] = data.keys;
  for await (const item of keys) {
    await redis.hincrby(hash, item, 1);
  }

  const count = await redis.hgetall(hash);
  return NextResponse.json({ count });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const hash = url.searchParams.get("hash");
  if (hash != null) {
    const count = await redis.hgetall(hash);
    return NextResponse.json({ count });
  }
  return NextResponse.json({});
}
