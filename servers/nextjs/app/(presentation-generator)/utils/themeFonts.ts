export type ThemeFont = {
  name: string;
  url: string;
};

export type ThemeFonts = {
  textFont: ThemeFont;
  headingFont: ThemeFont;
  bodyFont: ThemeFont;
};

export const DEFAULT_THEME_FONT: ThemeFont = {
  name: "Inter",
  url: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
};

const isValidFont = (font: any): font is ThemeFont => {
  return Boolean(
    font &&
    typeof font.name === "string" &&
    font.name.trim() &&
    typeof font.url === "string" &&
    font.url.trim(),
  );
};

const cleanFont = (
  font: any,
  fallback: ThemeFont = DEFAULT_THEME_FONT,
): ThemeFont => {
  if (!isValidFont(font)) return fallback;
  return { name: font.name.trim(), url: font.url.trim() };
};

export const normalizeThemeFonts = (fonts: any): ThemeFonts => {
  const textFont = cleanFont(fonts?.textFont);
  const headingFont = cleanFont(fonts?.headingFont, textFont);
  const bodyFont = cleanFont(fonts?.bodyFont, textFont);

  return {
    textFont: bodyFont,
    headingFont,
    bodyFont,
  };
};

export const getThemeFonts = (theme: any): ThemeFonts => {
  return normalizeThemeFonts(theme?.data?.fonts);
};

export const buildFontLoaderMap = (
  fonts: Partial<ThemeFonts> | any,
): Record<string, string> => {
  const normalized = normalizeThemeFonts(fonts);
  const map: Record<string, string> = {};

  [normalized.headingFont, normalized.bodyFont, normalized.textFont].forEach(
    (font) => {
      if (font.name && font.url) map[font.name] = font.url;
    },
  );

  return map;
};

export const withNormalizedThemeFonts = <T extends { data?: any }>(
  theme: T,
): T => ({
  ...theme,
  data: {
    ...(theme as any).data,
    fonts: normalizeThemeFonts((theme as any).data?.fonts),
  },
});

const THEME_FONT_SPLIT_STYLE_ID = "presenton-theme-font-split-style";

const ensureThemeFontSplitStyle = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById(THEME_FONT_SPLIT_STYLE_ID)) return;

  const styleEl = document.createElement("style");
  styleEl.id = THEME_FONT_SPLIT_STYLE_ID;
  styleEl.textContent = `
[data-theme-font-split="true"] h1,
[data-theme-font-split="true"] h2,
[data-theme-font-split="true"] h3,
[data-theme-font-split="true"] h4,
[data-theme-font-split="true"] h5,
[data-theme-font-split="true"] h6,
[data-theme-font-split="true"] [data-font-role="heading"] {
  font-family: var(--heading-font-family) !important;
}

[data-theme-font-split="true"] p,
[data-theme-font-split="true"] li,
[data-theme-font-split="true"] td,
[data-theme-font-split="true"] th,
[data-theme-font-split="true"] blockquote,
[data-theme-font-split="true"] figcaption,
[data-theme-font-split="true"] small,
[data-theme-font-split="true"] [data-font-role="body"] {
  font-family: var(--body-font-family) !important;
}
`;
  document.head.appendChild(styleEl);
};

export const applyThemeFontSplitStyles = (element: HTMLElement | null) => {
  if (!element) return;
  ensureThemeFontSplitStyle();
  element.setAttribute("data-theme-font-split", "true");
};
