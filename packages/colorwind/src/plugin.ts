import type { PluginAPI } from 'plugwind.js';
import { type Config, type UserConfig, defineConfig } from './config';

export type PluginOptions = UserConfig | undefined;

export function addGradient(
  api: PluginAPI,
  from: string,
  name?: string,
  to?: string,
) {
  addGradientFrom(api, from, name, to);
  addGradientVia(api, from, name, to);
  addGradientTo(api, from, name);
}

export function addGradientFrom(
  api: PluginAPI,
  from: string,
  name?: string,
  to?: string,
) {
  api.addUtility(name ? `--from-${name}` : 'from', {
    '--tw-gradient-from': `${from} var(--tw-gradient-from-position)`,
    '--tw-gradient-to': `${to ?? from} var(--tw-gradient-to-position)`,
    '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
  });
}

export function addGradientVia(
  api: PluginAPI,
  via: string,
  name?: string,
  to?: string,
) {
  api.addUtility(name ? `--via-${name}` : 'via', {
    '--tw-gradient-to': `${to ?? via} var(--tw-gradient-via-position)`,
    '--tw-gradient-stops': `var(--tw-gradient-from), ${via} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
  });
}

export function addGradientTo(api: PluginAPI, to: string, name?: string) {
  api.addUtility(name ? `to-${name}` : 'to', {
    '--tw-gradient-to': `${to} var(--tw-gradient-to-position)`,
  });
}

export function addDarkGradient(
  api: PluginAPI,
  darkColor: string,
  lightColor: string,
  colorName?: string,
  toColor?: string,
) {
  addDarkGradientFrom(api, darkColor, lightColor, colorName, toColor);
  addDarkGradientFrom(
    api,
    lightColor,
    darkColor,
    `${colorName}-reverse`,
    toColor,
  );
  addDarkGradientVia(api, darkColor, lightColor, colorName, toColor);
  addDarkGradientVia(
    api,
    lightColor,
    darkColor,
    `${colorName}-reverse`,
    toColor,
  );
  addDarkGradientTo(api, darkColor, lightColor, colorName);
  addDarkGradientTo(api, lightColor, darkColor, `${colorName}-reverse`);
}

export function addDarkGradientFrom(
  api: PluginAPI,
  darkFrom: string,
  lightFrom: string,
  name?: string,
  to?: string,
) {
  api.addDark(
    name ? `--from-${name}` : 'from',
    {
      '--tw-gradient-from': `${darkFrom} var(--tw-gradient-from-position)`,
      '--tw-gradient-to': `${to ?? darkFrom} var(--tw-gradient-to-position)`,
      '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
    },
    {
      '--tw-gradient-from': `${lightFrom} var(--tw-gradient-from-position)`,
      '--tw-gradient-to': `${to ?? lightFrom} var(--tw-gradient-to-position)`,
      '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
    },
  );
}

export function addDarkGradientVia(
  api: PluginAPI,
  darkVia: string,
  lightVia: string,
  name?: string,
  to?: string,
) {
  api.addDark(
    name ? `--via-${name}` : 'via',
    {
      '--tw-gradient-to': `${to ?? darkVia} var(--tw-gradient-via-position)`,
      '--tw-gradient-stops': `var(--tw-gradient-from), ${darkVia} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
    },
    {
      '--tw-gradient-to': `${to ?? lightVia} var(--tw-gradient-via-position)`,
      '--tw-gradient-stops': `var(--tw-gradient-from), ${lightVia} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
    },
  );
}

export function addDarkGradientTo(
  api: PluginAPI,
  darkTo: string,
  lightTo: string,
  name?: string,
) {
  api.addDark(
    name ? `to-${name}` : 'to',
    {
      '--tw-gradient-to': `${darkTo} var(--tw-gradient-to-position)`,
    },
    {
      '--tw-gradient-to': `${lightTo} var(--tw-gradient-to-position)`,
    },
  );
}

export default function (
  api: PluginAPI,
  options: PluginOptions = undefined,
): void {
  const config: Config = defineConfig(options);
  const colors = config.colors;
  const utilities = config.utilities;

  addGradient(api, 'var(--color)');

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
      addGradient(api, colorOption, colorName, 'var(--color)');
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
