"use client";

import React, { useState } from "react";
import { headingFont } from "@/app/fonts";

const FreeImage = () => {
  const [imgUrl, setImgUrl] = useState<string>();
  const [prompt, setPrompt] = useState<string>("");
  const [imagePrompt, setImagePrompt] = useState<string>("");

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

  return (
    <div className="max-w-2xl">
      <h3 className={`${headingFont.className} text-2xl my-3 text-rot`}>
        Freies Bild
      </h3>
      <div>
        <h3>Prompt: {imagePrompt}</h3>
        <div className="w-[256px] h-[256px] bg-rosa flex justify-center items-center">
          {imgUrl ? (
            imgUrl === "generating" ? (
              <span>Generiere...</span>
            ) : (
              <img src={imgUrl} alt={prompt} />
            )
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
      </div>
      <div className="p-3 pr-2.5 bg-white/70 backdrop-blur shadow-[0_-1px_rgba(229,231,235,.53),0_5px_20px_-5px_rgba(0,0,0,.24)]">
        <form
          className="relative flex items-center max-w-2xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            setImgUrl("generating");
            createImage(prompt);
            setImagePrompt(prompt);
            setPrompt("");
          }}
        >
          <input
            type="text"
            className="rounded-md flex-1 sm:text-sm text-base bg-zinc-200/50 border border-zinc-200/80 resize-none scroll-m-2 transition-colors focus:border-zinc-400 focus:ring-0 focus:outline-none p-6 pr-24"
            spellCheck="false"
            value={prompt}
            placeholder="Tippe hier... (dann Senden klicken oder Enter drücken)"
            onChange={(e) => setPrompt(e.target.value)}
          ></input>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex gap-1 @sm:gap-2 items-center justify-end">
            <button
              type="submit"
              className="whitespace-nowrap font-medium group inline-flex justify-center gap-2 items-center bg-zinc-900 hover:bg-zinc-800 text-zinc-100 rounded-md shadow-md text-sm hover:text-zinc-300 py-1.5 transition-colors px-3 border border-zinc-700 disabled:bg-white disabled:border-zinc-200 disabled:text-zinc-400 disabled:shadow-none disabled:hover:text-zinc-400 disabled:cursor-not-allowed select-none"
              data-projection-id="11"
              style={{ width: "70px" }}
            >
              Senden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreeImage;
