"use client";

import { boldFont, headingFont, normalFont } from "@/app/fonts";
import Button from "@/components/Button";

export default function MainPage() {
  return (
    <div className={`${normalFont.className} text-m max-w-2xl`}>
      <h2 className={`${headingFont.className} text-2xl my-1 text-rot`}>
        Willkommen zum Bias-Tester.
      </h2>
      <h3 className={`${headingFont.className} text-2xl my-1`}>KI hat Bias</h3>
      <p>
        In den aktuellen KI-Modellen stecken nicht nur riesige Mengen an Daten,
        in ihnen stecken auch unsere eigenen Vorurteile und unsere
        diskriminierenden Strukturen. Das nennt man «Bias». Man könnte auch
        sagen: die KI hat die Machtverhältnisse der – westlichen – Gesellschaft
        souverän übernommen, sie hat sie gelernt. Und reproduziert sie nun
        dementsprechend.
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
      <Button onClick={() => (window.location.href = "/experiment/0")}>
        Direkt zum ersten Experiment
      </Button>
    </div>
  );
}
