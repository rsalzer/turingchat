import InfiniteGalllery from "@/components/InfiniteGallery";
import { getImagesFromDynamoDB } from "@/utils/awshandler";
import experiments from "@/public/experiments.json";
import { ExperimentType } from "@/components/Experiment";

export default async function GalleryPage({
  params = { id: "6" },
}: {
  params: { id: string };
}) {
  let { id } = params;
  if (!id) id = "6";
  const chosenExperiment = experiments[parseInt(id)] as ExperimentType; // experiments[0][params.id];
  const d = await getImagesFromDynamoDB(chosenExperiment.name);
  const data = d.reverse();
  const count = data.length;

  const baseUrl =
    "https://turingagency-biastester.s3.eu-central-1.amazonaws.com";

  return (
    <>
      <h3 className={"mb-2"}>Bisher generierte Bilder: {count ?? "0"}</h3>
      <InfiniteGalllery data={data} baseUrl={baseUrl} />
    </>
  );
}
