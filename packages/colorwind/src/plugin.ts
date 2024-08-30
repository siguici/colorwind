import type { PluginAPI } from 'plugwind.js';
import { type Config, type UserConfig, defineConfig } from './config';

export type PluginOptions = UserConfig | undefined;

export default function (
  api: PluginAPI,
  options: PluginOptions = undefined,
): void {
  const config: Config = defineConfig(options);
  const colors = config.colors;
  const utilities = config.utilities;

  for (const [colorName, colorOption] of Object.entries(colors)) {
    for (const [utilityName, propertyName] of Object.entries(utilities)) {
      const className = `${utilityName}-${colorName}`;
      if (typeof colorOption === 'object') {
        api.addVar(`${colorName}-light`, colorOption.light, ':root');
        api.addVar(`${colorName}-dark`, colorOption.dark, ':root');
        api.addDark(
          className,
          {
            [propertyName]: `var(${colorName}-dark)`,
          },
          {
            [propertyName]: `var(${colorName}-light)`,
          },
        );
        api.addDark(
          `${className}-reverse`,
          {
            [propertyName]: `var(${colorName}-light)`,
          },
          {
            [propertyName]: `var(${colorName}-dark)`,
          },
        );
      } else {
        api.addVar(className, colorOption, ':root');
        api.addProperty(propertyName, colorOption, className);
      }
    }
  }
}
