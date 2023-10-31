"use client";

import React, { useEffect, useState } from "react";
import Counters from "@/components/Counters";
import { headingFont } from "@/app/fonts";
import Button from "@/components/Button";
import { UserMessage } from "@/components/UserMessage";
import { OpenAIMessage } from "@/components/OpenAIMessage";
import Instruction from "@/components/Instruction";
import experiments from "../public/experiments.json";

export type ImageExperimentType = {
  id: number;
  name: string;
  words: string[];
  prompt: string;
};

const ImageExperiment = ({
  chosenExperiment,
  initialCount,
}: {
  chosenExperiment: ImageExperimentType;
  initialCount: Record<string, any>;
}) => {
  const [imgUrl, setImgUrl] = useState<string>();
  const [showOkNotOk, setShowOkNotOk] = useState(false);
  const [showRestartButton, setShowRestartButton] = useState(false);
  const [wordsToIncrement, setWordsToIncrement] = useState<string[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [wordFound, setWordFound] = useState<null | string>(null);

  const createImage = async (prompt: string) => {
    const response = await fetch("/api/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const responseJSON = await response.json();
    const url = responseJSON.data[0].url;
    setImgUrl(url);
  };

  useEffect(() => {
    setImgUrl(undefined);
    createImage(chosenExperiment.prompt);
  }, [chosenExperiment]);

  useEffect(() => {
    if (imgUrl) {
      setShowOkNotOk(true);
      setShowRestartButton(true);
    }
  }, [imgUrl]);

  return (
    <div>
      <h3 className={`${headingFont.className} text-2xl my-3 text-rot`}>
        Experiment: {chosenExperiment.name}
      </h3>
      {showInstructions ? (
        <div className={"max-w-2xl"}>
          <Instruction instruction={chosenExperiment.name} />
          <Button onClick={() => setShowInstructions(false)}>Loslegen</Button>
        </div>
      ) : (
        <div className="flex gap-10 md:flex-row flex-col">
          <Counters
            hashName={chosenExperiment.name}
            words={chosenExperiment.words}
            wordsToIncrement={wordsToIncrement}
            initialCount={initialCount}
          />
          <div className="flex-1 max-w-4xl">
            <UserMessage message={chosenExperiment.prompt} />
            {imgUrl ? (
              <>
                {/*<div className="w-[256px] h-[256px] bg-amber-300 flex justify-center items-center">*/}
                {/*  <img src={imgUrl} alt={chosenExperiment.prompt} />*/}
                {/*</div>*/}
                <OpenAIMessage>
                  <img src={imgUrl} alt={chosenExperiment.prompt} />
                </OpenAIMessage>
                {showOkNotOk && (
                  <div className="text-xl flex flex-col m-auto bg-rosa py-4 px-4">
                    <div className="text-l">
                      Bei diesem Experiment müssen Sie bestimmen, ob der Bias
                      vorhanden ist.
                    </div>
                    {wordFound != null ? (
                      <>
                        <div>
                          Sie haben sich entschieden für:
                          <br />
                          <span className={"text-rot"}>{wordFound}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>Entscheiden Sie: </div>
                        <div className="flex gap-3">
                          {chosenExperiment.words.map((word) => (
                            <Button
                              onClick={() => {
                                setWordsToIncrement([word]);
                                setWordFound(word);
                              }}
                              key={word}
                            >
                              {word}
                            </Button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
                {showRestartButton && (
                  <div className="px-4">
                    <Button
                      onClick={() => {
                        setImgUrl(undefined);
                        setWordsToIncrement([]);
                        setWordFound(null);
                        createImage(chosenExperiment.prompt);
                      }}
                    >
                      Erneut generieren
                    </Button>
                    {chosenExperiment.id + 1 < experiments.length && (
                      <Button
                        onClick={() => {
                          const newLocation = chosenExperiment.id + 1;
                          console.log(newLocation);
                          window.location.href = "/experiment/" + newLocation;
                        }}
                      >
                        Zum nächsten Experiment
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <OpenAIMessage>
                <div className="w-[256px] h-[256px] bg-rosa flex justify-center items-center">
                  Generiere Bild...
                </div>
              </OpenAIMessage>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageExperiment;
