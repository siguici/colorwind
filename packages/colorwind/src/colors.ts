import colors from 'tailwindcss/colors';
import {
  type ComponentList,
  Plugin,
  type PropertyName,
  type PropertyOption,
  type PropertyValue,
  type RuleSet,
  type UtilityList,
} from './plugin';
import {
  append_style,
  darken_class,
  darken_utility,
  stylize_utility,
} from './utils';

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

export type ColorName = PropertyName;
export type ColorScheme = 'dark' | 'light';
export type ColorValue = string;
export type ColorVariant = Record<ColorScheme, ColorValue>;
export type ColorOption = ColorValue | ColorVariant;
export type ColorsConfig = {
  [key: ColorName]: ColorOption;
};

export const DEFAULT_COLORS: ColorsConfig = {
  pure: {
    light: colors.white,
    dark: colors.black,
  },
  slate: colors.slate[500],
  'slate-xs': {
    light: colors.slate[400],
    dark: colors.slate[600],
  },
  'slate-sm': {
    light: colors.slate[300],
    dark: colors.slate[700],
  },
  'slate-md': {
    light: colors.slate[200],
    dark: colors.slate[800],
  },
  'slate-lg': {
    light: colors.slate[100],
    dark: colors.slate[900],
  },
  'slate-xl': {
    light: colors.slate[50],
    dark: colors.slate[950],
  },
  gray: colors.gray[500],
  'gray-xs': {
    light: colors.gray[400],
    dark: colors.gray[600],
  },
  'gray-sm': {
    light: colors.gray[300],
    dark: colors.gray[700],
  },
  'gray-md': {
    light: colors.gray[200],
    dark: colors.gray[800],
  },
  'gray-lg': {
    light: colors.gray[100],
    dark: colors.gray[900],
  },
  'gray-xl': {
    light: colors.gray[50],
    dark: colors.gray[950],
  },
  zinc: colors.zinc[500],
  'zinc-xs': {
    light: colors.zinc[400],
    dark: colors.zinc[600],
  },
  'zinc-sm': {
    light: colors.zinc[300],
    dark: colors.zinc[700],
  },
  'zinc-md': {
    light: colors.zinc[200],
    dark: colors.zinc[800],
  },
  'zinc-lg': {
    light: colors.zinc[100],
    dark: colors.zinc[900],
  },
  'zinc-xl': {
    light: colors.zinc[50],
    dark: colors.zinc[950],
  },
  neutral: colors.neutral[500],
  'neutral-xs': {
    light: colors.neutral[400],
    dark: colors.neutral[600],
  },
  'neutral-sm': {
    light: colors.neutral[300],
    dark: colors.neutral[700],
  },
  'neutral-md': {
    light: colors.neutral[200],
    dark: colors.neutral[800],
  },
  'neutral-lg': {
    light: colors.neutral[100],
    dark: colors.neutral[900],
  },
  'neutral-xl': {
    light: colors.neutral[50],
    dark: colors.neutral[950],
  },
  stone: colors.stone[500],
  'stone-xs': {
    light: colors.stone[400],
    dark: colors.stone[600],
  },
  'stone-sm': {
    light: colors.stone[300],
    dark: colors.stone[700],
  },
  'stone-md': {
    light: colors.stone[200],
    dark: colors.stone[800],
  },
  'stone-lg': {
    light: colors.stone[100],
    dark: colors.stone[900],
  },
  'stone-xl': {
    light: colors.stone[50],
    dark: colors.stone[950],
  },
  red: colors.red[500],
  'red-xs': {
    light: colors.red[400],
    dark: colors.red[600],
  },
  'red-sm': {
    light: colors.red[300],
    dark: colors.red[700],
  },
  'red-md': {
    light: colors.red[200],
    dark: colors.red[800],
  },
  'red-lg': {
    light: colors.red[100],
    dark: colors.red[900],
  },
  'red-xl': {
    light: colors.red[50],
    dark: colors.red[950],
  },
  orange: colors.orange[500],
  'orange-xs': {
    light: colors.orange[400],
    dark: colors.orange[600],
  },
  'orange-sm': {
    light: colors.orange[300],
    dark: colors.orange[700],
  },
  'orange-md': {
    light: colors.orange[200],
    dark: colors.orange[800],
  },
  'orange-lg': {
    light: colors.orange[100],
    dark: colors.orange[900],
  },
  'orange-xl': {
    light: colors.orange[50],
    dark: colors.orange[950],
  },
  amber: colors.amber[500],
  'amber-xs': {
    light: colors.amber[400],
    dark: colors.amber[600],
  },
  'amber-sm': {
    light: colors.amber[300],
    dark: colors.amber[700],
  },
  'amber-md': {
    light: colors.amber[200],
    dark: colors.amber[800],
  },
  'amber-lg': {
    light: colors.amber[100],
    dark: colors.amber[900],
  },
  'amber-xl': {
    light: colors.amber[50],
    dark: colors.amber[950],
  },
  yellow: colors.yellow[500],
  'yellow-xs': {
    light: colors.yellow[400],
    dark: colors.yellow[600],
  },
  'yellow-sm': {
    light: colors.yellow[300],
    dark: colors.yellow[700],
  },
  'yellow-md': {
    light: colors.yellow[200],
    dark: colors.yellow[800],
  },
  'yellow-lg': {
    light: colors.yellow[100],
    dark: colors.yellow[900],
  },
  'yellow-xl': {
    light: colors.yellow[50],
    dark: colors.yellow[950],
  },
  lime: colors.lime[500],
  'lime-xs': {
    light: colors.lime[400],
    dark: colors.lime[600],
  },
  'lime-sm': {
    light: colors.lime[300],
    dark: colors.lime[700],
  },
  'lime-md': {
    light: colors.lime[200],
    dark: colors.lime[800],
  },
  'lime-lg': {
    light: colors.lime[100],
    dark: colors.lime[900],
  },
  'lime-xl': {
    light: colors.lime[50],
    dark: colors.lime[950],
  },
  green: colors.green[500],
  'green-xs': {
    light: colors.green[400],
    dark: colors.green[600],
  },
  'green-sm': {
    light: colors.green[300],
    dark: colors.green[700],
  },
  'green-md': {
    light: colors.green[200],
    dark: colors.green[800],
  },
  'green-lg': {
    light: colors.green[100],
    dark: colors.green[900],
  },
  'green-xl': {
    light: colors.green[50],
    dark: colors.green[950],
  },
  emerald: colors.emerald[500],
  'emerald-xs': {
    light: colors.emerald[400],
    dark: colors.emerald[600],
  },
  'emerald-sm': {
    light: colors.emerald[300],
    dark: colors.emerald[700],
  },
  'emerald-md': {
    light: colors.emerald[200],
    dark: colors.emerald[800],
  },
  'emerald-lg': {
    light: colors.emerald[100],
    dark: colors.emerald[900],
  },
  'emerald-xl': {
    light: colors.emerald[50],
    dark: colors.emerald[950],
  },
  teal: colors.teal[500],
  'teal-xs': {
    light: colors.teal[400],
    dark: colors.teal[600],
  },
  'teal-sm': {
    light: colors.teal[300],
    dark: colors.teal[700],
  },
  'teal-md': {
    light: colors.teal[200],
    dark: colors.teal[800],
  },
  'teal-lg': {
    light: colors.teal[100],
    dark: colors.teal[900],
  },
  'teal-xl': {
    light: colors.teal[50],
    dark: colors.teal[950],
  },
  cyan: colors.cyan[500],
  'cyan-xs': {
    light: colors.cyan[400],
    dark: colors.cyan[600],
  },
  'cyan-sm': {
    light: colors.cyan[300],
    dark: colors.cyan[700],
  },
  'cyan-md': {
    light: colors.cyan[200],
    dark: colors.cyan[800],
  },
  'cyan-lg': {
    light: colors.cyan[100],
    dark: colors.cyan[900],
  },
  'cyan-xl': {
    light: colors.cyan[50],
    dark: colors.cyan[950],
  },
  sky: colors.sky[500],
  'sky-xs': {
    light: colors.sky[400],
    dark: colors.sky[600],
  },
  'sky-sm': {
    light: colors.sky[300],
    dark: colors.sky[700],
  },
  'sky-md': {
    light: colors.sky[200],
    dark: colors.sky[800],
  },
  'sky-lg': {
    light: colors.sky[100],
    dark: colors.sky[900],
  },
  'sky-xl': {
    light: colors.sky[50],
    dark: colors.sky[950],
  },
  blue: colors.blue[500],
  'blue-xs': {
    light: colors.blue[400],
    dark: colors.blue[600],
  },
  'blue-sm': {
    light: colors.blue[300],
    dark: colors.blue[700],
  },
  'blue-md': {
    light: colors.blue[200],
    dark: colors.blue[800],
  },
  'blue-lg': {
    light: colors.blue[100],
    dark: colors.blue[900],
  },
  'blue-xl': {
    light: colors.blue[50],
    dark: colors.blue[950],
  },
  indigo: colors.indigo[500],
  'indigo-xs': {
    light: colors.indigo[400],
    dark: colors.indigo[600],
  },
  'indigo-sm': {
    light: colors.indigo[300],
    dark: colors.indigo[700],
  },
  'indigo-md': {
    light: colors.indigo[200],
    dark: colors.indigo[800],
  },
  'indigo-lg': {
    light: colors.indigo[100],
    dark: colors.indigo[900],
  },
  'indigo-xl': {
    light: colors.indigo[50],
    dark: colors.indigo[950],
  },
  violet: colors.violet[500],
  'violet-xs': {
    light: colors.violet[400],
    dark: colors.violet[600],
  },
  'violet-sm': {
    light: colors.violet[300],
    dark: colors.violet[700],
  },
  'violet-md': {
    light: colors.violet[200],
    dark: colors.violet[800],
  },
  'violet-lg': {
    light: colors.violet[100],
    dark: colors.violet[900],
  },
  'violet-xl': {
    light: colors.violet[50],
    dark: colors.violet[950],
  },
  purple: colors.purple[500],
  'purple-xs': {
    light: colors.purple[400],
    dark: colors.purple[600],
  },
  'purple-sm': {
    light: colors.purple[300],
    dark: colors.purple[700],
  },
  'purple-md': {
    light: colors.purple[200],
    dark: colors.purple[800],
  },
  'purple-lg': {
    light: colors.purple[100],
    dark: colors.purple[900],
  },
  'purple-xl': {
    light: colors.purple[50],
    dark: colors.purple[950],
  },
  fuchsia: colors.fuchsia[500],
  'fuchsia-xs': {
    light: colors.fuchsia[400],
    dark: colors.fuchsia[600],
  },
  'fuchsia-sm': {
    light: colors.fuchsia[300],
    dark: colors.fuchsia[700],
  },
  'fuchsia-md': {
    light: colors.fuchsia[200],
    dark: colors.fuchsia[800],
  },
  'fuchsia-lg': {
    light: colors.fuchsia[100],
    dark: colors.fuchsia[900],
  },
  'fuchsia-xl': {
    light: colors.fuchsia[50],
    dark: colors.fuchsia[950],
  },
  pink: colors.pink[500],
  'pink-xs': {
    light: colors.pink[400],
    dark: colors.pink[600],
  },
  'pink-sm': {
    light: colors.pink[300],
    dark: colors.pink[700],
  },
  'pink-md': {
    light: colors.pink[200],
    dark: colors.pink[800],
  },
  'pink-lg': {
    light: colors.pink[100],
    dark: colors.pink[900],
  },
  'pink-xl': {
    light: colors.pink[50],
    dark: colors.pink[950],
  },
  rose: colors.rose[500],
  'rose-xs': {
    light: colors.rose[400],
    dark: colors.rose[600],
  },
  'rose-sm': {
    light: colors.rose[300],
    dark: colors.rose[700],
  },
  'rose-md': {
    light: colors.rose[200],
    dark: colors.rose[800],
  },
  'rose-lg': {
    light: colors.rose[100],
    dark: colors.rose[900],
  },
  'rose-xl': {
    light: colors.rose[50],
    dark: colors.rose[950],
  },
};

export class Colors extends Plugin<ColorsConfig> {
  readonly components: ComponentList = {
    link: ['text', 'decoration'],

    entry: ['text', 'caret', 'border'],

    choice: ['accent'],

    button: {
      DEFAULT: ['bg'],
      link: ['text', 'decoration'],
      ring: ['text', 'ring'],
      bordered: ['text', 'border'],
      outlined: ['text', 'outline'],
    },
  };

  readonly utilities: UtilityList = {
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

  public create(): this {
    for (const color of Object.entries(this.options)) {
      this.addColor(color[0], color[1]);
    }
    return this;
  }

  public addColor(name: ColorName, color: ColorOption): this {
    return this.addColorComponents(name, color).addColorUtilities(name, color);
  }

  public addColorComponents(name: ColorName, color: ColorOption): this {
    return this.addComponents(this.stylizeColorComponents(name, color));
  }

  public addColorUtilities(name: ColorName, color: ColorOption): this {
    return this.addUtilities(this.stylizeColorUtility(name, color));
  }

  public stylizeColorComponents(
    name: ColorName,
    color: ColorOption,
  ): RuleSet[] {
    const { e } = this.api;
    const rules: RuleSet[] = [];
    for (const component of Object.entries(this.components)) {
      const componentName = `${component[0]}-${name}`;
      const utilities = component[1];
      let rule: RuleSet = {};

      if (typeof utilities === 'string') {
        rule =
          typeof color === 'string'
            ? {
                [`.${componentName}`]: this.stylizeUtility(utilities, color),
              }
            : darken_class(
                this.darkMode,
                componentName,
                this.stylizeUtility(utilities, color.light),
                this.stylizeUtility(utilities, color.dark),
              );
      } else if (Array.isArray(utilities)) {
        rule =
          typeof color === 'string'
            ? {
                [`.${componentName}`]: this.stylizeUtilities(utilities, color),
              }
            : darken_class(
                this.darkMode,
                componentName,
                this.stylizeUtilities(utilities, color.light),
                this.stylizeUtilities(utilities, color.dark),
              );
      } else {
        for (const utility of Object.entries(utilities)) {
          const utilityName =
            utility[0] === 'DEFAULT'
              ? componentName
              : `${componentName}-${e(utility[0])}`;
          const properties = utility[1];
          if (typeof properties === 'string') {
            if (typeof color === 'string') {
              rule[`.${utilityName}`] = this.stylizeUtility(properties, color);
            } else {
              rule = append_style(
                darken_class(
                  this.darkMode,
                  utilityName,
                  this.stylizeUtility(properties, color.light),
                  this.stylizeUtility(properties, color.dark),
                ),
                rule,
              );
            }
          } else {
            if (typeof color === 'string') {
              rule[`.${utilityName}`] = this.stylizeUtilities(
                properties,
                color,
              );
            } else {
              rule = append_style(
                darken_class(
                  this.darkMode,
                  utilityName,
                  this.stylizeUtilities(properties, color.light),
                  this.stylizeUtilities(properties, color.dark),
                ),
                rule,
              );
            }
          }
          rules.push(rule);
        }
      }
    }
    return rules;
  }

  public stylizeColorUtility(name: string, color: ColorOption): RuleSet {
    const { e } = this.api;
    return typeof color === 'string'
      ? stylize_utility(this.utilities, e(name), color)
      : darken_utility(
          this.darkMode,
          this.utilities,
          e(name),
          color.light,
          color.dark,
        );
  }
}
