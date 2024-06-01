"use client";

import { boldFont, headingFont, normalFont } from "@/app/fonts";
import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function MainPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

function Page() {
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
      <h2 className={`${headingFont.className} text-2xl mb-3 text-rot`}>
        Willkommen zum Vorurteile-Tester.
      </h2>
      <h3 className={`${headingFont.className} text-2xl my-2`}>
        KI hat Vorurteile
      </h3>
      <p className="mb-4">
        In den aktuellen KI-Modellen (beispielsweise ChatGPT oder DALL·E)
        stecken nicht nur riesige Mengen an Daten, in ihnen stecken auch unsere
        eigenen Vorurteile und unsere diskriminierenden Strukturen. Man könnte
        auch sagen: die KI hat die Machtverhältnisse der – westlichen –
        Gesellschaft souverän übernommen, sie hat sie gelernt. Und reproduziert
        sie nun dementsprechend.
      </p>
      <h3 className={`${headingFont.className} text-2xl my-2`}>
        Hier können Sie Vorurteile testen
      </h3>
      <p className="mb-4">
        Wir haben eine Teststation gebaut, mit der Sie die diskriminierenden
        Abgründe, die «dunklen Ecken» von GPT und Konsorten erkunden können. Um
        den Einstieg ins Testen zu erleichtern, schlagen wir ein paar
        entlarvende Prompts vor, die Sie einfach anklicken können. Probieren Sie
        selber aus, ob Sie damit sexistische oder rassistische Texte und Bilder
        provozieren können. Sie dürfen auch selber kreativ werden! Vielleicht
        kommen Ihnen weitere Szenerien in den Sinn, um dunkle Ecken in den
        Sprach- und Bildmodellen auszuleuchten.
      </p>
      <p className={"my-1"}>
        <b className={`${boldFont.className}`}>
          Wählen Sie links ein Experiment aus, springen Sie direkt zum ersten
          Experiment oder lesen sie mehr über KI und ihre Vorurteile.
        </b>
      </p>
      <Button onClick={() => {}}>
        <Link href={`/experiment/0`}>Direkt zum ersten Experiment</Link>
      </Button>
      <Button onClick={() => {}}>
        <Link href={`/infos`}>
          Mehr Informationen über KI und ihre Vorurteile
        </Link>
      </Button>

      <div
        id="menu"
        className={`fixed top-0 left-0 z-90 w-full h-full flex flex-col justify-center items-center bg-rosa duration-700 gap-4 transition-opacity opacity-0 pointer-events-none ${
          showOverlayScreen && !overlaySearchParam
            ? "xl:opacity-100 xl:pointer-events-auto"
            : "xl:opacity-0 xl:pointer-events-none"
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
