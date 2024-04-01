import { NextResponse } from "next/server";
import { getUnclassifiedImageFromDynamoDB } from "@/utils/awshandler";
import experiments from "@/public/experiments.json";
import { ExperimentType } from "@/components/Experiment";

export async function POST(req: Request) {
  const data = await req.json();
  const id: number = data.id;
  const chosenExperiment = experiments[id] as ExperimentType;
  if (!chosenExperiment || chosenExperiment.type != "image")
    return NextResponse.json({});
  const name = chosenExperiment.name;
  console.log("Getting unclassified items of Experiment", name);

  const items = await getUnclassifiedImageFromDynamoDB(name);
  if (items) {
    const length = items.length;
    if (length > 0 && Math.random() < 0.5) {
      // a bit of randomness
      const randomItem = items[Math.floor(Math.random() * length)];
      const newKey = randomItem.key.replace("i_", "");
      return NextResponse.json({ newKey });
    } else {
      return NextResponse.json({ newImage: true });
    }
  }
  console.log("Something went wrong");
  return NextResponse.json({});
}

// const response = await getImageFromOldDynamoDB(name);
// const nameOfItemToMove = response.Attributes.allObjects[0];
// console.log("Name of Item to move", nameOfItemToMove);
//
// const s3Client = new S3({
//   region: "eu-central-1",
//   credentials: {
//     accessKeyId: process.env.AWS_IAM_USER_ACCESSKEY ?? "",
//     secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY ?? "",
//   },
// });
//
// const dateString = new Date()
//   .toISOString()
//   .replace(/T/, "_") // replace T with a space
//   .replace(/\..+/, "");
//
// const newKey = `v2/${id}/${dateString}.webp`;
// const source = `/turingagency-biastester/${nameOfItemToMove}`;
//
// const moveCommand = new CopyObjectCommand({
//   Bucket: "turingagency-biastester",
//   CopySource: source,
//   Key: newKey,
// });
//
// const deleteCommand = new DeleteObjectCommand({
//   Bucket: "turingagency-biastester",
//   Key: nameOfItemToMove,
// });
//
// try {
//   const moveResponse = await s3Client.send(moveCommand);
//   console.log("Successfully copied, now delete");
//   const deleteResponse = await s3Client.send(deleteCommand);
//   console.log("Successfully deleted, now create DB-Entry");
//   await createImageInDynamoDB(
//     chosenExperiment.name,
//     newKey,
//     nameOfItemToMove
//   );
//   return NextResponse.json({ newKey });
// } catch (e: any) {
//   console.error(e.message);
//   return NextResponse.json({});
// }
