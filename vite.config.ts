import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const host = env.VITE_SERVER_HOST ?? "localhost";
  const port = Number(env.VITE_SERVER_PORT ?? "3000");

  return {
    root: resolve(__dirname, "design"),
    server: { host, port },
    plugins: [tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    resolve: {},
  };
});
