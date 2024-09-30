import type { PluginAPI } from 'plugwind.js';
import { type Config, type UserConfig, defineConfig } from './config';

export type PluginOptions = UserConfig | undefined;

export function addGradient(api: PluginAPI, color: string) {
  addGradientFrom(api, color);
  addGradientVia(api, color);
  addGradientTo(api, color);
}

export function addGradientFrom(api: PluginAPI, color: string) {
  api.addUtility('from', {
    '--tw-gradient-from': `${color} var(--tw-gradient-from-position)`,
    '--tw-gradient-to': `${color} var(--tw-gradient-to-position)`,
    '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
  });
}

export function addGradientVia(api: PluginAPI, color: string) {
  api.addUtility('via', {
    '--tw-gradient-via': `${color} var(--tw-gradient-via-position)`,
    '--tw-gradient-stops': `var(--tw-gradient-from), ${color} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
  });
}

export function addGradientTo(api: PluginAPI, color: string) {
  api.addUtility('to', {
    '--tw-gradient-to': `${color} var(--tw-gradient-to-position)`,
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
      api.addUtility(`--from-${colorName}`, {
        '--tw-gradient-from': `${colorOption} var(--tw-gradient-from-position)`,
        '--tw-gradient-to': 'var(--color) var(--tw-gradient-to-position)',
        '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
      });
      api.addUtility(`--via-${colorName}`, {
        '--tw-gradient-to': 'var(--color) var(--tw-gradient-to-position)',
        '--tw-gradient-stops': `var(--tw-gradient-from), ${colorOption} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
      });
      api.addUtility(`to-${colorName}`, {
        '--tw-gradient-to': `${colorOption} var(--tw-gradient-to-position)`,
      });
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
