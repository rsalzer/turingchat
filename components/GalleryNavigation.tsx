"use client";

import { ExperimentType } from "@/components/Experiment";
import { usePathname } from "next/navigation";
import Link from "next/link";

type GalleryNavigationType = {
  imageExperiments: ExperimentType[];
};

const GalleryNavigation = ({ imageExperiments }: GalleryNavigationType) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center mb-3 gap-3">
      {imageExperiments.map((experiment, index) => (
        <Link
          className={`text-black hover:text-rot font-medium text-sm mt-2 ${
            (pathname == `/gallery/${experiment.id}` && "bg-rosa") ||
            (index === 0 && pathname === `/gallery` && "bg-rosa")
          }`}
          href={"/gallery/" + experiment.id}
          key={experiment.name}
        >
          {experiment.name}
        </Link>
      ))}
    </div>
  );
};

export default GalleryNavigation;
