import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths({ ignoreConfigErrors: true })],
  test: {
    include: [
      ...configDefaults.include.map((e) => `./tests/${e}`),
      "src/**/*.test.?(c|m)[jt]s?(x)",
    ],
    exclude: [...configDefaults.exclude],
  },
});
