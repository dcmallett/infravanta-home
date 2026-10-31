import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge our custom type scale (globals.css) so `text-body` is treated
// as a font size, not a colour — otherwise it would strip classes like `text-white`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "page-title",
            "section-title",
            "card-title",
            "body-lg",
            "body",
            "label",
            "caption",
            "metric",
          ],
        },
      ],
    },
  },
});

/** Merge conditional class names, letting later Tailwind classes win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
