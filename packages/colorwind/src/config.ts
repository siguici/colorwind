import colors from './colors';

const reversible = true;
const modes = ['light', 'dark'] as const;

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
} as const;

const components = {
  link: ['text', 'decoration'],
} as const;

const themes = {
  red: {
    link: {
      text: 'red',
      decoration: 'red',
    },
  },
} as const;

const defaultConfig = {
  reversible,
  modes,
  colors,
  utilities,
  components,
  themes,
} as const;

export type Reversible = typeof reversible;
export type Modes = typeof modes;
export type Mode = Modes[number];
export type Colors = typeof colors;
export type ColorName = keyof Colors;
export type ColorValue = Colors[ColorName];
export type ColorScheme = { [key in Mode]: string };
export type Utilities = typeof utilities;
export type UtilityName = keyof Utilities;
export type UtilityValue = Utilities[UtilityName];
export type Components = typeof components;
export type ComponentName = keyof Components;
export type ComponentUtilities = Components[ComponentName];
export type ComponentUtility = ComponentUtilities[number];
export type Themes = typeof themes;
export type ThemeName = keyof Themes;
export type ThemeComponents = Themes[ThemeName];
export type ThemeComponent = keyof ThemeComponents;
export type ThemeUtilities = ThemeComponents[ThemeComponent];
export type ThemeUtility = keyof ThemeUtilities;
export type ThemeColors = ThemeUtilities[ThemeUtility];
export type ThemeColor = ThemeColors[number];
export type DefaultConfig = typeof defaultConfig;

export default defaultConfig;
