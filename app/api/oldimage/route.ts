import { NextResponse } from "next/server";
import {
  createImageInDynamoDB,
  getImageFromOldDynamoDB,
} from "@/utils/awshandler";
import experiments from "@/public/experiments.json";
import { ExperimentType } from "@/components/Experiment";
import { CopyObjectCommand, DeleteObjectCommand, S3 } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  const data = await req.json();
  const id: number = data.id;
  const chosenExperiment = experiments[id] as ExperimentType;
  if (!chosenExperiment || chosenExperiment.type != "image")
    return NextResponse.json({});
  const name = chosenExperiment.name;
  console.log("Getting Item of Experiment", name);
  const response = await getImageFromOldDynamoDB(name);
  if (!response || !response.Attributes) {
    console.log("No response from DynamoDB or no more Items to move?");
    return NextResponse.json({});
  }
  const nameOfItemToMove = response.Attributes.allObjects[0];
  console.log("Name of Item to move", nameOfItemToMove);

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

  const newKey = `v2/${id}/${dateString}.webp`;
  const source = `/turingagency-biastester/${nameOfItemToMove}`;

  const moveCommand = new CopyObjectCommand({
    Bucket: "turingagency-biastester",
    CopySource: source,
    Key: newKey,
  });

  const deleteCommand = new DeleteObjectCommand({
    Bucket: "turingagency-biastester",
    Key: nameOfItemToMove,
  });

  try {
    const moveResponse = await s3Client.send(moveCommand);
    console.log("Successfully copied, now delete");
    const deleteResponse = await s3Client.send(deleteCommand);
    console.log("Successfully deleted, now create DB-Entry");
    await createImageInDynamoDB(
      chosenExperiment.name,
      newKey,
      nameOfItemToMove
    );
    return NextResponse.json({ newKey });
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.json({});
  }
}
