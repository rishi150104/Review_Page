// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Vercel builds set VERCEL=1; pin the nitro preset so the build emits
// .vercel/output instead of the default Cloudflare worker bundle.
const isVercel = !!process.env["VERCEL"];

export default defineConfig({
  tanstackStart: {
    // src/router.tsx is the router entry, src/routes/ holds the route files.
    srcDirectory: "src",
    router: { entry: "router.tsx" },
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(isVercel ? { nitro: { preset: "vercel" as const } } : {}),
});
