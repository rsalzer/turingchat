import localFont from "next/font/local";

import { Roboto } from "next/font/google";

// Font files can be colocated inside of `pages`
export const boldFont = Roboto({ weight: "500", subsets: ["latin"] });
export const normalFont = Roboto({ weight: "300", subsets: ["latin"] });
export const headingFont = Roboto({ weight: "700", subsets: ["latin"] });
