"use client";

import { useEffect, useState } from "react";
import { Message } from "ai";
import { useChat } from "ai/react";
import { UserMessage } from "@/components/UserMessage";
import { OpenAIMessage } from "@/components/OpenAIMessage";
import Button from "@/components/Button";

type ChatProps = {
  wordsToCheck: string[];
  promptToSet: string;
  wordsFound: (words: string[]) => void;
  userDecides?: boolean;
  goToNextExperiment: () => void;
};
const GuidedChat = ({
  wordsToCheck,
  promptToSet,
  wordsFound,
  userDecides = false,
  goToNextExperiment,
}: ChatProps) => {
  const [latestMessage, setLatestMessage] = useState<null | Message>(null);
  const [showOkNotOk, setShowOkNotOk] = useState(false);
  const [showRestartButton, setShowRestartButton] = useState(false);
  const [wordFound, setWordFound] = useState<null | string>(null);
  const onFinish = (message: Message) => {
    console.log("On Finish");
    setLatestMessage(message);
  };

  const { messages, append, setMessages } = useChat({
    onFinish: onFinish,
    headers: {
      type: "nolog",
    },
  });

  useEffect(() => {
    if (latestMessage != null) {
      if (userDecides) {
        setShowOkNotOk(true);
      } else {
        const newMessages = [...messages];
        let contentToReplace = newMessages[newMessages.length - 1].content;
        let foundWords: string[] = [];
        wordsToCheck.forEach((word) => {
          if (contentToReplace.includes(" " + word)) {
            foundWords.push(word);
            contentToReplace = contentToReplace.replaceAll(
              " " + word,
              " <b>" + word + "</b>"
            );
          }
        });
        newMessages[newMessages.length - 1].content = contentToReplace;
        setMessages(newMessages);
        setLatestMessage(null);
        if (foundWords.length > 0) wordsFound(foundWords);
      }
      setShowRestartButton(true);
    }
  }, [latestMessage]);

  const start = () => {
    setMessages([]);
    setShowRestartButton(false);
    setShowOkNotOk(false);
    setWordFound(null);
    append({
      id: "asdkjfköasjdkföadsf",
      content: promptToSet,
      role: "user",
    });
  };

  useEffect(() => {
    start();
  }, [promptToSet]);

  return (
    <div className="flex flex-no-wrap flex-col h-full overflow-y-scroll">
      <div className="min-w-0 max-w-4xl">
        <div className="scrolling-touch scrolling-gpu h-full w-full relative overflow-auto overscroll-y-auto">
          <div className="divide-y">
            {messages.length > 0
              ? messages.map((m) => (
                  <div key={m.id} className="whitespace-pre-wrap">
                    {m.role === "user" ? (
                      <UserMessage message={m.content} />
                    ) : (
                      <OpenAIMessage>
                        <p dangerouslySetInnerHTML={{ __html: m.content }}></p>
                      </OpenAIMessage>
                    )}
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      <div className="">
        <div className="p-3 pr-2.5 bg-grau/70 ">
          {showOkNotOk && (
            <>
              <div className="text-xl flex flex-col m-auto bg-rosa py-2 px-4">
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
                    <div className="">
                      {wordsToCheck.map((word) => (
                        <Button
                          onClick={() => {
                            wordsFound([word]);
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
            </>
          )}
          {showRestartButton && (
            <div className={"px-4 py-4"}>
              <Button
                onClick={() => {
                  start();
                  wordsFound([]);
                }}
              >
                Nochmals generieren
              </Button>
              <Button onClick={goToNextExperiment}>
                Zum nächsten Experiment
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidedChat;
