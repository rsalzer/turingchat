import { headingFont, normalFont } from "@/app/fonts";
import React from "react";

const instructions: { [name: string]: React.ReactNode } = {
  Krankenhaus: (
    <div>
      <p>
        Wenn man GPT eine Szene imaginieren lässt, dann wählt die KI die Figuren
        nach Wahrscheinlichkeit. Gibt es in einem Krankenhaus mehr{" "}
        <i>Ärztinnen</i> oder mehr <i>Ärzte</i>? Beziehungsweise: Kommen in all
        den Texten über Krankenhäuser, die GPT gelesen hat, häufiger Ärztinnen
        vor oder Ärzte? Und wie sieht es bei <i>Krankenschwestern</i> oder{" "}
        <i>Krankenpflegern</i> aus? Doch sehen Sie selbst.
      </p>
    </div>
  ),
  Schule: (
    <div>
      <p>
        Wenn man GPT eine Szene imaginieren lässt, dann wählt die KI die Figuren
        nach Wahrscheinlichkeit. Gibt es in einer Schule mehr <i>Lehrerinnen</i>{" "}
        oder mehr <i>Lehrer</i>? Beziehungsweise: Kommen in all den Texten über
        Schulen, die GPT gelesen hat, häufiger <i>Lehrerinnen</i> vor oder{" "}
        <i>Lehrer</i>? Was denken Sie?
      </p>
    </div>
  ),
  "Mann + Frau = Romanze?": (
    <div>
      <p>
        Wenn man GPT eine Szene imaginieren lässt, dann geht die Geschichte den
        wahrscheinlichsten Weg. Was entspinnt sich also, wenn ein Mann und eine
        Frau sich das erste Mal begegnen? Etwas Romantisches oder etwas
        Freundschaftliches? Man kann sich die Antwort schon denken… (Ah, und wie
        sieht es aus, wenn wir – ganz ähnlich – zwei Frauen oder zwei Männer
        sich begegnen lassen?)
      </p>
    </div>
  ),
  "Frau + Frau = Freundschaft?": (
    <div>
      <p>
        Wenn man GPT eine Szene imaginieren lässt, dann geht die Geschichte den
        wahrscheinlichsten Weg. Was entspinnt sich also, wenn eine Frau und eine
        Frau sich das erste Mal begegnen? Etwas Romantisches oder etwas
        Freundschaftliches? Man kann sich die Antwort schon denken…
      </p>
    </div>
  ),
  "Mann + Mann = Freundschaft?": (
    <div>
      <p>
        Wenn man GPT eine Szene imaginieren lässt, dann geht die Geschichte den
        wahrscheinlichsten Weg. Was entspinnt sich also, wenn ein Mann und ein
        Mann sich das erste Mal begegnen? Etwas Romantisches oder etwas
        Freundschaftliches? Man kann sich die Antwort schon denken…
      </p>
    </div>
  ),
  "Moslems in der Bar": (
    <div>
      <p>
        Es ist nicht mehr ganz einfach, den im Modell angelegten Rassismus aus
        GPT herauszukitzeln. Der Input mit zwei Moslems, die in eine Bar gehen,
        provozierte noch vor 3 Jahren wüste Szenen von Gewalt. Doch inzwischen
        ist dieser offensichtliche Bias herausgefiltert, oder eher: zugekittet.
        Hier kann man ausprobieren, welche Seltsamkeiten Sprachmodelle
        produzieren, wenn man sie nicht den wahrscheinlichsten Weg gehen lässt.
        Das Resultat ist zwar nicht mehr rassistisch, aber es ist nach wie vor –
        irgendwie komisch?
      </p>
    </div>
  ),
  Familie: (
    <div>
      <p>
        Wenn man von der KI DALL-E ein Bild generieren lässt, wird das Modell
        versuchen, die wahrscheinlichste Entsprechung zu einem Stichwort zu
        finden. Wie sehen wir eine typische Familie? Und wie würde eine Chinesin
        sich so eine Familie vorstellen? Welche Bilder hat das System vor allem
        gesehen, um zu lernen wie eine Familie aussieht? Auch hier wieder: man
        kann sich die Antwort schon denken…
      </p>
    </div>
  ),
  "Flight attendant": (
    <div>
      <p>
        Wenn man von der KI DALL-E ein Bild generieren lässt, wird das Modell
        versuchen, die wahrscheinlichste Entsprechung zu einem Stichwort zu
        finden. Versuchen wir es einmal mit «Flight Attendant», im Englischen
        genderneutral für StewardEss (oder «Cabin Crew Member», wie es bei der
        Swiss heisst). Welche Bilder hat das System vor allem gesehen, um zu
        lernen welches Geschlecht so ein Crew Member wahrscheinlich hat? Auch
        hier wieder: man kann sich die Antwort schon denken… (ah, und wie viele
        dieser Attendants haben eine nicht-weisse Hautfarbe?)
      </p>
    </div>
  ),
  "Pilot:in": (
    <div>
      <p>
        Wenn man von der KI DALL-E ein Bild generieren lässt, wird das Modell
        versuchen, die wahrscheinlichste Entsprechung zu einem Stichwort zu
        finden. Versuchen wir es einmal mit «Pilot», im Englischen
        genderneutral. Welche Bilder hat das System vor allem gesehen, um zu
        lernen welches Geschlecht so einE PilotIn wahrscheinlich hat? Auch hier
        wieder: man kann sich die Antwort schon denken… (ah, und wie viele
        dieser PilotInnen haben eine nicht-weisse Hautfarbe?)
      </p>
    </div>
  ),
  "Professor:in": (
    <div>
      <p>
        Wenn man von der KI DALL-E ein Bild generieren lässt, wird das Modell
        versuchen, die wahrscheinlichste Entsprechung zu einem Stichwort zu
        finden. Versuchen wir es einmal mit «Professor», im Englischen
        genderneutral. Welche Bilder hat das System vor allem gesehen, um zu
        lernen welches Geschlecht so einE ProfessorIn wahrscheinlich hat? Auch
        hier wieder: man kann sich die Antwort schon denken… (ah, und wie viele
        dieser ProfessorInnen haben eine nicht-weisse Hautfarbe?)
      </p>
    </div>
  ),
};

type InstructionProps = {
  instruction: string;
};

const Instruction = ({ instruction }: InstructionProps) => {
  return (
    <div className={`${normalFont.className} text-m`}>
      {instructions[instruction] ?? (
        <>
          <h3 className={`${headingFont.className} text-2xl my-1`}>
            Platzhalter Instruktion
          </h3>
          <p className={`${normalFont.className} text-m`}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </>
      )}
    </div>
  );
};

export default Instruction;
