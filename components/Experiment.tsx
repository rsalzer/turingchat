"use client";

import Counters from "@/components/Counters";
import GuidedChat from "@/components/GuidedChat";
import React, { useEffect, useState } from "react";
import { headingFont } from "@/app/fonts";
import Instruction from "@/components/Instruction";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export type ExperimentType = {
  id: number;
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
  const router = useRouter();
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
    <>
      <h3 className={`${headingFont.className} text-2xl mb-3 text-rot`}>
        Experiment: {chosenExperiment.name}
      </h3>
      {showInstructions ? (
        <div className={"max-w-2xl"}>
          <Instruction instruction={chosenExperiment.name} />
          <Button onClick={() => setShowInstructions(false)}>Loslegen</Button>
        </div>
      ) : (
        <>
          <div className="flex gap-4 md:flex-row flex-col h-full overflow-hidden">
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
              goToNextExperiment={() => {
                const newLocation = chosenExperiment.id + 1;
                router.push("/experiment/" + newLocation);
              }}
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
    </>
  );
};

export default Experiment;
