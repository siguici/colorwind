import tailwind from 'tailwindcss/colors';

export { default as tailwind } from 'tailwindcss/colors';

export const css = {
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

export type ColorName = string;
export type ColorScheme = 'dark' | 'light';
export type ColorValue = string;
export type ColorVariant = Record<ColorScheme, ColorValue>;
export type ColorOption = ColorValue | ColorVariant;
export type ColorsConfig = {
  [key: ColorName]: ColorOption;
};

const colors = {
  pure: {
    light: tailwind.white,
    dark: tailwind.black,
  },
  slate: tailwind.slate[500],
  'slate-xs': {
    light: tailwind.slate[400],
    dark: tailwind.slate[600],
  },
  'slate-sm': {
    light: tailwind.slate[300],
    dark: tailwind.slate[700],
  },
  'slate-md': {
    light: tailwind.slate[200],
    dark: tailwind.slate[800],
  },
  'slate-lg': {
    light: tailwind.slate[100],
    dark: tailwind.slate[900],
  },
  'slate-xl': {
    light: tailwind.slate[50],
    dark: tailwind.slate[950],
  },
  gray: tailwind.gray[500],
  'gray-xs': {
    light: tailwind.gray[400],
    dark: tailwind.gray[600],
  },
  'gray-sm': {
    light: tailwind.gray[300],
    dark: tailwind.gray[700],
  },
  'gray-md': {
    light: tailwind.gray[200],
    dark: tailwind.gray[800],
  },
  'gray-lg': {
    light: tailwind.gray[100],
    dark: tailwind.gray[900],
  },
  'gray-xl': {
    light: tailwind.gray[50],
    dark: tailwind.gray[950],
  },
  zinc: tailwind.zinc[500],
  'zinc-xs': {
    light: tailwind.zinc[400],
    dark: tailwind.zinc[600],
  },
  'zinc-sm': {
    light: tailwind.zinc[300],
    dark: tailwind.zinc[700],
  },
  'zinc-md': {
    light: tailwind.zinc[200],
    dark: tailwind.zinc[800],
  },
  'zinc-lg': {
    light: tailwind.zinc[100],
    dark: tailwind.zinc[900],
  },
  'zinc-xl': {
    light: tailwind.zinc[50],
    dark: tailwind.zinc[950],
  },
  neutral: tailwind.neutral[500],
  'neutral-xs': {
    light: tailwind.neutral[400],
    dark: tailwind.neutral[600],
  },
  'neutral-sm': {
    light: tailwind.neutral[300],
    dark: tailwind.neutral[700],
  },
  'neutral-md': {
    light: tailwind.neutral[200],
    dark: tailwind.neutral[800],
  },
  'neutral-lg': {
    light: tailwind.neutral[100],
    dark: tailwind.neutral[900],
  },
  'neutral-xl': {
    light: tailwind.neutral[50],
    dark: tailwind.neutral[950],
  },
  stone: tailwind.stone[500],
  'stone-xs': {
    light: tailwind.stone[400],
    dark: tailwind.stone[600],
  },
  'stone-sm': {
    light: tailwind.stone[300],
    dark: tailwind.stone[700],
  },
  'stone-md': {
    light: tailwind.stone[200],
    dark: tailwind.stone[800],
  },
  'stone-lg': {
    light: tailwind.stone[100],
    dark: tailwind.stone[900],
  },
  'stone-xl': {
    light: tailwind.stone[50],
    dark: tailwind.stone[950],
  },
  red: tailwind.red[500],
  'red-xs': {
    light: tailwind.red[400],
    dark: tailwind.red[600],
  },
  'red-sm': {
    light: tailwind.red[300],
    dark: tailwind.red[700],
  },
  'red-md': {
    light: tailwind.red[200],
    dark: tailwind.red[800],
  },
  'red-lg': {
    light: tailwind.red[100],
    dark: tailwind.red[900],
  },
  'red-xl': {
    light: tailwind.red[50],
    dark: tailwind.red[950],
  },
  orange: tailwind.orange[500],
  'orange-xs': {
    light: tailwind.orange[400],
    dark: tailwind.orange[600],
  },
  'orange-sm': {
    light: tailwind.orange[300],
    dark: tailwind.orange[700],
  },
  'orange-md': {
    light: tailwind.orange[200],
    dark: tailwind.orange[800],
  },
  'orange-lg': {
    light: tailwind.orange[100],
    dark: tailwind.orange[900],
  },
  'orange-xl': {
    light: tailwind.orange[50],
    dark: tailwind.orange[950],
  },
  amber: tailwind.amber[500],
  'amber-xs': {
    light: tailwind.amber[400],
    dark: tailwind.amber[600],
  },
  'amber-sm': {
    light: tailwind.amber[300],
    dark: tailwind.amber[700],
  },
  'amber-md': {
    light: tailwind.amber[200],
    dark: tailwind.amber[800],
  },
  'amber-lg': {
    light: tailwind.amber[100],
    dark: tailwind.amber[900],
  },
  'amber-xl': {
    light: tailwind.amber[50],
    dark: tailwind.amber[950],
  },
  yellow: tailwind.yellow[500],
  'yellow-xs': {
    light: tailwind.yellow[400],
    dark: tailwind.yellow[600],
  },
  'yellow-sm': {
    light: tailwind.yellow[300],
    dark: tailwind.yellow[700],
  },
  'yellow-md': {
    light: tailwind.yellow[200],
    dark: tailwind.yellow[800],
  },
  'yellow-lg': {
    light: tailwind.yellow[100],
    dark: tailwind.yellow[900],
  },
  'yellow-xl': {
    light: tailwind.yellow[50],
    dark: tailwind.yellow[950],
  },
  lime: tailwind.lime[500],
  'lime-xs': {
    light: tailwind.lime[400],
    dark: tailwind.lime[600],
  },
  'lime-sm': {
    light: tailwind.lime[300],
    dark: tailwind.lime[700],
  },
  'lime-md': {
    light: tailwind.lime[200],
    dark: tailwind.lime[800],
  },
  'lime-lg': {
    light: tailwind.lime[100],
    dark: tailwind.lime[900],
  },
  'lime-xl': {
    light: tailwind.lime[50],
    dark: tailwind.lime[950],
  },
  green: tailwind.green[500],
  'green-xs': {
    light: tailwind.green[400],
    dark: tailwind.green[600],
  },
  'green-sm': {
    light: tailwind.green[300],
    dark: tailwind.green[700],
  },
  'green-md': {
    light: tailwind.green[200],
    dark: tailwind.green[800],
  },
  'green-lg': {
    light: tailwind.green[100],
    dark: tailwind.green[900],
  },
  'green-xl': {
    light: tailwind.green[50],
    dark: tailwind.green[950],
  },
  emerald: tailwind.emerald[500],
  'emerald-xs': {
    light: tailwind.emerald[400],
    dark: tailwind.emerald[600],
  },
  'emerald-sm': {
    light: tailwind.emerald[300],
    dark: tailwind.emerald[700],
  },
  'emerald-md': {
    light: tailwind.emerald[200],
    dark: tailwind.emerald[800],
  },
  'emerald-lg': {
    light: tailwind.emerald[100],
    dark: tailwind.emerald[900],
  },
  'emerald-xl': {
    light: tailwind.emerald[50],
    dark: tailwind.emerald[950],
  },
  teal: tailwind.teal[500],
  'teal-xs': {
    light: tailwind.teal[400],
    dark: tailwind.teal[600],
  },
  'teal-sm': {
    light: tailwind.teal[300],
    dark: tailwind.teal[700],
  },
  'teal-md': {
    light: tailwind.teal[200],
    dark: tailwind.teal[800],
  },
  'teal-lg': {
    light: tailwind.teal[100],
    dark: tailwind.teal[900],
  },
  'teal-xl': {
    light: tailwind.teal[50],
    dark: tailwind.teal[950],
  },
  cyan: tailwind.cyan[500],
  'cyan-xs': {
    light: tailwind.cyan[400],
    dark: tailwind.cyan[600],
  },
  'cyan-sm': {
    light: tailwind.cyan[300],
    dark: tailwind.cyan[700],
  },
  'cyan-md': {
    light: tailwind.cyan[200],
    dark: tailwind.cyan[800],
  },
  'cyan-lg': {
    light: tailwind.cyan[100],
    dark: tailwind.cyan[900],
  },
  'cyan-xl': {
    light: tailwind.cyan[50],
    dark: tailwind.cyan[950],
  },
  sky: tailwind.sky[500],
  'sky-xs': {
    light: tailwind.sky[400],
    dark: tailwind.sky[600],
  },
  'sky-sm': {
    light: tailwind.sky[300],
    dark: tailwind.sky[700],
  },
  'sky-md': {
    light: tailwind.sky[200],
    dark: tailwind.sky[800],
  },
  'sky-lg': {
    light: tailwind.sky[100],
    dark: tailwind.sky[900],
  },
  'sky-xl': {
    light: tailwind.sky[50],
    dark: tailwind.sky[950],
  },
  blue: tailwind.blue[500],
  'blue-xs': {
    light: tailwind.blue[400],
    dark: tailwind.blue[600],
  },
  'blue-sm': {
    light: tailwind.blue[300],
    dark: tailwind.blue[700],
  },
  'blue-md': {
    light: tailwind.blue[200],
    dark: tailwind.blue[800],
  },
  'blue-lg': {
    light: tailwind.blue[100],
    dark: tailwind.blue[900],
  },
  'blue-xl': {
    light: tailwind.blue[50],
    dark: tailwind.blue[950],
  },
  indigo: tailwind.indigo[500],
  'indigo-xs': {
    light: tailwind.indigo[400],
    dark: tailwind.indigo[600],
  },
  'indigo-sm': {
    light: tailwind.indigo[300],
    dark: tailwind.indigo[700],
  },
  'indigo-md': {
    light: tailwind.indigo[200],
    dark: tailwind.indigo[800],
  },
  'indigo-lg': {
    light: tailwind.indigo[100],
    dark: tailwind.indigo[900],
  },
  'indigo-xl': {
    light: tailwind.indigo[50],
    dark: tailwind.indigo[950],
  },
  violet: tailwind.violet[500],
  'violet-xs': {
    light: tailwind.violet[400],
    dark: tailwind.violet[600],
  },
  'violet-sm': {
    light: tailwind.violet[300],
    dark: tailwind.violet[700],
  },
  'violet-md': {
    light: tailwind.violet[200],
    dark: tailwind.violet[800],
  },
  'violet-lg': {
    light: tailwind.violet[100],
    dark: tailwind.violet[900],
  },
  'violet-xl': {
    light: tailwind.violet[50],
    dark: tailwind.violet[950],
  },
  purple: tailwind.purple[500],
  'purple-xs': {
    light: tailwind.purple[400],
    dark: tailwind.purple[600],
  },
  'purple-sm': {
    light: tailwind.purple[300],
    dark: tailwind.purple[700],
  },
  'purple-md': {
    light: tailwind.purple[200],
    dark: tailwind.purple[800],
  },
  'purple-lg': {
    light: tailwind.purple[100],
    dark: tailwind.purple[900],
  },
  'purple-xl': {
    light: tailwind.purple[50],
    dark: tailwind.purple[950],
  },
  fuchsia: tailwind.fuchsia[500],
  'fuchsia-xs': {
    light: tailwind.fuchsia[400],
    dark: tailwind.fuchsia[600],
  },
  'fuchsia-sm': {
    light: tailwind.fuchsia[300],
    dark: tailwind.fuchsia[700],
  },
  'fuchsia-md': {
    light: tailwind.fuchsia[200],
    dark: tailwind.fuchsia[800],
  },
  'fuchsia-lg': {
    light: tailwind.fuchsia[100],
    dark: tailwind.fuchsia[900],
  },
  'fuchsia-xl': {
    light: tailwind.fuchsia[50],
    dark: tailwind.fuchsia[950],
  },
  pink: tailwind.pink[500],
  'pink-xs': {
    light: tailwind.pink[400],
    dark: tailwind.pink[600],
  },
  'pink-sm': {
    light: tailwind.pink[300],
    dark: tailwind.pink[700],
  },
  'pink-md': {
    light: tailwind.pink[200],
    dark: tailwind.pink[800],
  },
  'pink-lg': {
    light: tailwind.pink[100],
    dark: tailwind.pink[900],
  },
  'pink-xl': {
    light: tailwind.pink[50],
    dark: tailwind.pink[950],
  },
  rose: tailwind.rose[500],
  'rose-xs': {
    light: tailwind.rose[400],
    dark: tailwind.rose[600],
  },
  'rose-sm': {
    light: tailwind.rose[300],
    dark: tailwind.rose[700],
  },
  'rose-md': {
    light: tailwind.rose[200],
    dark: tailwind.rose[800],
  },
  'rose-lg': {
    light: tailwind.rose[100],
    dark: tailwind.rose[900],
  },
  'rose-xl': {
    light: tailwind.rose[50],
    dark: tailwind.rose[950],
  },
} as const satisfies ColorsConfig;

export default colors;
