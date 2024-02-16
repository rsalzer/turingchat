import { NextResponse } from "next/server";
import {
  classifyImageInDynamoDB,
  reclassifyImageInDynamoDB,
} from "@/utils/awshandler";

export async function POST(req: Request) {
  const data = await req.json();
  const experiment: string = data.experiment;
  const value = data.value;
  const key = data.key;
  const reclassify = data.reclassify;
  if (!experiment || !value || !key) {
    return NextResponse.json({});
  }
  try {
    if (reclassify) {
      await reclassifyImageInDynamoDB(experiment, key, value);
    } else {
      await classifyImageInDynamoDB(experiment, key, value);
    }
    return NextResponse.json({});
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message ?? "" });
  }
}
