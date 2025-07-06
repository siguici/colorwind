export * as config from './config';

import {
  type PluginAPI,
  type PluginCreator,
  type PluginCreatorWithOptions,
  plug,
  plugWith,
} from 'plugwind.js';
import plugin, { type PluginOptions } from './plugin';

export { plugin };

export const colorwind: PluginCreatorWithOptions<PluginOptions> = plugWith(
  (options) => (api: PluginAPI) => {
    return plugin(api, options);
  },
);

const _colorwind: PluginCreator = plug((api: PluginAPI) => {
  return plugin(api);
});

export default _colorwind;
