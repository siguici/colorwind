import plugin from "tailwindcss/plugin";
import type { PluginAPI } from "tailwindcss/types/config";
import { Colors, type ColorsConfig, DEFAULT_COLORS } from "./colors";
import type { PluginWithOptions } from "./plugin";

export type RequiredPluginConfig = {
  colors: boolean | ColorsConfig;
};

export type PluginConfig = Partial<RequiredPluginConfig> | undefined;

export const DEFAULT_OPTIONS: RequiredPluginConfig = {
  colors: true,
};

export function plugColors(): PluginWithOptions<PluginConfig> {
  return plugin.withOptions(
    (options: PluginConfig = DEFAULT_OPTIONS) =>
      (api) => {
        if (options.colors) {
          useColors(
            api,
            typeof options.colors === "boolean"
              ? DEFAULT_COLORS
              : options.colors,
          );
        }
      },
  );
}

function useColors(api: PluginAPI, options: ColorsConfig): Colors {
  return new Colors(api, options).create();
}

export default plugColors();
