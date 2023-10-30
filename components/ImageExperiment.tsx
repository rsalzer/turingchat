"use client";

import React, { useEffect, useState } from "react";
import Counters from "@/components/Counters";
import { headingFont } from "@/app/fonts";

export type ImageExperimentType = {
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
  const [wordsToIncrement, setWordsToIncrement] = useState<string[]>([]);

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
    }
  }, [imgUrl]);

  return (
    <div>
      <h3 className={`${headingFont.className} text-2xl my-3 text-rot`}>
        Experiment: {chosenExperiment.name}
      </h3>
      <div className="flex gap-10 md:flex-row flex-col">
        <Counters
          hashName={chosenExperiment.name}
          words={chosenExperiment.words}
          wordsToIncrement={wordsToIncrement}
          initialCount={initialCount}
        />
        <div>
          <h3>Prompt: {chosenExperiment.prompt}</h3>
          {imgUrl ? (
            <div>
              <div className="w-[256px] h-[256px] bg-amber-300 flex justify-center items-center">
                <img src={imgUrl} alt={chosenExperiment.prompt} />
              </div>
              {showOkNotOk ? (
                <div className="text-xl w-max flex flex-col items-center m-auto">
                  <div className="font-bold">Entscheiden Sie: </div>
                  <div className="flex gap-3">
                    {chosenExperiment.words.map((word) => (
                      <button
                        className="text-blue-600"
                        onClick={() => {
                          setWordsToIncrement([word]);
                          setShowOkNotOk(false);
                        }}
                        key={word}
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setImgUrl(undefined);
                    setWordsToIncrement([]);
                    createImage(chosenExperiment.prompt);
                  }}
                >
                  Restart
                </button>
              )}
            </div>
          ) : (
            <div className="w-[256px] h-[256px] bg-rosa flex justify-center items-center">
              Generiere Bild...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageExperiment;
