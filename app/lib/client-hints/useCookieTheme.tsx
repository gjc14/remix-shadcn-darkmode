/**
 * Function useRouteLoaderData() is only available in /app/root.tsx/Layout component.
 */

import { useRouteLoaderData } from "@remix-run/react";
import { loader as rootLoader } from "~/root";

export type Theme = "light" | "dark";

export const useHints = () => {
  // useRouteLoaderData() only available in /app/root.tsx/Layout component
  const data = useRouteLoaderData<typeof rootLoader>("root");
  return data?.requestInfo.hints;
};

// Undefined means no custom theme
export const useCustomTheme = (): Theme | undefined => {
  // useRouteLoaderData() only available in /app/root.tsx/Layout component
  const data = useRouteLoaderData<typeof rootLoader>("root");
  return data?.requestInfo.customTheme;
};

export const useCookieTheme = (): Theme => {
  const hints = useHints();
  const customTheme = useCustomTheme();

  return customTheme ?? hints?.theme ?? "dark"; // The fallback theme
};

/**
 * Get custom theme from cookie
 */
import { parse } from "cookie";
export const customThemeCookieName = "custom-prefers-color-scheme";

export const getCustomTheme = (request: Request): Theme | undefined => {
  const cookieHeader = request.headers.get("Cookie");
  const parsed = cookieHeader && parse(cookieHeader)[customThemeCookieName];

  if (parsed === "light" || parsed === "dark") return parsed;

  return undefined;
};

/**
 * Set custom theme to cookie
 */
export const setCustomTheme = (theme: Theme | undefined) => {
  if (theme === undefined) {
    return (document.cookie = `${customThemeCookieName}=; Max-Age=0; Path=/`);
  }
  document.cookie = `${customThemeCookieName}=${theme}; Max-Age=31536000; Path=/`;
};
