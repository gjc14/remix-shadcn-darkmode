import { GitHubLogoIcon } from "@radix-ui/react-icons";
import type { MetaFunction } from "@remix-run/node";
import { ModeToggle } from "~/components/mode-toggle";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Shadcn Darkmode" },
    {
      name: "description",
      content: "Welcome to Dark mode with Shadcn and Remix!",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          {/* for seo h1 should better match meta title */}
          <h1
            className="absolute h-[1px] w-[1px] p-0 overflow-hidden"
            style={{
              clip: "rect(1px, 1px, 1px, 1px)",
              clipPath: "inset(0px, 0px, 99%, 99%)",
            }}
          >
            Remix Shadcn Darkmode
          </h1>
          <h2 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h2>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
          <h2 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            SSR Dark mode!
          </h2>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            This is a simple example of how to use dark mode with Remix and
            Shadcn.
          </p>
          <ol className="list-decimal">
            <li>
              Get <strong>client hints</strong> from the browser by cookie.
            </li>
            <li>Set the theme based on the client hints.</li>
            <li>
              Change theme by React Context{" "}
              <pre className="inline bg-accent-foreground/30">setTheme</pre>.
            </li>
          </ol>
          <ModeToggle />
          <a
            href="https://github.com/gjc14/remix-shadcn-darkmode"
            aria-label="Go to remix-shadcn-darkmode repo"
            target="_blank"
            rel="noopener noreferrer"
            title="Go to the GitHub repository for remix-shadcn-darkmode"
          >
            <GitHubLogoIcon className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </div>
  );
}
