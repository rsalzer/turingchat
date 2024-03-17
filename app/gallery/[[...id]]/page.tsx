import InfiniteGalllery, { Gallery } from "@/components/InfiniteGallery";
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
  let data: Gallery[] = [];
  let count1: number = 0;
  let count2: number = 0;
  let wordcount1: number = 0;
  let wordcount2: number = 0;
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
      if (d2 && d1) data = [...(d2 as Gallery[]), ...(d1 as Gallery[])];
    } else {
      const d1 = await getImagesFromDynamoDB(chosenExperiment.name);
      const data1 = d1
        ? d1.reverse().map((element: string) => {
            return {
              key: element,
            };
          })
        : [];
      const d2 = await getImagesFromDynamoDBV2(chosenExperiment.name);
      // const data2 = d2
      //   ? d2.map((element) => element.key.replace("i_", ""))
      //   : [];
      if (d2 && data1) {
        data = [...(d2 as Gallery[]), ...(data1 as Gallery[])];
        wordcount1 = d2.reduce(
          (previousValue, currentValue) =>
            currentValue.value.startsWith(chosenExperiment.words[0])
              ? previousValue + 1
              : previousValue,
          0
        );
        wordcount2 = d2.reduce(
          (previousValue, currentValue) =>
            currentValue.value.startsWith(chosenExperiment.words[1])
              ? previousValue + 1
              : previousValue,
          0
        );
      }
      count1 = d1.length;
      count2 = d2 ? d2.length : 0;
    }
  }
  const count = data.length;

  const baseUrl =
    "https://turingagency-biastester.s3.eu-central-1.amazonaws.com";

  return (
    <>
      <h3 className={"mb-2"}>
        Bisher generierte Bilder: {count ?? "0"}{" "}
        <span className="float-right text-xs">
          {`(o: ${count1} / n: ${count2})`}
          {` (1: ${wordcount1} / 2: ${wordcount2} / no: ${
            count2 - wordcount1 - wordcount2
          })`}
        </span>
      </h3>
      <InfiniteGalllery
        data={data}
        baseUrl={baseUrl}
        experiment={chosenExperiment}
        showAdmin={false}
      />
    </>
  );
}
