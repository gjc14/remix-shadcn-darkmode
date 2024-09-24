# Remix Shadcn Darkmode

Welcome! This is a demo of how to control _dark_, _light_, and _system_ themes in Remix SSR without flash. Taking advantage of [client-hints](https://github.com/epicweb-dev/client-hints) and learnt a lot from [2024 Remix dark mode](https://www.mattstobbs.com/remix-dark-mode/).

## Flow

### 1. Get client hint

Using `@epic-web/client-hints` (I copied only `color-schema` part of this package) to get `prefers-color-scheme` before sending the first response. (Which will be stored in the cookie with request)

### 2. Add theme

Read client hint cookie from `loader` and directly add theme to `<html>` in `/app/root.tsx/Layout` component, if there are no `custom-theme` cookie set.

\*Fallbakc theme is set in [`useCookieTheme()`](https://github.com/gjc14/remix-shadcn-darkmode/tree/main/app/lib/client-hints/useCookieTheme.tsx)

### 3. Set cookie

Set `custom-theme` cookie when user manually choose either _dark_ or _light_, delete when _system_ is chosen.

---

# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
