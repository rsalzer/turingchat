"use client";

import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { UserMessage } from "@/components/UserMessage";
import { OpenAIMessage } from "@/components/OpenAIMessage";

const FreeChat = () => {
  const { messages, handleInputChange, handleSubmit, input } = useChat({
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
    <div className="overflow-hidden flex flex-col h-full">
      <div
        className="flex flex-no-wrap flex-col h-full overflow-y-auto"
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
                        <OpenAIMessage message={m.content} />
                      )}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 min-h-0 min-w-100 sticky bottom-0">
        <div className="p-3 pr-2.5 bg-white/70 backdrop-blur shadow-[0_-1px_rgba(229,231,235,.53),0_5px_20px_-5px_rgba(0,0,0,.24)]">
          <form
            className="relative flex items-center max-w-2xl mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="rounded-md flex-1 sm:text-sm text-base bg-zinc-200/50 border border-zinc-200/80 resize-none scroll-m-2 transition-colors focus:border-zinc-400 focus:ring-0 focus:outline-none p-6 pr-24"
              spellCheck="false"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            ></input>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex gap-1 @sm:gap-2 items-center justify-end">
              <button
                type="submit"
                className="whitespace-nowrap font-medium group inline-flex justify-center gap-2 items-center bg-zinc-900 hover:bg-zinc-800 text-zinc-100 rounded-md shadow-md text-sm hover:text-zinc-300 py-1.5 transition-colors px-3 border border-zinc-700 disabled:bg-white disabled:border-zinc-200 disabled:text-zinc-400 disabled:shadow-none disabled:hover:text-zinc-400 disabled:cursor-not-allowed select-none"
                data-projection-id="11"
                style={{ width: "70px" }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreeChat;
