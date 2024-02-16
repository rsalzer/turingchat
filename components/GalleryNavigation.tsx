"use client";

import { ExperimentType } from "@/components/Experiment";
import { usePathname } from "next/navigation";
import Link from "next/link";

type GalleryNavigationType = {
  imageExperiments: ExperimentType[];
};

const GalleryNavigation = ({ imageExperiments }: GalleryNavigationType) => {
  const pathname = usePathname();
  const firstPart = pathname.split("/")[1];
  const secondPart = pathname.split("/")[2];
  // console.log(firstPart, secondPart);
  return (
    <div className="flex items-center gap-3">
      {imageExperiments.map((experiment, index) => (
        <Link
          className={`text-black hover:text-rot font-medium text-sm ${
            (secondPart == `${experiment.id}` && "bg-rosa") ||
            (!secondPart &&
              index === 0 &&
              pathname.startsWith(`/gallery`) &&
              "bg-rosa")
          }`}
          href={"/" + firstPart + "/" + experiment.id}
          key={experiment.name}
          prefetch={false}
        >
          {experiment.name}
        </Link>
      ))}
    </div>
  );
};

export default GalleryNavigation;
