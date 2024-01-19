import { headingFont, normalFont } from "@/app/fonts";
import experiments from "@/public/experiments.json";
import { ExperimentType } from "@/components/Experiment";
import GalleryNavigation from "@/components/GalleryNavigation";

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
      <div>
        <h2 className={`${headingFont.className} text-2xl text-rot mb-1`}>
          Foto-Galerie
        </h2>
        <GalleryNavigation imageExperiments={imageExperiments} />
      </div>
      {children}
    </div>
  );
}
