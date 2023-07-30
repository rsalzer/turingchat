"use client";

import { useEffect, useState } from "react";
import { Message } from "ai";
import { useChat } from "ai/react";

type MessageProps = {
  message: string;
};

type ChatProps = {
  wordsToCheck: string[];
  promptToSet: string;
  wordsFound: (words: string[]) => void;
  userDecides?: boolean;
};
const Chat = ({
  wordsToCheck,
  promptToSet,
  wordsFound,
  userDecides = false,
}: ChatProps) => {
  const [latestMessage, setLatestMessage] = useState<null | Message>(null);
  const [showOkNotOk, setShowOkNotOk] = useState(false);

  const onFinish = (message: Message) => {
    setLatestMessage(message);
  };

  const { messages, append, setMessages } = useChat({
    onFinish: onFinish,
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
            {/*  <form*/}
            {/*    className="relative flex items-center max-w-2xl mx-auto"*/}
            {/*    onSubmit={handleSubmit}*/}
            {/*  >*/}
            {/*    <input*/}
            {/*      type="text"*/}
            {/*      className="rounded-md flex-1 sm:text-sm text-base bg-zinc-200/50 border border-zinc-200/80 resize-none scroll-m-2 h-[38px] transition-colors focus:border-zinc-400 focus:ring-0 focus:outline-none pb-12 __className_1822b0"*/}
            {/*      spellCheck="false"*/}
            {/*      value={input}*/}
            {/*      placeholder="Say something..."*/}
            {/*      onChange={handleInputChange}*/}
            {/*      style={{ height: "82px !important" }}*/}
            {/*    ></input>*/}
            {/*    <div className="absolute right-2 bottom-2 inline-flex gap-1 @sm:gap-2 items-center justify-end">*/}
            {/*      <button*/}
            {/*        type="submit"*/}
            {/*        className="whitespace-nowrap font-medium group inline-flex justify-center gap-2 items-center bg-zinc-900 hover:bg-zinc-800 text-zinc-100 rounded-md shadow-md text-sm hover:text-zinc-300 py-1.5 transition-colors px-3 border border-zinc-700 disabled:bg-white disabled:border-zinc-200 disabled:text-zinc-400 disabled:shadow-none disabled:hover:text-zinc-400 disabled:cursor-not-allowed select-none"*/}
            {/*        data-projection-id="11"*/}
            {/*        style={{ width: "70px" }}*/}
            {/*      >*/}
            {/*        Send*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  </form>*/}
          </div>
        </div>
      </div>
    </div>
  );
};
const OpenAIMessage = ({ message }: MessageProps) => {
  return (
    <div className="px-3 @md:py-4 py-2.5 group transition-opacity message">
      <div className="flex items-start max-w-2xl mx-auto space-x-3">
        <div className="w-6 h-6 flex flex-shrink-0 justify-center items-center mt-[2px]">
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path>
          </svg>
        </div>
        <div className="w-full min-w-0 text-sm sm:text-base">
          <div className="prose prose-stone prose-sm sm:prose-base prose-pre:rounded-md prose-p:whitespace-pre-wrap prose-p:break-words w-full flex-1 leading-6 prose-p:leading-7 prose-pre:bg-[#282c34] max-w-full __className_1822b0">
            <p dangerouslySetInnerHTML={{ __html: message }}></p>
          </div>
        </div>
      </div>
    </div>
  );
};
const UserMessage = ({ message }: MessageProps) => {
  return (
    <div className="px-3 @md:py-4 py-2.5 group transition-opacity message bg-zinc-100">
      <div className="flex items-start max-w-2xl mx-auto space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="w-6 h-6 flex-shrink-0 mt-[2px]"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div className="w-full min-w-0 text-sm sm:text-base">
          <div className="prose prose-stone prose-sm sm:prose-base prose-pre:rounded-md prose-p:whitespace-pre-wrap prose-p:break-words w-full flex-1 leading-6 prose-p:leading-7 prose-pre:bg-[#282c34] max-w-full __className_1822b0">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
