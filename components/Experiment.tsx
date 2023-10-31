"use client";

import Counters from "@/components/Counters";
import GuidedChat from "@/components/GuidedChat";
import React, { useEffect, useState } from "react";
import { headingFont } from "@/app/fonts";
import Instruction from "@/components/Instruction";

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
  const [wordsToIncrement, setWordsToIncrement] = useState<string[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);

  const wordsFound = (words: string[]) => {
    console.log("Words found:", words);
    setWordsToIncrement(words);
  };

  useEffect(() => {
    setWordsToIncrement([]);
  }, [chosenExperiment]);

  return (
    <div>
      <h3 className={`${headingFont.className} text-2xl my-3 text-rot`}>
        Experiment: {chosenExperiment.name}
      </h3>
      {showInstructions ? (
        <div className={"max-w-2xl"}>
          <Instruction instruction={chosenExperiment.name} />
          <button
            className="text-blue-600 my-10"
            onClick={() => {
              setShowInstructions(false);
            }}
          >
            Loslegen
          </button>
        </div>
      ) : (
        <>
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
          {/*{wordsToIncrement.length > 0 && !showInstructions && (*/}
          {/*  <button*/}
          {/*    className="text-blue-600 my-10"*/}
          {/*    onClick={() => {*/}
          {/*      setShowInstructions(true);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Instruktion zeigen*/}
          {/*  </button>*/}
          {/*)}*/}
        </>
      )}
    </div>
  );
};

export default Experiment;
