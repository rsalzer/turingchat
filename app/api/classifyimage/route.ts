import { NextResponse } from "next/server";
import { classifyImageInDynamoDB } from "@/utils/awshandler";

export async function POST(req: Request) {
  const data = await req.json();
  const experiment: string = data.experiment;
  const value = data.value;
  const key = data.key;
  if (!experiment || !value || !key) {
    return NextResponse.json({});
  }
  try {
    await classifyImageInDynamoDB(experiment, key, value);
    return NextResponse.json({});
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message ?? "" });
  }
}
