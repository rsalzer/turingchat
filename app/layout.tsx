import "./globals.css";

import { ExperimentType } from "@/components/Experiment";
import experiments from "../public/experiments.json";
import { boldFont, headingFont } from "@/app/fonts";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Biastest",
  description: "Eine Bias-Testing-Station der Turingagency",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const experimentsToUse = experiments as ExperimentType[];
  experimentsToUse.forEach((experiment, index) => (experiment.id = index));

  const textEperiments = experimentsToUse.filter(
    (experiment) => experiment.type === "text"
  );
  const imageExperiments = experimentsToUse.filter(
    (experiment) => experiment.type === "image"
  );

  return (
    <html className="antialiased h-full border-box" lang="de">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          // href="https://www.turingagency.org/media/site/dbd2066069-1677497962/favicon-16x16.png"
          sizes="16x16"
        />
        <title>Künstliche Intelligenz und ihre Vorurteile</title>
        {/*<link*/}
        {/*  rel="icon"*/}
        {/*  type="image/png"*/}
        {/*  href="https://www.turingagency.org/media/site/87e6451028-1677497962/favicon-32x32.png"*/}
        {/*  sizes="32x32"*/}
        {/*/>*/}
        {/*<link*/}
        {/*  rel="icon"*/}
        {/*  type="image/svg+xml"*/}
        {/*  href="https://www.turingagency.org/media/site/e4fd5ac6f2-1677497962/favicon-32x32.svg"*/}
        {/*  sizes="any"*/}
        {/*/>*/}
        {/*<link*/}
        {/*  rel="icon"*/}
        {/*  type="image/png"*/}
        {/*  href="https://www.turingagency.org/media/site/1247b213e9-1677497962/favicon-152x152.png"*/}
        {/*  sizes="152x152"*/}
        {/*/>*/}
        {/*<link*/}
        {/*  rel="apple-touch-icon"*/}
        {/*  href="https://www.turingagency.org/media/site/1247b213e9-1677497962/favicon-152x152.png"*/}
        {/*/>*/}
      </head>
      <body className={`${boldFont.className} h-screen bg-grau flex flex-col`}>
        <header className="px-2 py-4 bg-rosa border-b border-gray-300 fixed w-full z-5 md:h-16 h-24">
          <a href="/">
            <h1 className={`${headingFont.className} text-2xl text-rot`}>
              KÜNSTLICHE INTELLIGENZ UND IHRE VORURTEILE
            </h1>
          </a>
        </header>
        <main className="flex flex-1 bg-grau h-100 md:mt-16 mt-24 relative -z-10">
          <div className="">
            <div className="sticky top-20">
              <Navigation
                imageExperiments={imageExperiments}
                textExperiments={textEperiments}
              />
            </div>
          </div>
          <div className="m-2 flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
