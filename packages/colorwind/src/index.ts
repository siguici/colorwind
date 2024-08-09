export * as config from './config';
import plug, {
  type PluginAPI,
  type PluginCreator,
  type PluginCreatorWithOptions,
} from 'plugwind.js';
import plugin, { type ColorwindOptions } from './plugin';

export const colorwind: PluginCreatorWithOptions<ColorwindOptions> = plug.with(
  (options) => (api: PluginAPI) => {
    return plugin(api, options);
  },
);

const _colorwind: PluginCreator = plug((api: PluginAPI) => {
  return plugin(api);
});

export default _colorwind;
