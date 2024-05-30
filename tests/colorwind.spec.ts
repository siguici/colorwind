import path from 'node:path';
import postcss from 'postcss';
import tailwindcss, { type Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';

import { describe, expect, it } from 'vitest';

const html = String.raw;
const css = String.raw;

function run(
  config: Config,
  input = '@tailwind base;@tailwind components;@tailwind utilities',
  plugin = tailwindcss,
) {
  const { currentTestName } = expect.getState();
  const fullConfig = resolveConfig({
    presets: [tailwindConfig],
    corePlugins: { preflight: false },
    ...config,
  });

  return postcss(plugin(fullConfig)).process(input, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });
}

describe.concurrent('suite', () => {
  const config = {
    content: [
      {
        raw: html`<div class="text-red bg-red-xs border-red-xl"><a href="#" class="button-blue">Click button</a><a href="#" class="link-green">Click link</a></div>`,
      },
    ],
  };

  it('should have red text class', async () => {
    return run(config).then((result) => {
      expect(result.css).toContain(css`.text-red`);
    });
  });

  it('should have bg-red-xs class', async () => {
    return run(config).then((result) => {
      expect(result.css).toContain(css`.bg-red-xs`);
    });
  });

  it('should have border-red-xl class', async () => {
    return run(config).then((result) => {
      expect(result.css).toContain(css`.border-red-xl`);
    });
  });

  it('should have button-blue class', async () => {
    return run(config).then((result) => {
      expect(result.css).toContain(css`.button-blue`);
    });
  });
});
