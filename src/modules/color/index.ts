import messages from "@/messages";
import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";
import { darkMode } from "../dark-mode";
import customColors from "./custom-colors";

/**
 * Check if the color is a valid hex color
 */
function isHexColor(color: string) {
  return /^#[0-9A-F]{6}$/i.test(color);
}

/**
 * Convert hex color to "r, g, b" string
 */
function rgbFromHex(hex: string) {
  const r = "0x" + hex[1] + hex[2];
  const g = "0x" + hex[3] + hex[4];
  const b = "0x" + hex[5] + hex[6];

  return `${Number(r)}, ${Number(g)}, ${Number(b)}`;
}

function apply(target: HTMLStyleElement, color: string, dark: boolean) {
  // Create a theme.
  const theme = themeFromSourceColor(argbFromHex(color));
  // Create a dummy element to apply the theme to. This is done due to the limitations of 'applyTheme'.
  const dummy = document.createElement("div");

  // Apply the theme to the dummy element.
  applyTheme(theme, { target: dummy, dark });

  // Get the computed styles of the dummy element and transform all the values to 'r, g, b' strings.
  const data = dummy.style.cssText
    .split(";")
    .map((colorSet) => {
      const [key, value] = colorSet.split(":");

      return value ? { key, value: rgbFromHex(value) } : { key: null, value: null };
    })
    .map(({ key, value }) => (value ? `${key}: ${value}` : ""))
    .join(";\n");

  const cc = Object.entries(customColors[dark ? "dark" : "light"])
    .map(([key, value]) => `${key}: ${value}`)
    .join(";\n");

  target.innerHTML = `* {\n${data}\n${cc}}`;
}

/**
 * Initialize the color module and apply the theme to the body of the document
 * @param color The color that our pallete will be based on
 */
export default function (color: string): void {
  if (!isHexColor(color)) throw new Error(messages.INVALID_COLOR);

  const style = document.createElement("style");

  apply(style, color, true);
  document.head.appendChild(style);
  watch(darkMode, () => {
    apply(style, color, true);
  });
}
