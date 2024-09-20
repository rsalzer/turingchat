import localFont from "next/font/local";

import { Rubik } from "next/font/google";

// Font files can be colocated inside of `pages`
export const boldFont = Rubik({ weight: "500", subsets: ["latin"] });
export const normalFont = Rubik({ weight: "300", subsets: ["latin"] });
export const headingFont = Rubik({ weight: "700", subsets: ["latin"] });
