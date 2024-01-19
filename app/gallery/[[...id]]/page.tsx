import { ListObjectsV2Command, S3 } from "@aws-sdk/client-s3";
import InfiniteGalllery from "@/components/InfiniteGallery";

export default async function GalleryPage({
  params = { id: "6" },
}: {
  params: { id: string };
}) {
  let { id } = params;
  if (!id) id = "6";
  const s3Client = new S3({
    region: "eu-central-1",
    credentials: {
      accessKeyId: process.env.AWS_IAM_USER_ACCESSKEY ?? "",
      secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY ?? "",
    },
  });

  let data: string[] = [];
  let count = 0;
  let isTruncated = true;

  const list = new ListObjectsV2Command({
    Bucket: "turingagency-biastester",
    Prefix: `${id}/2`,
  });

  try {
    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken, KeyCount } =
        await s3Client.send(list);
      if (Contents)
        data.push(...Contents.map((singleFile) => singleFile.Key ?? ""));
      count += KeyCount ?? 0;
      isTruncated = IsTruncated ?? false;
      console.log("Is Truncated", isTruncated);
      list.input.ContinuationToken = NextContinuationToken;
    }
    data.reverse();
  } catch (error) {
    console.log(error);
  }

  const baseUrl =
    "https://turingagency-biastester.s3.eu-central-1.amazonaws.com";

  return (
    <>
      <h3 className={"mb-2"}>Bisher generierte Bilder: {count ?? "0"}</h3>
      <InfiniteGalllery data={data} baseUrl={baseUrl} />
    </>
  );
}
