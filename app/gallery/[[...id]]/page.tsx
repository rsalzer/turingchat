import InfiniteGalllery from "@/components/InfiniteGallery";
import {
  getImagesFromDynamoDB,
  getImagesFromDynamoDBV2,
} from "@/utils/awshandler";
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
  let data: string[] = [];
  if (chosenExperiment || id == "0") {
    if (id == "0") {
      const d1 = await getImagesFromDynamoDBV2("Krankenhaus");
      const data1 = d1
        ? d1.map((element) => element.key.replace("i_", ""))
        : [];
      const d2 = await getImagesFromDynamoDBV2("FreeImage");
      const data2 = d2
        ? d2.map((element) => element.key.replace("i_", ""))
        : [];
      data = [...data2, ...data1];
    } else {
      const d1 = await getImagesFromDynamoDB(chosenExperiment.name);
      const data1 = d1 ? d1.reverse() : [];
      const d2 = await getImagesFromDynamoDBV2(chosenExperiment.name);
      const data2 = d2
        ? d2.map((element) => element.key.replace("i_", ""))
        : [];
      data = [...data2, ...data1];
    }
  }
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
