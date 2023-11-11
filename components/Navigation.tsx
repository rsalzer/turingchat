"use client";

import { ExperimentType } from "@/components/Experiment";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavigationType = {
  imageExperiments: ExperimentType[];
  textExperiments: ExperimentType[];
};

const Navigation = ({ imageExperiments, textExperiments }: NavigationType) => {
  const pathname = usePathname();
  // const router = useRouter();
  // router.replace("/")
  //
  // useEffect(() => {
  //   let timer1 = setTimeout(() => router.replace("/"), 3000);
  //   return () => {
  //     clearTimeout(timer1);
  //   };
  // }, [pathname]);

  return (
    <div className="items-start flex-col m-2 gap-0.25 hidden sm:flex">
      <Link
        className={`text-black hover:text-rot font-medium text-sm mt-2 ${
          pathname == "/" && "bg-rosa"
        }`}
        href={`/?overlay=false`}
      >
        Startseite
      </Link>
      <Link
        className={`text-black hover:text-rot font-medium text-sm mb-2 mt-2 ${
          pathname == "/infos" && "bg-rosa"
        }`}
        href={`/infos`}
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
            pathname == `/experiment/${textExperiments.length + i}` && "bg-rosa"
          }`}
          key={i}
          href={`/experiment/${experiment.id}`}
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
    </div>
  );
};

export default Navigation;
