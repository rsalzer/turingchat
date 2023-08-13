import ImageExperiment from "@/components/ImageExperiment";
import React from "react";
import { Redis } from "@upstash/redis";
import experiments from "@/public/experiments.json";
import { ExperimentType } from "@/components/Experiment";

const redis = Redis.fromEnv();

export default async function ImagePage({
  params,
}: {
  params: { id: number };
}) {
  // const experiments = await redis.json.get("experiments", "$");
  const chosenExperiment = experiments[params.id] as ExperimentType;
  let initialCount = await redis.hgetall(chosenExperiment.name);
  if (initialCount == null) initialCount = [] as Record<string, any>;

  return (
    <div>
      <ImageExperiment
        chosenExperiment={chosenExperiment}
        initialCount={initialCount}
      />
    </div>
  );
}
