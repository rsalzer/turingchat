import React from "react";
import Experiment, { ExperimentType } from "@/components/Experiment";
import experiments from "../../../public/experiments.json";
import ImageExperiment from "@/components/ImageExperiment";
import { getCountFromDynamoDB } from "@/utils/awshandler";

export const revalidate = 0;

export default async function ExperimentPage({
  params,
}: {
  params: { id: string };
}) {
  const chosenExperiment = experiments[parseInt(params.id)] as ExperimentType; // experiments[0][params.id];
  chosenExperiment.id = parseInt(params.id);
  if (!chosenExperiment) return <div>Experiment not found</div>;
  const data: any = await getCountFromDynamoDB(chosenExperiment.name);
  let initialCount = data.count;
  if (initialCount == null) initialCount = [] as Record<string, any>;

  return (
    <div className="w-full h-full flex flex-col overflow-y-hidden">
      {chosenExperiment.type === "text" ? (
        <Experiment
          chosenExperiment={chosenExperiment}
          initialCount={initialCount}
        />
      ) : (
        <ImageExperiment
          chosenExperiment={chosenExperiment}
          initialCount={initialCount}
        />
      )}
    </div>
  );
}
