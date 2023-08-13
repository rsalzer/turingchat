"use client";

import Counters from "@/components/Counters";
import GuidedChat from "@/components/GuidedChat";
import React, { useEffect, useState } from "react";

export type ExperimentType = {
  name: string;
  words: string[];
  prompt: string;
  userDecides?: boolean;
  type: "text" | "image";
};

type ExperimentProps = {
  chosenExperiment: ExperimentType;
  initialCount: Record<string, any>;
};

const Experiment = ({ chosenExperiment, initialCount }: ExperimentProps) => {
  console.log(chosenExperiment);
  const [wordsToIncrement, setWordsToIncrement] = useState<string[]>([]);
  const wordsFound = (words: string[]) => {
    console.log("Words found:", words);
    setWordsToIncrement(words);
  };

  useEffect(() => {
    setWordsToIncrement([]);
  }, [chosenExperiment]);

  return (
    <div>
      <h3 className="font-bold text-xl my-3">
        Experiment: {chosenExperiment.name}
      </h3>
      <div className="flex gap-10 md:flex-row flex-col">
        <Counters
          hashName={chosenExperiment.name}
          words={chosenExperiment.words}
          wordsToIncrement={wordsToIncrement}
          initialCount={initialCount}
        />
        <GuidedChat
          wordsToCheck={chosenExperiment.words}
          promptToSet={chosenExperiment.prompt}
          wordsFound={wordsFound}
          userDecides={chosenExperiment.userDecides}
        />
      </div>
    </div>
  );
};

export default Experiment;
