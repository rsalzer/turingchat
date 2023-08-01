"use client";

import { useEffect, useState } from "react";
import { Message } from "ai";
import { useChat } from "ai/react";
import { UserMessage } from "@/components/UserMessage";
import { OpenAIMessage } from "@/components/OpenAIMessage";

type ChatProps = {
  wordsToCheck: string[];
  promptToSet: string;
  wordsFound: (words: string[]) => void;
  userDecides?: boolean;
};
const GuidedChat = ({
  wordsToCheck,
  promptToSet,
  wordsFound,
  userDecides = false,
}: ChatProps) => {
  const [latestMessage, setLatestMessage] = useState<null | Message>(null);
  const [showOkNotOk, setShowOkNotOk] = useState(false);
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
    }
  }, [latestMessage]);

  const start = () => {
    setMessages([]);
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
    <div className="overflow-hidden">
      <div className="flex flex-no-wrap flex-col h-full overflow-y-auto">
        <div className="min-w-0 flex-1">
          <div className="scrolling-touch scrolling-gpu h-full w-full relative overflow-auto pb-12 overscroll-y-auto">
            <div className="divide-y">
              {messages.length > 0
                ? messages.map((m) => (
                    <div key={m.id} className="whitespace-pre-wrap">
                      {m.role === "user" ? (
                        <UserMessage message={m.content} />
                      ) : (
                        <OpenAIMessage message={m.content} />
                      )}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 min-h-0 min-w-100 sticky bottom-0">
          <div className="p-3 pr-2.5 bg-white/70 backdrop-blur shadow-[0_-1px_rgba(229,231,235,.53),0_5px_20px_-5px_rgba(0,0,0,.24)]">
            {showOkNotOk && (
              <div className="text-xl w-max flex flex-col items-center m-auto">
                <div className="font-bold">Entscheiden Sie: </div>
                <div className="flex gap-3">
                  {wordsToCheck.map((word) => (
                    <button
                      className="text-blue-600"
                      onClick={() => {
                        wordsFound([word]);
                        setShowOkNotOk(false);
                      }}
                      key={word}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button
              className="text-blue-600 my-10"
              onClick={() => {
                start();
                wordsFound([]);
              }}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedChat;
