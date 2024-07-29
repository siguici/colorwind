export * as config from './config';
import type { TailwindPluginWithOptions } from 'plugwind.js';
import plugin from 'tailwindcss/plugin';
import type { PluginAPI } from 'tailwindcss/types/config';
import colorwind, { type ColorwindOptions } from './plugin';

const _colorwind: TailwindPluginWithOptions<ColorwindOptions> =
  plugin.withOptions((options?: ColorwindOptions) => (api: PluginAPI) => {
    return colorwind(api, options);
  });

export default _colorwind;
