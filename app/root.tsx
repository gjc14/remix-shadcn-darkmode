import { parse } from "cookie";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRevalidator,
} from "@remix-run/react";
import { useEffect } from "react";

import "./tailwind.css";

import { ThemeProvider, useTheme } from "./components/theme-provider";
import { ClientHintCheck, getHints } from "./lib/client-hints/client-hints";
import { subscribeToSchemeChange } from "./lib/client-hints/color-schema";
import {
  customThemeCookieName,
  getCustomTheme,
  useCookieTheme,
} from "./lib/client-hints/useCookieTheme";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({
    requestInfo: {
      hints: getHints(request),
      customTheme: getCustomTheme(request),
    },
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useCookieTheme(); // Return system or custom theme

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ClientHintCheck />
      </head>
      <body>
        {/* children will be the root Component, ErrorBoundary, or HydrateFallback */}
        <ThemeProvider cookieTheme={theme}>{children}</ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { revalidate } = useRevalidator();
  const { setTheme } = useTheme();

  // Subscribe to (prefers-color-scheme: dark), set cookie and revalidate when it changes
  useEffect(() => {
    subscribeToSchemeChange((theme) => {
      // Returns "dark" or "light" from the media query (system theme)
      const cookieHeader = document.cookie;
      const parsedCustomTheme =
        cookieHeader && parse(cookieHeader)[customThemeCookieName];

      // Do not set theme if custom theme is set
      if (parsedCustomTheme) return revalidate();

      // Set theme to system theme and revalidate in setTheme()
      setTheme(theme);
    });
  }, []);

  return <Outlet />;
}
