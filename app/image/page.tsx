import ImageExperiment, {
  ImageExperimentType,
} from "@/components/ImageExperiment";
import React from "react";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function ImagePage() {
  const chosenExperiment: ImageExperimentType = {
    name: "Familie bei Dall-E",
    prompt: "A picture of a family",
    words: ["Hautfarbe weiss", "Hauptfarbe nicht weiss"],
  };
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
