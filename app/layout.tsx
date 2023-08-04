import "./globals.css";
import { Inter } from "next/font/google";
import { ExperimentType } from "@/components/Experiment";
import experiments from "../public/experiments.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Turingchat",
  description: "Ein Chat der Turingagency.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const experiments: [ExperimentType[]] = await redis.json.get(
  //   "experiments",
  //   "$"
  // );
  // const experimentsToUse = experiments[0];
  const experimentsToUse = experiments;

  return (
    <html className="antialiased h-full" lang="de">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          // href="https://www.turingagency.org/media/site/dbd2066069-1677497962/favicon-16x16.png"
          sizes="16x16"
        />
        <title></title>
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
      <body className={`${inter.className} h-full`}>
        <header className="px-6 py-3 bg-gray-100 border-b border-gray-300">
          <h1 className="font-bold text-2xl">BIAS-Tester</h1>
          <div className="flex space-x-6 items-center ">
            {experimentsToUse.map((experiment: ExperimentType, i: number) => (
              <a
                className="text-blue-500 font-medium text-sm"
                href={`/experiment/${i}`}
                key={i}
              >
                {experiment.name}
              </a>
            ))}
            <a className="text-blue-500 font-medium text-sm" href={`/chat`}>
              Freier Chat
            </a>
            <a className="text-blue-500 font-medium text-sm" href={`/image`}>
              Familie bei Dall-E
            </a>
          </div>
        </header>
        <div className="px-6 h-4/5">{children}</div>
      </body>
    </html>
  );
}
