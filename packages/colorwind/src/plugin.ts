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

  api.addGradient('var(--color)');

  for (const [colorName, colorOption] of Object.entries(colors)) {
    if (typeof colorOption === 'object') {
      const lightColor = colorOption.light;
      const darkColor = colorOption.dark;
      api.addDark(
        colorName,
        {
          '--color': darkColor,
        },
        {
          '--color': lightColor,
        },
      );
      api.addDark(
        `${colorName}-reverse`,
        {
          '--color': lightColor,
        },
        {
          '--color': darkColor,
        },
      );
    } else {
      api.addProperty('--color', colorOption, colorName);
      api.addGradient(colorOption, colorName, 'var(--color)');
    }

    for (const [utilityName, propertyName] of Object.entries(utilities)) {
      api.addProperty(propertyName, 'var(--color)', utilityName);

      const className = `${utilityName}-${colorName}`;
      if (typeof colorOption === 'object') {
        const lightColor = colorOption.light;
        const darkColor = colorOption.dark;
        api.addDark(
          className,
          {
            [propertyName]: darkColor,
          },
          {
            [propertyName]: lightColor,
          },
        );
        api.addDark(
          `${className}-reverse`,
          {
            [propertyName]: lightColor,
          },
          {
            [propertyName]: darkColor,
          },
        );
      } else {
        api.addProperty(propertyName, colorOption, className);
      }
    }
  }
}
