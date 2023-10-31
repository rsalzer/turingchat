import React from "react";
import { Redis } from "@upstash/redis";
import Experiment, { ExperimentType } from "@/components/Experiment";
import experiments from "../../../public/experiments.json";
import ImageExperiment from "@/components/ImageExperiment";

const redis = Redis.fromEnv();

export const revalidate = 0;

export default async function ExperimentPage({
  params,
}: {
  params: { id: string };
}) {
  // const experiments = await redis.json.get("experiments", "$");
  const chosenExperiment = experiments[parseInt(params.id)] as ExperimentType; // experiments[0][params.id];
  chosenExperiment.id = parseInt(params.id);
  if (!chosenExperiment) return <div>Experiment not found</div>;
  let initialCount = await redis.hgetall(chosenExperiment.name);
  if (initialCount == null) initialCount = [] as Record<string, any>;

  return (
    <div>
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
