import { NextRequest, NextResponse } from "next/server";
import {
  getCountFromDynamoDB,
  updateCountOnDynamoDB,
} from "@/utils/awshandler";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const hash = url.searchParams.get("hash");
  if (!hash) {
    return NextResponse.json({});
  }
  try {
    const response = await getCountFromDynamoDB(hash);
    return NextResponse.json(response);
    // {
    //   status: 200,
    //     headers: {
    //   "Access-Control-Allow-Origin": `${process.env.DOMAIN_URL}`,
    // },
    // }
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  const hash: string = data.hash;
  if (!hash) {
    return NextResponse.json({});
  }
  const keys: string[] = data.keys;

  try {
    const response = await updateCountOnDynamoDB(hash, keys);
    return NextResponse.json(response);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message ?? "" });
  }
}
