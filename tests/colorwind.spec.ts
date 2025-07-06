import path from 'node:path';
import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';

const css = String.raw;

function run(
  input = '@import "tailwindcss";@config "../tailwind.config.ts"',
  plugin = tailwindcss,
) {
  const { currentTestName } = expect.getState();

  return postcss(plugin()).process(input, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });
}

describe.concurrent('suite', () => {
  it('should have red text class', async () => {
    return run().then((result) => {
      expect(result.css).toContain(css`.text-red`);
    });
  });

  it('should have bg-red-xs class', async () => {
    return run().then((result) => {
      expect(result.css).toContain(css`.bg-red-2`);
    });
  });

  it('should have border-red-xl class', async () => {
    return run().then((result) => {
      expect(result.css).toContain(css`.border-red-0`);
    });
  });
});
