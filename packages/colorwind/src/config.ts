import twColors from 'tailwindcss/colors';

export const modes = ['light', 'dark'] as const;

const css = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
} as const;

export const colors = {
  ...css,
  pure: {
    light: twColors.white,
    dark: twColors.black,
  },
  slate: twColors.slate[500],
  'slate-4': {
    light: twColors.slate[400],
    dark: twColors.slate[600],
  },
  'slate-3': {
    light: twColors.slate[300],
    dark: twColors.slate[700],
  },
  'slate-2': {
    light: twColors.slate[200],
    dark: twColors.slate[800],
  },
  'slate-1': {
    light: twColors.slate[100],
    dark: twColors.slate[900],
  },
  'slate-0': {
    light: twColors.slate[50],
    dark: twColors.slate[950],
  },
  gray: twColors.gray[500],
  'gray-4': {
    light: twColors.gray[400],
    dark: twColors.gray[600],
  },
  'gray-3': {
    light: twColors.gray[300],
    dark: twColors.gray[700],
  },
  'gray-2': {
    light: twColors.gray[200],
    dark: twColors.gray[800],
  },
  'gray-1': {
    light: twColors.gray[100],
    dark: twColors.gray[900],
  },
  'gray-0': {
    light: twColors.gray[50],
    dark: twColors.gray[950],
  },
  zinc: twColors.zinc[500],
  'zinc-4': {
    light: twColors.zinc[400],
    dark: twColors.zinc[600],
  },
  'zinc-3': {
    light: twColors.zinc[300],
    dark: twColors.zinc[700],
  },
  'zinc-2': {
    light: twColors.zinc[200],
    dark: twColors.zinc[800],
  },
  'zinc-1': {
    light: twColors.zinc[100],
    dark: twColors.zinc[900],
  },
  'zinc-0': {
    light: twColors.zinc[50],
    dark: twColors.zinc[950],
  },
  neutral: twColors.neutral[500],
  'neutral-4': {
    light: twColors.neutral[400],
    dark: twColors.neutral[600],
  },
  'neutral-3': {
    light: twColors.neutral[300],
    dark: twColors.neutral[700],
  },
  'neutral-2': {
    light: twColors.neutral[200],
    dark: twColors.neutral[800],
  },
  'neutral-1': {
    light: twColors.neutral[100],
    dark: twColors.neutral[900],
  },
  'neutral-0': {
    light: twColors.neutral[50],
    dark: twColors.neutral[950],
  },
  stone: twColors.stone[500],
  'stone-4': {
    light: twColors.stone[400],
    dark: twColors.stone[600],
  },
  'stone-3': {
    light: twColors.stone[300],
    dark: twColors.stone[700],
  },
  'stone-2': {
    light: twColors.stone[200],
    dark: twColors.stone[800],
  },
  'stone-1': {
    light: twColors.stone[100],
    dark: twColors.stone[900],
  },
  'stone-0': {
    light: twColors.stone[50],
    dark: twColors.stone[950],
  },
  red: twColors.red[500],
  'red-4': {
    light: twColors.red[400],
    dark: twColors.red[600],
  },
  'red-3': {
    light: twColors.red[300],
    dark: twColors.red[700],
  },
  'red-2': {
    light: twColors.red[200],
    dark: twColors.red[800],
  },
  'red-1': {
    light: twColors.red[100],
    dark: twColors.red[900],
  },
  'red-0': {
    light: twColors.red[50],
    dark: twColors.red[950],
  },
  orange: twColors.orange[500],
  'orange-4': {
    light: twColors.orange[400],
    dark: twColors.orange[600],
  },
  'orange-3': {
    light: twColors.orange[300],
    dark: twColors.orange[700],
  },
  'orange-2': {
    light: twColors.orange[200],
    dark: twColors.orange[800],
  },
  'orange-1': {
    light: twColors.orange[100],
    dark: twColors.orange[900],
  },
  'orange-0': {
    light: twColors.orange[50],
    dark: twColors.orange[950],
  },
  amber: twColors.amber[500],
  'amber-4': {
    light: twColors.amber[400],
    dark: twColors.amber[600],
  },
  'amber-3': {
    light: twColors.amber[300],
    dark: twColors.amber[700],
  },
  'amber-2': {
    light: twColors.amber[200],
    dark: twColors.amber[800],
  },
  'amber-1': {
    light: twColors.amber[100],
    dark: twColors.amber[900],
  },
  'amber-0': {
    light: twColors.amber[50],
    dark: twColors.amber[950],
  },
  yellow: twColors.yellow[500],
  'yellow-4': {
    light: twColors.yellow[400],
    dark: twColors.yellow[600],
  },
  'yellow-3': {
    light: twColors.yellow[300],
    dark: twColors.yellow[700],
  },
  'yellow-2': {
    light: twColors.yellow[200],
    dark: twColors.yellow[800],
  },
  'yellow-1': {
    light: twColors.yellow[100],
    dark: twColors.yellow[900],
  },
  'yellow-0': {
    light: twColors.yellow[50],
    dark: twColors.yellow[950],
  },
  lime: twColors.lime[500],
  'lime-4': {
    light: twColors.lime[400],
    dark: twColors.lime[600],
  },
  'lime-3': {
    light: twColors.lime[300],
    dark: twColors.lime[700],
  },
  'lime-2': {
    light: twColors.lime[200],
    dark: twColors.lime[800],
  },
  'lime-1': {
    light: twColors.lime[100],
    dark: twColors.lime[900],
  },
  'lime-0': {
    light: twColors.lime[50],
    dark: twColors.lime[950],
  },
  green: twColors.green[500],
  'green-4': {
    light: twColors.green[400],
    dark: twColors.green[600],
  },
  'green-3': {
    light: twColors.green[300],
    dark: twColors.green[700],
  },
  'green-2': {
    light: twColors.green[200],
    dark: twColors.green[800],
  },
  'green-1': {
    light: twColors.green[100],
    dark: twColors.green[900],
  },
  'green-0': {
    light: twColors.green[50],
    dark: twColors.green[950],
  },
  emerald: twColors.emerald[500],
  'emerald-4': {
    light: twColors.emerald[400],
    dark: twColors.emerald[600],
  },
  'emerald-3': {
    light: twColors.emerald[300],
    dark: twColors.emerald[700],
  },
  'emerald-2': {
    light: twColors.emerald[200],
    dark: twColors.emerald[800],
  },
  'emerald-1': {
    light: twColors.emerald[100],
    dark: twColors.emerald[900],
  },
  'emerald-0': {
    light: twColors.emerald[50],
    dark: twColors.emerald[950],
  },
  teal: twColors.teal[500],
  'teal-4': {
    light: twColors.teal[400],
    dark: twColors.teal[600],
  },
  'teal-3': {
    light: twColors.teal[300],
    dark: twColors.teal[700],
  },
  'teal-2': {
    light: twColors.teal[200],
    dark: twColors.teal[800],
  },
  'teal-1': {
    light: twColors.teal[100],
    dark: twColors.teal[900],
  },
  'teal-0': {
    light: twColors.teal[50],
    dark: twColors.teal[950],
  },
  cyan: twColors.cyan[500],
  'cyan-4': {
    light: twColors.cyan[400],
    dark: twColors.cyan[600],
  },
  'cyan-3': {
    light: twColors.cyan[300],
    dark: twColors.cyan[700],
  },
  'cyan-2': {
    light: twColors.cyan[200],
    dark: twColors.cyan[800],
  },
  'cyan-1': {
    light: twColors.cyan[100],
    dark: twColors.cyan[900],
  },
  'cyan-0': {
    light: twColors.cyan[50],
    dark: twColors.cyan[950],
  },
  sky: twColors.sky[500],
  'sky-4': {
    light: twColors.sky[400],
    dark: twColors.sky[600],
  },
  'sky-3': {
    light: twColors.sky[300],
    dark: twColors.sky[700],
  },
  'sky-2': {
    light: twColors.sky[200],
    dark: twColors.sky[800],
  },
  'sky-1': {
    light: twColors.sky[100],
    dark: twColors.sky[900],
  },
  'sky-0': {
    light: twColors.sky[50],
    dark: twColors.sky[950],
  },
  blue: twColors.blue[500],
  'blue-4': {
    light: twColors.blue[400],
    dark: twColors.blue[600],
  },
  'blue-3': {
    light: twColors.blue[300],
    dark: twColors.blue[700],
  },
  'blue-2': {
    light: twColors.blue[200],
    dark: twColors.blue[800],
  },
  'blue-1': {
    light: twColors.blue[100],
    dark: twColors.blue[900],
  },
  'blue-0': {
    light: twColors.blue[50],
    dark: twColors.blue[950],
  },
  indigo: twColors.indigo[500],
  'indigo-4': {
    light: twColors.indigo[400],
    dark: twColors.indigo[600],
  },
  'indigo-3': {
    light: twColors.indigo[300],
    dark: twColors.indigo[700],
  },
  'indigo-2': {
    light: twColors.indigo[200],
    dark: twColors.indigo[800],
  },
  'indigo-1': {
    light: twColors.indigo[100],
    dark: twColors.indigo[900],
  },
  'indigo-0': {
    light: twColors.indigo[50],
    dark: twColors.indigo[950],
  },
  violet: twColors.violet[500],
  'violet-4': {
    light: twColors.violet[400],
    dark: twColors.violet[600],
  },
  'violet-3': {
    light: twColors.violet[300],
    dark: twColors.violet[700],
  },
  'violet-2': {
    light: twColors.violet[200],
    dark: twColors.violet[800],
  },
  'violet-1': {
    light: twColors.violet[100],
    dark: twColors.violet[900],
  },
  'violet-0': {
    light: twColors.violet[50],
    dark: twColors.violet[950],
  },
  purple: twColors.purple[500],
  'purple-4': {
    light: twColors.purple[400],
    dark: twColors.purple[600],
  },
  'purple-3': {
    light: twColors.purple[300],
    dark: twColors.purple[700],
  },
  'purple-2': {
    light: twColors.purple[200],
    dark: twColors.purple[800],
  },
  'purple-1': {
    light: twColors.purple[100],
    dark: twColors.purple[900],
  },
  'purple-0': {
    light: twColors.purple[50],
    dark: twColors.purple[950],
  },
  fuchsia: twColors.fuchsia[500],
  'fuchsia-4': {
    light: twColors.fuchsia[400],
    dark: twColors.fuchsia[600],
  },
  'fuchsia-3': {
    light: twColors.fuchsia[300],
    dark: twColors.fuchsia[700],
  },
  'fuchsia-2': {
    light: twColors.fuchsia[200],
    dark: twColors.fuchsia[800],
  },
  'fuchsia-1': {
    light: twColors.fuchsia[100],
    dark: twColors.fuchsia[900],
  },
  'fuchsia-0': {
    light: twColors.fuchsia[50],
    dark: twColors.fuchsia[950],
  },
  pink: twColors.pink[500],
  'pink-4': {
    light: twColors.pink[400],
    dark: twColors.pink[600],
  },
  'pink-3': {
    light: twColors.pink[300],
    dark: twColors.pink[700],
  },
  'pink-2': {
    light: twColors.pink[200],
    dark: twColors.pink[800],
  },
  'pink-1': {
    light: twColors.pink[100],
    dark: twColors.pink[900],
  },
  'pink-0': {
    light: twColors.pink[50],
    dark: twColors.pink[950],
  },
  rose: twColors.rose[500],
  'rose-4': {
    light: twColors.rose[400],
    dark: twColors.rose[600],
  },
  'rose-3': {
    light: twColors.rose[300],
    dark: twColors.rose[700],
  },
  'rose-2': {
    light: twColors.rose[200],
    dark: twColors.rose[800],
  },
  'rose-1': {
    light: twColors.rose[100],
    dark: twColors.rose[900],
  },
  'rose-0': {
    light: twColors.rose[50],
    dark: twColors.rose[950],
  },
} as const;

export const utilities = {
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

export const components = {
  link: ['text', 'decoration'],
} as const;

export const themes = {
  red: {
    link: {
      text: 'red',
      decoration: 'red',
    },
  },
} as const;

export type Modes = typeof modes;
export type Mode = Modes[number];
export type Colors = typeof colors;
export type ColorName = keyof Colors;
export type ColorValue = Colors[ColorName];
export type ColorScheme = { light: string; dark: string };
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
