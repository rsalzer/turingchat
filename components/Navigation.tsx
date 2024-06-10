"use client";

import { ExperimentType } from "@/components/Experiment";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

type NavigationType = {
  imageExperiments: ExperimentType[];
  textExperiments: ExperimentType[];
};

const Navigation = ({ imageExperiments, textExperiments }: NavigationType) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {" "}
      <button
        className="fixed right-4 -translate-y-[48px] sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="/hamburger.svg" alt="hamburger" className="h-[24px]" />
      </button>
      <div
        className={`items-start flex-col m-2 gap-0.25 absolute sm:relative sm:flex bg-grau z-10 sm:z-0 ${
          isOpen ? "flex p-2 border-2 border-gray-500" : "hidden"
        }`}
      >
        <Link
          className={`text-black hover:text-rot font-medium text-sm mt-2 ${
            pathname == "/" && "bg-rosa"
          }`}
          href={`/?overlay=false`}
          onClick={() => setIsOpen(false)}
        >
          Startseite
        </Link>
        <Link
          className={`text-black hover:text-rot font-medium text-sm mb-2 mt-2 ${
            pathname == "/infos" && "bg-rosa"
          }`}
          href={`/infos`}
          onClick={() => setIsOpen(false)}
        >
          Mehr Informationen
        </Link>
        <div className={"text-rot"}>Text-Experimente</div>
        {textExperiments.map((experiment: ExperimentType, i: number) => (
          <Link
            className={`text-black font-medium text-sm hover:text-rot tabular-nums ${
              pathname == `/experiment/${i}` && "bg-rosa"
            }`}
            key={i}
            href={`/experiment/${i}`}
            onClick={() => setIsOpen(false)}
          >
            {experiment.id + 1 < 10
              ? "0" + String(experiment.id + 1)
              : experiment.id + 1}
            . {experiment.name}
          </Link>
        ))}
        <Link
          className={`text-black hover:text-rot font-medium text-sm mt-4 ${
            pathname == `/chat` && "bg-rosa"
          }`}
          href={`/chat`}
        >
          <i>Freier Chat</i>
        </Link>
        <b className="mt-4 text-rot">Bild-Experimente</b>
        {imageExperiments.map((experiment: ExperimentType, i: number) => (
          <Link
            className={`text-black font-medium text-sm hover:text-rot tabular-nums ${
              pathname == `/experiment/${textExperiments.length + i}` &&
              "bg-rosa"
            }`}
            key={i}
            href={`/experiment/${experiment.id}`}
            onClick={() => setIsOpen(false)}
          >
            {experiment.id + 1 < 10
              ? "0" + String(experiment.id + 1)
              : experiment.id + 1}
            . {experiment.name}
          </Link>
        ))}
        {/*<Link*/}
        {/*  className={`text-black hover:text-rot font-medium text-sm mt-4 ${*/}
        {/*    pathname == `/image` && "bg-rosa"*/}
        {/*  }`}*/}
        {/*  href={`/image`}*/}
        {/*>*/}
        {/*  <i>Freies Bild</i>*/}
        {/*</Link>*/}

        <Link
          className={`text-black hover:text-rot font-medium text-sm mt-4 ${
            pathname.startsWith(`/gallery`) && "bg-rosa"
          }`}
          href={`/gallery`}
          onClick={() => setIsOpen(false)}
        >
          Galerie
        </Link>
        {/*<a*/}
        {/*  className={`text-black hover:text-rot font-medium text-sm mt-1 ${*/}
        {/*    pathname.startsWith(`/auswertung`) && "bg-rosa"*/}
        {/*  }`}*/}
        {/*  href={`/auswertung`}*/}
        {/*  onClick={() => setIsOpen(false)}*/}
        {/*>*/}
        {/*  Auswertung*/}
        {/*</a>*/}
        <Link
          className={`text-black hover:text-rot font-medium text-sm mt-4 ${
            pathname == `/impressum` && "bg-rosa"
          }`}
          href={`/impressum`}
          onClick={() => setIsOpen(false)}
        >
          Impressum
        </Link>
      </div>
    </>
  );
};

export default Navigation;
