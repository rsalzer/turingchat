"use client";

import { boldFont, headingFont, normalFont } from "@/app/fonts";
import { useIdleTimer } from "react-idle-timer";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();
  useIdleTimer({
    onIdle: () => {
      router.replace("/");
    },
    timeout: 120_000,
  });

  return (
    <div className={`${normalFont.className} text-m max-w-2xl`}>
      <h2 className={`${headingFont.className} text-2xl mb-3 text-rot`}>
        Impressum
      </h2>
      <div className="grid grid-cols-2 max-w-lg gap-2">
        <b className={`${boldFont.className} `}>Idee und Umsetzung:</b>{" "}
        <span>TuringAgency (www.turingagency.org)</span>
        <b className={`${boldFont.className} `}>Texte:</b>
        <span>Roland Fischer</span>
        <b className={`${boldFont.className} `}>Programmierung:</b>
        <span>Robert Salzer</span>
        <b className={`${boldFont.className} `}>Ausstellungdesign:</b>
        <span>Bellprat Partner</span>
        <b />
        <span />
        <b />
        <span />
        <b className={`${boldFont.className} `}>Benutzte Modelle:</b>
        <span>ChatGPT (Texte), DALL·E 3 (Bilder) by OpenAI</span>
      </div>
    </div>
  );
}
