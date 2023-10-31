"use client";

import React, { PropsWithChildren } from "react";
import { boldFont } from "@/app/fonts";

type ButtonProps = {
  onClick: () => void;
};

const Button = ({
  children,
  onClick = () => console.log("Button clicked"),
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={`${boldFont.className} m-2 ml-0 whitespace-nowrap text-xl group inline-flex justify-center gap-2 items-center bg-black text-white rounded-md shadow-md hover:bg-rot py-1.5 transition-colors px-3 disabled:bg-white disabled:border-zinc-200 select-none active:bg-rosa active:text-black`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
