import { NextResponse } from "next/server";
import get from "axios";
import sharp from "sharp";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { createImageInDynamoDB } from "@/utils/awshandler";
import experiments from "@/public/experiments.json";
import { ExperimentType } from "@/components/Experiment";

async function imageUpload(url: string, id: number) {
  const { data } = await get<ArrayBuffer>(url, {
    responseType: "arraybuffer",
  });
  console.log("Converting to webp", id, url);
  const webpData = await sharp(data).webp().toBuffer();

  const s3Client = new S3({
    region: "eu-central-1",
    credentials: {
      accessKeyId: process.env.AWS_IAM_USER_ACCESSKEY ?? "",
      secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY ?? "",
    },
  });

  const dateString = new Date()
    .toISOString()
    .replace(/T/, "_") // replace T with a space
    .replace(/\..+/, "");

  const key = `v2/${id}/${dateString}.webp`;
  const chosenExperiment = experiments[id] as ExperimentType; // experiments[0][params.id];

  const params = {
    Bucket: "turingagency-biastester",
    Key: key,
    Body: webpData,
    ContentType: "image/webp",
  };
  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log("Successfully uploaded to S3");
    await createImageInDynamoDB(chosenExperiment.name, key);
    return key;
  } catch (error) {
    console.log("Error while uploading to S3");
    console.log(error);
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  const url: string = data.url;
  const id: number = data.id;
  const key = await imageUpload(url, id);
  return NextResponse.json({ key });
}
