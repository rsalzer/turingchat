import InfiniteGalllery, { Gallery } from "@/components/InfiniteGallery";
import {
  getImagesFromDynamoDB,
  getImagesFromDynamoDBV2,
} from "@/utils/awshandler";
import experiments from "@/public/experiments.json";
import { ExperimentType } from "@/components/Experiment";
import Link from "next/link";

export default async function GalleryPage({
  params = { id: ["6", "all"] },
}: {
  params: { id: string[] };
}) {
  let { id } = params;
  if (!id) id = ["6", "0"];
  let name, navigation;
  let data: Gallery[] = [];
  let chosenExperiment;
  if (id[0] === "0") {
    navigation = <></>;
    const d1 = await getImagesFromDynamoDBV2("FreeImage");
    if (d1) {
      data.push(...(d1 as Gallery[]));
    }
    const d2 = await getImagesFromDynamoDBV2("Krankenhaus");
    if (d2) data.push(...(d2 as Gallery[]));
  } else {
    const experimentNr = parseInt(id[0]) || 6;
    const filter = parseInt(id[1]) || 0;
    chosenExperiment = experiments[experimentNr] as ExperimentType; // experiments[0][params.id];
    name = chosenExperiment.name;
    if (filter === 0) {
      const d1 = await getImagesFromDynamoDBV2(chosenExperiment.name);
      const data1: string[] = d1
        ? d1.map((element) => element.key.replace("i_", ""))
        : [];
      if (d1) data.push(...(d1 as Gallery[]));
    } else if (filter < 3) {
      const word = chosenExperiment.words[filter - 1];
      const d1 = await getImagesFromDynamoDBV2(chosenExperiment.name, word);
      const data1: string[] = d1
        ? d1.map((element) => element.key.replace("i_", ""))
        : [];
      if (d1) data.push(...(d1 as Gallery[]));
    }
    navigation = (
      <div className="flex items-center gap-3 my-2">
        <Link
          className={`text-black hover:text-rot font-medium text-sm ${
            !filter && "bg-rosa"
          }`}
          href={"/gallery_v2/" + experimentNr + "/" + 0}
          prefetch={false}
        >
          Alle
        </Link>
        {chosenExperiment.words.map((word, index) => (
          <Link
            className={`text-black hover:text-rot font-medium text-sm ${
              index == filter - 1 && "bg-rosa"
            }`}
            href={"/gallery_v2/" + experimentNr + "/" + (index + 1)}
            key={index}
            prefetch={false}
          >
            {word}
          </Link>
        ))}
      </div>
    );
  }
  // const data1 = d1.reverse();
  // const d2 = await getImagesFromDynamoDBV2(chosenExperiment.name);
  // const data2 = d2 ? d2.map((element) => element.key.replace("i_", "")) : [];
  // const data = [...data2, ...data1];
  const count = data.length;

  const baseUrl =
    "https://turingagency-biastester.s3.eu-central-1.amazonaws.com";

  return (
    <>
      {navigation}
      <h3 className={"mb-2"}>Bisher generierte Bilder: {count ?? "0"}</h3>
      <InfiniteGalllery
        data={data}
        baseUrl={baseUrl}
        experiment={chosenExperiment}
        showAdmin={true}
      />
    </>
  );
}
