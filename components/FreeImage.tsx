"use client";

import React, { useState } from "react";
import { boldFont, headingFont, normalFont } from "@/app/fonts";
import { UserMessage } from "@/components/UserMessage";
import { OpenAIMessage } from "@/components/OpenAIMessage";
import { useIdleTimer } from "react-idle-timer";
import { useRouter } from "next/navigation";

const FreeImage = () => {
  // const router = useRouter();
  // useIdleTimer({
  //   onIdle: () => {
  //     router.replace("/");
  //   },
  //   timeout: 60_000,
  // });

  const [imgUrl, setImgUrl] = useState<string>();
  const [revisedPrompt, setRevisedPrompt] = useState<string>();
  const [prompt, setPrompt] = useState<string>("");
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [error, setError] = useState<string>();

  const createImage = async (theprompt: string) => {
    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: theprompt,
          id: 0,
        }),
      });
      const responseJSON = await response.json();
      const revised = responseJSON[0].revised_prompt;
      const url = responseJSON[0].url;
      setImgUrl(url);
      setRevisedPrompt(revised);
      uploadImage(url, 0, prompt, revised).then(() =>
        console.log("Upload completed")
      );
    } catch (e) {
      if (typeof e === "string") {
        setError(e);
      } else if (e instanceof Error) {
        setError(e.message); // works, `e` narrowed to Error
      }
    }
  };

  const uploadImage = async (
    url: string,
    id: number,
    prompt?: string,
    revisedPrompt?: string
  ) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url,
          id: id,
          prompt: prompt,
          revisedPrompt: revisedPrompt,
        }),
      });
    } catch (e) {
      console.log("Upload failed");
    }
  };

  return (
    <div className="max-w-2xl">
      <h3 className={`${headingFont.className} text-2xl my-3 text-rot`}>
        Freies Bild
      </h3>
      <div className="relative">
        {imagePrompt && <UserMessage message={imagePrompt} />}
        <OpenAIMessage>
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="w-full max-w-[400px] aspect-square bg-rosa flex justify-center items-center shrink-0">
              {imgUrl ? (
                imgUrl === "generating" ? (
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
                ) : (
                  <img src={imgUrl} alt={prompt} />
                )
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
            {revisedPrompt && revisedPrompt != imagePrompt && (
              <div>
                <div className="text-xs">
                  <i>Revised Prompt</i>: {revisedPrompt}
                </div>
                <div
                  className={`${normalFont.className} text-xs bg-white rounded-lg p-2 mt-4`}
                >
                  Das neuste Bild-Modell von OpenAI heisst DALL·E 3 und erschien
                  im November 2023.
                  <br /> Um Bilder zu verbessern, erweitert es selbständig die
                  Prompts (<i>Enhanced Prompt</i>).
                  <br /> Wir haben es gebeten, dies hier nicht zu tun, damit der
                  Bias stärker zum Vorschein kommt. <br />
                  Manchmal ignoriert Dall·E aber unsere Anweisung störrisch.
                </div>
              </div>
            )}
          </div>
        </OpenAIMessage>
      </div>
      <div className="p-3 pr-2.5 bg-white/70 backdrop-blur shadow-[0_-1px_rgba(229,231,235,.53),0_5px_20px_-5px_rgba(0,0,0,.24)]">
        <form
          className="relative flex items-center max-w-2xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            setImgUrl("generating");
            createImage(prompt);
            setError(undefined);
            setImagePrompt(prompt);
            setPrompt("");
            setRevisedPrompt(undefined);
          }}
          onKeyUp={(e) => {
            if (e.key === "ArrowUp" && imagePrompt) {
              setPrompt(imagePrompt);
            }
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
              data-projection-id="11"
              className={`${boldFont.className} m-2 ml-0 whitespace-nowrap text-sm group inline-flex justify-center gap-2 items-center bg-black text-white rounded-md shadow-md hover:bg-rot py-1.5 transition-colors px-3 disabled:bg-white disabled:border-zinc-200 select-none active:bg-rosa active:text-black`}
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
