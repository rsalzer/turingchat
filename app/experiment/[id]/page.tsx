import React from "react";
import { Redis } from "@upstash/redis";
import Experiment from "@/components/Experiment";
import experiments from "../../../public/experiments.json";

const redis = Redis.fromEnv();

export const revalidate = 0;

export default async function ExperimentPage({
  params,
}: {
  params: { id: number };
}) {
  // const experiments = await redis.json.get("experiments", "$");
  const chosenExperiment = experiments[params.id]; // experiments[0][params.id];
  if (!chosenExperiment) return <div>Experiment not found</div>;
  let initialCount = await redis.hgetall(chosenExperiment.name);
  if (initialCount == null) initialCount = [] as Record<string, any>;

  return (
    <div>
      <Experiment
        chosenExperiment={chosenExperiment}
        initialCount={initialCount}
      />
    </div>
  );
}
