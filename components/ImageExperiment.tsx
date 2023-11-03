"use client";

import React, { useEffect, useState } from "react";
import Counters from "@/components/Counters";
import { headingFont } from "@/app/fonts";
import Button from "@/components/Button";
import { UserMessage } from "@/components/UserMessage";
import { OpenAIMessage } from "@/components/OpenAIMessage";
import Instruction from "@/components/Instruction";
import experiments from "../public/experiments.json";
import Link from "next/link";

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
      <h3 className={`${headingFont.className} text-2xl mb-3 text-rot`}>
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
            <>
              <OpenAIMessage>
                <div className="w-[256px] h-[256px] bg-rosa flex justify-center items-center">
                  {imgUrl ? (
                    <img src={imgUrl} alt={chosenExperiment.prompt} />
                  ) : (
                    <div>Generiere Bild...</div>
                  )}
                </div>
              </OpenAIMessage>
              {imgUrl && showOkNotOk && (
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
              {imgUrl && showRestartButton && (
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
                    <Button onClick={() => {}}>
                      <Link href={`/experiment/${chosenExperiment.id + 1}`}>
                        Zum nächsten Experiment
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageExperiment;
