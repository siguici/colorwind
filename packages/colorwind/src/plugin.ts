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
      api.addDark(
        `from-${colorName}`,
        {
          '--tw-gradient-from': `${darkColor} var(--tw-gradient-from-position)`,
          '--tw-gradient-to': 'var(--color) var(--tw-gradient-to-position)',
          '--tw-gradient-stops':
            'var(--tw-gradient-from), var(--tw-gradient-to)',
        },
        {
          '--tw-gradient-from': `${lightColor} var(--tw-gradient-from-position)`,
          '--tw-gradient-to': 'var(--color) var(--tw-gradient-to-position)',
          '--tw-gradient-stops':
            'var(--tw-gradient-from), var(--tw-gradient-to)',
        },
      );
      api.addDark(
        `from-${colorName}-reverse`,
        {
          '--tw-gradient-from': `${lightColor} var(--tw-gradient-from-position)`,
          '--tw-gradient-to': 'var(--color) var(--tw-gradient-to-position)',
          '--tw-gradient-stops':
            'var(--tw-gradient-from), var(--tw-gradient-to)',
        },
        {
          '--tw-gradient-from': `${darkColor} var(--tw-gradient-from-position)`,
          '--tw-gradient-to': 'var(--color) var(--tw-gradient-to-position)',
          '--tw-gradient-stops':
            'var(--tw-gradient-from), var(--tw-gradient-to)',
        },
      );
      api.addDark(
        `via-${colorName}`,
        {
          '--tw-gradient-to': 'var(--color) var(--tw-gradient-to-position)',
          '--tw-gradient-stops': `var(--tw-gradient-from), ${darkColor} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
        },
        {
          '--tw-gradient-to': 'var(--color) var(--tw-gradient-to-position)',
          '--tw-gradient-stops': `var(--tw-gradient-from), ${lightColor} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
        },
      );
      api.addDark(
        `via-${colorName}-reverse`,
        {
          '--tw-gradient-to': 'var(--color) var(--tw-gradient-to-position)',
          '--tw-gradient-stops': `var(--tw-gradient-from), ${lightColor} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
        },
        {
          '--tw-gradient-to': 'var(--color) var(--tw-gradient-to-position)',
          '--tw-gradient-stops': `var(--tw-gradient-from), ${darkColor} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
        },
      );
      api.addDark(
        `to-${colorName}`,
        {
          '--tw-gradient-to': `${darkColor} var(--tw-gradient-to-position)`,
        },
        {
          '--tw-gradient-to': `${lightColor} var(--tw-gradient-to-position)`,
        },
      );
      api.addDark(
        `to-${colorName}-reverse`,
        {
          '--tw-gradient-to': `${lightColor} var(--tw-gradient-to-position)`,
        },
        {
          '--tw-gradient-to': `${darkColor} var(--tw-gradient-to-position)`,
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
