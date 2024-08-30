import colors from './colors';
import { isArray, isObject } from './utils';

const utilities = {
  text: 'color',
  bg: 'background-color',
  decoration: 'text-decoration-color',
  border: 'border-color',
  outline: 'outline-color',
  accent: 'accent-color',
  caret: 'caret-color',
  divide: 'border-color',
  fill: 'fill',
  stroke: 'stroke',
  shadow: '--tw-shadow-color',
  ring: '--tw-ring-color',
};

export const defaultConfig = {
  colors,
  utilities,
} as const;

export type Mode = 'dark' | 'light';
export type ColorScheme = { [key in Mode]: string };
export type DefaultColors = typeof colors;
export type DefaultColorName = keyof DefaultColors;
export type DefaultColorValue = DefaultColors[DefaultColorName];
export type ColorName = DefaultColorName | string;
export type ColorOption = DefaultColorValue | ColorScheme | string;
export type ColorConfig = Record<ColorName, ColorOption>;
export type ColorOptions = DefaultColorName[] | ColorConfig;
export type DefaultUtilities = typeof utilities;
export type DefaultUtilityName = keyof DefaultUtilities;
export type UtilityConfig =
  | DefaultUtilities
  | {
      [key: string]: string;
    };
export type UtilityOptions = DefaultUtilityName[] | UtilityConfig;

export type Options = {
  colors?: ColorOptions;
  utilities?: UtilityOptions;
};

export type Config = {
  colors: ColorConfig;
  utilities: UtilityConfig;
};

export function defineColors(options?: ColorOptions): ColorConfig {
  let config: ColorConfig = {};
  if (isArray<string>(options)) {
    for (const color of options) {
      if (color in colors) {
        config[color] = colors[color as DefaultColorName];
      }
    }
  } else if (isObject(options)) {
    config = options;
  } else {
    config = defaultConfig.colors;
  }
  return config;
}

export function defineUtilities(options?: UtilityOptions): UtilityConfig {
  let config: UtilityConfig = {};
  if (isArray<string>(options)) {
    for (const utility of options) {
      if (utility in utilities) {
        config[utility] = utilities[utility as DefaultUtilityName];
      }
    }
  } else if (isObject(options)) {
    config = options;
  } else {
    config = defaultConfig.utilities;
  }
  return config;
}

export function defineConfig(options?: Options): Config {
  return options
    ? {
        ...defaultConfig,
        colors: defineColors(options.colors),
        utilities: defineUtilities(options.utilities),
      }
    : defaultConfig;
}
