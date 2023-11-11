"use client";

import { boldFont, headingFont, normalFont } from "@/app/fonts";
import Button from "@/components/Button";
import Link from "next/link";
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
        Weitere Informationen
      </h2>
      <h3 className={`${headingFont.className} text-2xl my-2`}>
        AI Bias - was ist das?
      </h3>
      <p className="mb-4">
        Künstliche Intelligenz kann all die Dinge die sie kann nur weil sie auf
        die jeweilige Funktion hin "trainiert" worden ist, wie das im Fachjargon
        heisst. Dieses Training ist eine mathematisch komplexe Sache, aber
        entscheidend dabei ist: Grundlage des Trainings sind Unmengen an Daten.
        Und diese sind zumeist menschgemacht. Bei grossen Text-KIs also:
        Terabytes und Terabytes an Texten, die überall da gesammelt werden, wo
        sie frei verfügbar sind. Manche sagen auch: für das Training hätten sich
        ChatGPT und Konsorten "das komplette Internet" einverleibt. In diesen
        Daten steckt viel menschliches Wissen, aber was auch drin steckt: viele
        Vorurteile, viel gesellschaftliche Ungleichheit. Diese sogenannten
        "Biases" tauchen in den Sprachausgaben der KI dann wieder auf, manchmal
        versteckt, manchmal auch offensiv offen. Da ist die KI nicht besser,
        nicht klüger, nicht fairer als wir. Ausserdem drängt sich die Frage auf:
        welcher Teil der Welt ist dominant im Internet vertreten - und wofür ist
        das Internet blind? Probieren Sie es aus!
      </p>
      <h3 className={`${headingFont.className} text-2xl my-2`}>
        Können Maschinen "neutral" sein?
      </h3>
      <p className="mb-4">
        Maschinen funktionieren und urteilen objektiver und unvoreingenommener
        als Menschen? Das hätten wir gern. Und es mag vielleicht bei einem
        Kamera-Bild noch halbwegs stimmen, das eine Szenerie zeigt "wie sie
        ist", im Gegensatz zur unverlässlichen Erinnerung eines Zeugen. Aber bei
        KI läuft diese Hoffnung ins Leere. Die KI trifft ihre Entscheidungen
        nicht nach einem maschinell-logischen Raster, sondern nach
        Wahrscheinlichkeit. Und was sie als mehr oder weniger wahrscheinlich
        erachtet hat sie allein anhand menschlicher Beispiele gelernt.
      </p>
      <p className="mb-4">
        Es gibt zwar Versuche, KIs die menschlichen Vorurteile ganz gezielt
        abzugewöhnen oder sie mit Filtern zu neutralisieren. Zum Beispiel bei
        automatisierten Bewerbungsverfahren: Können Kandidatinnen von einer KI
        womöglich fairer ausgewählt werden? Nämlich anhand tatsächlicher
        Qualitäten und nicht aufgrund von Geschlecht oder ausländisch klingendem
        Nachnamen? So etwas wird gerade intensiv erforscht.
      </p>
      <p className="mb-4">
        Leider zeigt sich: Die Macht der Trainingsdaten ist gross, die "perfekt
        vorurteilsfreie" Maschine wird wohl eine Illusion bleiben. Denn am
        Schluss sind alle Flick-Versuche auch wieder subjektiv, jeder Filter
        zeigt auch wieder ein Wertsystem auf. Welche Ismen hat die KI von uns
        gelernt? Und wie offensichtlich reproduziert sie sie? Probieren Sie es
        aus!
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
    </div>
  );
}
