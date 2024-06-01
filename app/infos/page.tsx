"use client";

import { boldFont, headingFont, normalFont } from "@/app/fonts";
import Button from "@/components/Button";
import Link from "next/link";
import { useIdleTimer } from "react-idle-timer";
import { useRouter } from "next/navigation";
import MehrInfos from "./mehr-infos.mdx";

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
      <MehrInfos />
    </div>
  );
}
