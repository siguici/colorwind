export * as config from './config';
import plug, {
  type PluginAPI,
  type PluginCreatorWithOptions,
} from 'plugwind.js';
import colorwind, { type ColorwindOptions } from './plugin';

const _colorwind: PluginCreatorWithOptions<ColorwindOptions> = plug.with(
  (options?: ColorwindOptions) => (api: PluginAPI) => {
    return colorwind(api, options);
  },
);

export default _colorwind;
