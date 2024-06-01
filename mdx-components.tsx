import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { boldFont, headingFont } from "@/app/fonts";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    h3: ({ children }) => (
      <h3 className={`${headingFont.className} text-2xl my-2`}>{children}</h3>
    ),
    p: ({ children }) => <p className="mb-4">{children}</p>,
    strong: ({ children }) => (
      <b className={`${boldFont.className}`}>{children}</b>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  };
}
