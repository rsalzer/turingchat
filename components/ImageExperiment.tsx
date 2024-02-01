"use client";

import React, { useEffect, useState } from "react";
import Counters from "@/components/Counters";
import { headingFont, normalFont } from "@/app/fonts";
import Button from "@/components/Button";
import { UserMessage } from "@/components/UserMessage";
import { OpenAIMessage } from "@/components/OpenAIMessage";
import Instruction from "@/components/Instruction";
import experiments from "../public/experiments.json";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIdleTimer } from "react-idle-timer";

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
  const router = useRouter();
  useIdleTimer({
    onIdle: () => {
      router.replace("/");
    },
    timeout: 120_000,
  });

  const [imgUrl, setImgUrl] = useState<string>();
  const [revisedPrompt, setRevisedPrompt] = useState<string>();
  const [showOkNotOk, setShowOkNotOk] = useState(false);
  const [showRestartButton, setShowRestartButton] = useState(false);
  const [wordsToIncrement, setWordsToIncrement] = useState<string[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [wordFound, setWordFound] = useState<null | string>(null);
  const [key, setKey] = useState<string>();
  const [error, setError] = useState<string>();

  const createImage = async (prompt: string) => {
    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `DO NOT ENHANCE THE FOLLOWING PROMPT - DO NOT ADD ANY GENDER OR RACE TO IT - SO I CAN TEST IT: ${prompt}`,
          id: chosenExperiment.id,
        }),
      });
      const responseJSON = await response.json();
      const revisedPrompt = responseJSON[0].revised_prompt;
      const url = responseJSON[0].url;
      setImgUrl(url);
      setRevisedPrompt(revisedPrompt);
      uploadImage(url, chosenExperiment.id).then(() =>
        console.log("Upload completed")
      );
    } catch (e) {
      if (typeof e === "string") {
        setError(e);
      } else if (e instanceof Error) {
        setError(e.message); // works, `e` narrowed to Error
      }
      setShowRestartButton(true);
    }
  };

  const uploadImage = async (url: string, id: number) => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url,
          id: id,
        }),
      });
      const responseJSON = await response.json();
      const newKey = responseJSON.key;
      console.log("newKey", newKey);
      setKey(newKey);
    } catch (e) {
      console.log("Upload failed");
    }
  };

  const classifyImage = async (
    experiment: string,
    key: string,
    value: string
  ) => {
    try {
      const response = await fetch("/api/classifyimage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experiment: experiment,
          key: key,
          value: value,
        }),
      });
      await response.json();
      console.log("Successfully classified");
    } catch (e) {
      console.log("Classification failed");
    }
  };

  useEffect(() => {
    console.log("Use Effect ChosenExperiment");
    setImgUrl(undefined);
    setRevisedPrompt(undefined);
    setError(undefined);
    setKey(undefined);
    createImage(chosenExperiment.prompt);
  }, [chosenExperiment]);

  useEffect(() => {
    if (imgUrl) {
      setShowOkNotOk(true);
      setShowRestartButton(true);
    }
  }, [imgUrl]);

  useEffect(() => {
    if (wordFound && wordFound.length > 0 && key) {
      classifyImage(chosenExperiment.name, key, wordFound);
    }
  }, [wordFound]);

  return (
    <>
      <h3 className={`${headingFont.className} text-2xl mb-3 text-rot`}>
        Experiment: {chosenExperiment.name}
      </h3>
      {showInstructions ? (
        <div className={"max-w-2xl overflow-y-auto"}>
          <Instruction instruction={chosenExperiment.name} />
          <Button onClick={() => setShowInstructions(false)}>Loslegen</Button>
        </div>
      ) : (
        <div className="flex gap-4 md:flex-row flex-col h-full overflow-hidden">
          <div className="relative">
            <Counters
              hashName={chosenExperiment.name}
              words={chosenExperiment.words}
              wordsToIncrement={wordsToIncrement}
              initialCount={initialCount}
            />
          </div>
          <div className="flex-1 max-w-4xl overflow-y-scroll">
            <UserMessage message={chosenExperiment.prompt} />
            <>
              <OpenAIMessage>
                <div className="flex gap-4 flex-col sm:flex-row">
                  <div className="w-full max-w-[400px] aspect-square bg-rosa flex justify-center items-center shrink-0">
                    {imgUrl ? (
                      <>
                        <img
                          src={imgUrl}
                          alt={chosenExperiment.prompt}
                          className={"w-full h-full"}
                        />
                      </>
                    ) : (
                      <div>
                        {error ? (
                          <>
                            Fehler:
                            <br />
                            {error}
                          </>
                        ) : (
                          "Generiere Bild..."
                        )}
                      </div>
                    )}
                  </div>
                  {revisedPrompt &&
                    revisedPrompt != chosenExperiment.prompt && (
                      <div>
                        <div className="text-xs">
                          <i>Revised Prompt</i>: {revisedPrompt}
                        </div>
                        <div
                          className={`${normalFont.className} text-xs bg-white rounded-lg p-2 mt-4`}
                        >
                          Das neuste Bild-Modell von OpenAI heisst DALL·E 3 und
                          erschien im November 2023.
                          <br /> Um Bilder zu verbessern, erweitert es die
                          Prompts selbständig (<i>Enhanced Prompt</i>).
                          <br /> Wir haben es gebeten, dies hier nicht zu tun,
                          damit der Bias stärker zum Vorschein kommt. <br />
                          Manchmal ignoriert Dall·E aber unsere Anweisung
                          störrisch.
                        </div>
                      </div>
                    )}
                </div>
              </OpenAIMessage>
              {imgUrl && showOkNotOk && (
                <div className="text-xl flex flex-col m-auto bg-rosa px-4 py-2">
                  <div className="text-l">
                    Bei diesem Experiment müssen Sie bestimmen, ob das Vorurteil
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
                <div className="px-4 py-4">
                  <Button
                    onClick={() => {
                      setImgUrl(undefined);
                      setRevisedPrompt(undefined);
                      setWordsToIncrement([]);
                      setWordFound(null);
                      setError(undefined);
                      setKey(undefined);
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
    </>
  );
};

export default ImageExperiment;
