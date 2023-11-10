"use client";

import { boldFont, headingFont, normalFont } from "@/app/fonts";
import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useSearchParams } from "next/navigation";

export default function MainPage() {
  const [showOverlayScreen, setShowOverlayScreen] = useState(true);
  const searchParams = useSearchParams();

  const overlaySearchParam = searchParams.get("overlay");

  useIdleTimer({
    onIdle: () => {
      setShowOverlayScreen(true);
    },
    timeout: 90_000,
  });

  return (
    <div className={`${normalFont.className} text-m max-w-2xl`}>
      <h2 className={`${headingFont.className} text-2xl my-1 text-rot`}>
        Willkommen zum Vorurteile-Tester.
      </h2>
      <h3 className={`${headingFont.className} text-2xl my-1`}>KI hat Bias</h3>
      <p>
        In den aktuellen KI-Modellen stecken nicht nur riesige Mengen an Daten,
        in ihnen stecken auch unsere eigenen Vorurteile und unsere
        diskriminierenden Strukturen. Man könnte auch sagen: die KI hat die
        Machtverhältnisse der – westlichen – Gesellschaft souverän übernommen,
        sie hat sie gelernt. Und reproduziert sie nun dementsprechend.
      </p>
      <h3 className={`${headingFont.className} text-2xl my-1`}>
        Hier können Sie den Bias testen
      </h3>
      <p>
        Wir haben eine Teststation gebaut, mit der Sie die diskriminierenden
        Abgründe, die «Dark Corners» von GPT und Konsorten erkunden können. Um
        den Einstieg ins Testen zu erleichtern, schlagen wir ein paar
        entlarvende Prompts vor, die Sie einfach anklicken können. Probieren Sie
        selber aus, ob Sie damit sexistische oder rassistische Texte und Bilder
        provozieren können. Sie dürfen auch selber kreativ werden! Vielleicht
        kommen Ihnen weitere Szenerien in den Sinn, um dunkle Ecken in den
        Sprach- und Bildmodellen auszuleuchten.
      </p>
      <p className={"my-1"}>
        <b className={`${boldFont.className}`}>
          Wählen Sie links ein Experiment aus oder springen Sie direkt zum
          ersten Experiment.
        </b>
      </p>
      <Button onClick={() => {}}>
        <Link href={`/experiment/0`}>Direkt zum ersten Experiment</Link>
      </Button>

      <div
        id="menu"
        className={`fixed top-0 left-0 z-90 w-full h-full flex flex-col justify-center items-center bg-rosa duration-700 gap-4 transition-opacity opacity-0 pointer-events-none ${
          showOverlayScreen && !overlaySearchParam
            ? "xl:opacity-100 pointer-events-auto"
            : "xl:opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`${headingFont.className} flex flex-col text-rot text-center text-4xl font-light space-y-3`}
        >
          KÜNSTLICHE INTELLIGENZ UND IHRE VORURTEILE
        </div>
        <Button onClick={() => setShowOverlayScreen(false)}>
          Zum Starten, berühren Sie den Bildschirm hier
        </Button>
      </div>
    </div>
  );
}
