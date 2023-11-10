"use client";

import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { UserMessage } from "@/components/UserMessage";
import { OpenAIMessage } from "@/components/OpenAIMessage";
import { boldFont } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { useIdleTimer } from "react-idle-timer";

const FreeChat = () => {
  const router = useRouter();
  useIdleTimer({
    onIdle: () => {
      router.replace("/");
    },
    timeout: 60_000,
  });

  const { messages, handleInputChange, setInput, handleSubmit, input } =
    useChat({
      headers: {
        type: "nolog",
      },
    });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="overflow-hidden flex flex-1 flex-col basis-1 max-w-2xl">
      <div
        className="flex flex-1 flex-no-wrap flex-col overflow-y-scroll"
        ref={scrollRef}
      >
        <div className="min-w-0 flex-1">
          <div className="scrolling-touch scrolling-gpu h-full w-full relative overflow-auto pb-12 overscroll-y-auto">
            <div className="divide-y">
              {messages.length > 0
                ? messages.map((m) => (
                    <div key={m.id} className="whitespace-pre-wrap">
                      {m.role === "user" ? (
                        <UserMessage message={m.content} />
                      ) : (
                        <OpenAIMessage>{m.content}</OpenAIMessage>
                      )}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 min-h-0 min-w-100">
        <div className="p-3 pr-2.5 bg-white/70 backdrop-blur shadow-[0_-1px_rgba(229,231,235,.53),0_5px_20px_-5px_rgba(0,0,0,.24)]">
          <form
            className="relative flex items-center max-w-2xl mx-auto"
            onSubmit={handleSubmit}
            onKeyUp={(e) => {
              if (e.key === "ArrowUp" && messages.length > 0) {
                setInput(messages[messages.length - 2].content);
              }
            }}
          >
            <input
              type="text"
              className="rounded-md flex-1 sm:text-sm text-base bg-zinc-200/50 border border-zinc-200/80 resize-none scroll-m-2 transition-colors focus:border-zinc-400 focus:ring-0 focus:outline-none p-6 pr-24"
              spellCheck="false"
              value={input}
              placeholder="Tippe hier... (dann Senden klicken oder Enter drücken)"
              onChange={handleInputChange}
            ></input>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex gap-1 @sm:gap-2 items-center justify-end">
              <button
                type="submit"
                data-projection-id="11"
                className={`${boldFont.className} m-2 ml-0 whitespace-nowrap text-sm group inline-flex justify-center gap-2 items-center bg-black text-white rounded-md shadow-md hover:bg-rot py-1.5 transition-colors px-3 disabled:bg-white disabled:border-zinc-200 select-none active:bg-rosa active:text-black`}
              >
                Senden
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreeChat;
