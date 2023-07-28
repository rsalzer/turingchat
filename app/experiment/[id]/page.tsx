import React from "react";
import experiments from "../../../public/experiments.json";
import { Redis } from "@upstash/redis";
import Experiment from "@/app/experiment/[id]/Experiment";

const redis = Redis.fromEnv();

// async function increment(words: string[]) {
//   "use server";
//
//   for (const word of words) {
//     await redis.hincrby(chosenExperiment.name, word, 1);
//   }
//
//   revalidatePath("/");
// }
export default async function ExperimentPage({
  params,
}: {
  params: { id: number };
}) {
  const chosenExperiment = experiments[params.id];
  if (!chosenExperiment) return <div>Experiment not found</div>;
  const initialCount = await redis.hgetall(chosenExperiment.name);

  return (
    <div>
      {initialCount != null && (
        <Experiment
          chosenExperiment={chosenExperiment}
          initialCount={initialCount}
        />
      )}
    </div>
  );
}
