import { headingFont, normalFont } from "@/app/fonts";
import Link from "next/link";
import experiments from "@/public/experiments.json";
import { ExperimentType } from "@/components/Experiment";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const experimentsToUse = experiments as ExperimentType[];
  experimentsToUse.forEach((experiment, index) => (experiment.id = index));

  const imageExperiments = experimentsToUse.filter(
    (experiment) => experiment.type === "image"
  );

  return (
    <div className={`${normalFont.className} text-m flex flex-col h-full`}>
      <div className={"flex items-center mb-3 gap-3"}>
        <h2 className={`${headingFont.className} text-2xl text-rot`}>
          Foto-Gallerie
        </h2>
        {imageExperiments.map((experiment) => (
          <Link href={"" + experiment.id} key={experiment.name}>
            {experiment.name}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 overflow-y-scroll flex-1">
        {children}
      </div>
    </div>
  );
}
