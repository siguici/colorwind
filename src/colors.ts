import colors from "tailwindcss/colors";
import {
  type ComponentList,
  Plugin,
  type PropertyName,
  type PropertyOption,
  type PropertyValue,
  type RuleSet,
  type UtilityList,
} from "./plugin";
import {
  append_style,
  darken_class,
  darken_utility,
  stylize_utility,
} from "./utils";

export type ColorName = PropertyName;
export type ColorScheme = "dark" | "light";
export type ColorValue = PropertyValue;
export type ColorOption = PropertyOption<ColorScheme>;
export type ColorsConfig = {
  [key: ColorName]: ColorOption;
};

export const common_colors = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50],
};

const custom_colors: ColorsConfig = {};

for (const color of Object.entries(common_colors)) {
  const rgb_color = color[1];
  custom_colors[color[0]] =
    `rgb(${rgb_color[0]},${rgb_color[1]},${rgb_color[2]})`;
}

export const DEFAULT_COLORS: ColorsConfig = {
  ...custom_colors,
  pure: {
    light: colors.white,
    dark: colors.black,
  },
  slate: colors.slate[500],
  "slate-xs": {
    light: colors.slate[400],
    dark: colors.slate[600],
  },
  "slate-sm": {
    light: colors.slate[300],
    dark: colors.slate[700],
  },
  "slate-md": {
    light: colors.slate[200],
    dark: colors.slate[800],
  },
  "slate-lg": {
    light: colors.slate[100],
    dark: colors.slate[900],
  },
  "slate-xl": {
    light: colors.slate[50],
    dark: colors.slate[950],
  },
  gray: colors.gray[500],
  "gray-xs": {
    light: colors.gray[400],
    dark: colors.gray[600],
  },
  "gray-sm": {
    light: colors.gray[300],
    dark: colors.gray[700],
  },
  "gray-md": {
    light: colors.gray[200],
    dark: colors.gray[800],
  },
  "gray-lg": {
    light: colors.gray[100],
    dark: colors.gray[900],
  },
  "gray-xl": {
    light: colors.gray[50],
    dark: colors.gray[950],
  },
  zinc: colors.zinc[500],
  "zinc-xs": {
    light: colors.zinc[400],
    dark: colors.zinc[600],
  },
  "zinc-sm": {
    light: colors.zinc[300],
    dark: colors.zinc[700],
  },
  "zinc-md": {
    light: colors.zinc[200],
    dark: colors.zinc[800],
  },
  "zinc-lg": {
    light: colors.zinc[100],
    dark: colors.zinc[900],
  },
  "zinc-xl": {
    light: colors.zinc[50],
    dark: colors.zinc[950],
  },
  neutral: colors.neutral[500],
  "neutral-xs": {
    light: colors.neutral[400],
    dark: colors.neutral[600],
  },
  "neutral-sm": {
    light: colors.neutral[300],
    dark: colors.neutral[700],
  },
  "neutral-md": {
    light: colors.neutral[200],
    dark: colors.neutral[800],
  },
  "neutral-lg": {
    light: colors.neutral[100],
    dark: colors.neutral[900],
  },
  "neutral-xl": {
    light: colors.neutral[50],
    dark: colors.neutral[950],
  },
  stone: colors.stone[500],
  "stone-xs": {
    light: colors.stone[400],
    dark: colors.stone[600],
  },
  "stone-sm": {
    light: colors.stone[300],
    dark: colors.stone[700],
  },
  "stone-md": {
    light: colors.stone[200],
    dark: colors.stone[800],
  },
  "stone-lg": {
    light: colors.stone[100],
    dark: colors.stone[900],
  },
  "stone-xl": {
    light: colors.stone[50],
    dark: colors.stone[950],
  },
  red: colors.red[500],
  "red-xs": {
    light: colors.red[400],
    dark: colors.red[600],
  },
  "red-sm": {
    light: colors.red[300],
    dark: colors.red[700],
  },
  "red-md": {
    light: colors.red[200],
    dark: colors.red[800],
  },
  "red-lg": {
    light: colors.red[100],
    dark: colors.red[900],
  },
  "red-xl": {
    light: colors.red[50],
    dark: colors.red[950],
  },
  orange: colors.orange[500],
  "orange-xs": {
    light: colors.orange[400],
    dark: colors.orange[600],
  },
  "orange-sm": {
    light: colors.orange[300],
    dark: colors.orange[700],
  },
  "orange-md": {
    light: colors.orange[200],
    dark: colors.orange[800],
  },
  "orange-lg": {
    light: colors.orange[100],
    dark: colors.orange[900],
  },
  "orange-xl": {
    light: colors.orange[50],
    dark: colors.orange[950],
  },
  amber: colors.amber[500],
  "amber-xs": {
    light: colors.amber[400],
    dark: colors.amber[600],
  },
  "amber-sm": {
    light: colors.amber[300],
    dark: colors.amber[700],
  },
  "amber-md": {
    light: colors.amber[200],
    dark: colors.amber[800],
  },
  "amber-lg": {
    light: colors.amber[100],
    dark: colors.amber[900],
  },
  "amber-xl": {
    light: colors.amber[50],
    dark: colors.amber[950],
  },
  yellow: colors.yellow[500],
  "yellow-xs": {
    light: colors.yellow[400],
    dark: colors.yellow[600],
  },
  "yellow-sm": {
    light: colors.yellow[300],
    dark: colors.yellow[700],
  },
  "yellow-md": {
    light: colors.yellow[200],
    dark: colors.yellow[800],
  },
  "yellow-lg": {
    light: colors.yellow[100],
    dark: colors.yellow[900],
  },
  "yellow-xl": {
    light: colors.yellow[50],
    dark: colors.yellow[950],
  },
  lime: colors.lime[500],
  "lime-xs": {
    light: colors.lime[400],
    dark: colors.lime[600],
  },
  "lime-sm": {
    light: colors.lime[300],
    dark: colors.lime[700],
  },
  "lime-md": {
    light: colors.lime[200],
    dark: colors.lime[800],
  },
  "lime-lg": {
    light: colors.lime[100],
    dark: colors.lime[900],
  },
  "lime-xl": {
    light: colors.lime[50],
    dark: colors.lime[950],
  },
  green: colors.green[500],
  "green-xs": {
    light: colors.green[400],
    dark: colors.green[600],
  },
  "green-sm": {
    light: colors.green[300],
    dark: colors.green[700],
  },
  "green-md": {
    light: colors.green[200],
    dark: colors.green[800],
  },
  "green-lg": {
    light: colors.green[100],
    dark: colors.green[900],
  },
  "green-xl": {
    light: colors.green[50],
    dark: colors.green[950],
  },
  emerald: colors.emerald[500],
  "emerald-xs": {
    light: colors.emerald[400],
    dark: colors.emerald[600],
  },
  "emerald-sm": {
    light: colors.emerald[300],
    dark: colors.emerald[700],
  },
  "emerald-md": {
    light: colors.emerald[200],
    dark: colors.emerald[800],
  },
  "emerald-lg": {
    light: colors.emerald[100],
    dark: colors.emerald[900],
  },
  "emerald-xl": {
    light: colors.emerald[50],
    dark: colors.emerald[950],
  },
  teal: colors.teal[500],
  "teal-xs": {
    light: colors.teal[400],
    dark: colors.teal[600],
  },
  "teal-sm": {
    light: colors.teal[300],
    dark: colors.teal[700],
  },
  "teal-md": {
    light: colors.teal[200],
    dark: colors.teal[800],
  },
  "teal-lg": {
    light: colors.teal[100],
    dark: colors.teal[900],
  },
  "teal-xl": {
    light: colors.teal[50],
    dark: colors.teal[950],
  },
  cyan: colors.cyan[500],
  "cyan-xs": {
    light: colors.cyan[400],
    dark: colors.cyan[600],
  },
  "cyan-sm": {
    light: colors.cyan[300],
    dark: colors.cyan[700],
  },
  "cyan-md": {
    light: colors.cyan[200],
    dark: colors.cyan[800],
  },
  "cyan-lg": {
    light: colors.cyan[100],
    dark: colors.cyan[900],
  },
  "cyan-xl": {
    light: colors.cyan[50],
    dark: colors.cyan[950],
  },
  sky: colors.sky[500],
  "sky-xs": {
    light: colors.sky[400],
    dark: colors.sky[600],
  },
  "sky-sm": {
    light: colors.sky[300],
    dark: colors.sky[700],
  },
  "sky-md": {
    light: colors.sky[200],
    dark: colors.sky[800],
  },
  "sky-lg": {
    light: colors.sky[100],
    dark: colors.sky[900],
  },
  "sky-xl": {
    light: colors.sky[50],
    dark: colors.sky[950],
  },
  blue: colors.blue[500],
  "blue-xs": {
    light: colors.blue[400],
    dark: colors.blue[600],
  },
  "blue-sm": {
    light: colors.blue[300],
    dark: colors.blue[700],
  },
  "blue-md": {
    light: colors.blue[200],
    dark: colors.blue[800],
  },
  "blue-lg": {
    light: colors.blue[100],
    dark: colors.blue[900],
  },
  "blue-xl": {
    light: colors.blue[50],
    dark: colors.blue[950],
  },
  indigo: colors.indigo[500],
  "indigo-xs": {
    light: colors.indigo[400],
    dark: colors.indigo[600],
  },
  "indigo-sm": {
    light: colors.indigo[300],
    dark: colors.indigo[700],
  },
  "indigo-md": {
    light: colors.indigo[200],
    dark: colors.indigo[800],
  },
  "indigo-lg": {
    light: colors.indigo[100],
    dark: colors.indigo[900],
  },
  "indigo-xl": {
    light: colors.indigo[50],
    dark: colors.indigo[950],
  },
  violet: colors.violet[500],
  "violet-xs": {
    light: colors.violet[400],
    dark: colors.violet[600],
  },
  "violet-sm": {
    light: colors.violet[300],
    dark: colors.violet[700],
  },
  "violet-md": {
    light: colors.violet[200],
    dark: colors.violet[800],
  },
  "violet-lg": {
    light: colors.violet[100],
    dark: colors.violet[900],
  },
  "violet-xl": {
    light: colors.violet[50],
    dark: colors.violet[950],
  },
  purple: colors.purple[500],
  "purple-xs": {
    light: colors.purple[400],
    dark: colors.purple[600],
  },
  "purple-sm": {
    light: colors.purple[300],
    dark: colors.purple[700],
  },
  "purple-md": {
    light: colors.purple[200],
    dark: colors.purple[800],
  },
  "purple-lg": {
    light: colors.purple[100],
    dark: colors.purple[900],
  },
  "purple-xl": {
    light: colors.purple[50],
    dark: colors.purple[950],
  },
  fuchsia: colors.fuchsia[500],
  "fuchsia-xs": {
    light: colors.fuchsia[400],
    dark: colors.fuchsia[600],
  },
  "fuchsia-sm": {
    light: colors.fuchsia[300],
    dark: colors.fuchsia[700],
  },
  "fuchsia-md": {
    light: colors.fuchsia[200],
    dark: colors.fuchsia[800],
  },
  "fuchsia-lg": {
    light: colors.fuchsia[100],
    dark: colors.fuchsia[900],
  },
  "fuchsia-xl": {
    light: colors.fuchsia[50],
    dark: colors.fuchsia[950],
  },
  pink: colors.pink[500],
  "pink-xs": {
    light: colors.pink[400],
    dark: colors.pink[600],
  },
  "pink-sm": {
    light: colors.pink[300],
    dark: colors.pink[700],
  },
  "pink-md": {
    light: colors.pink[200],
    dark: colors.pink[800],
  },
  "pink-lg": {
    light: colors.pink[100],
    dark: colors.pink[900],
  },
  "pink-xl": {
    light: colors.pink[50],
    dark: colors.pink[950],
  },
  rose: colors.rose[500],
  "rose-xs": {
    light: colors.rose[400],
    dark: colors.rose[600],
  },
  "rose-sm": {
    light: colors.rose[300],
    dark: colors.rose[700],
  },
  "rose-md": {
    light: colors.rose[200],
    dark: colors.rose[800],
  },
  "rose-lg": {
    light: colors.rose[100],
    dark: colors.rose[900],
  },
  "rose-xl": {
    light: colors.rose[50],
    dark: colors.rose[950],
  },
};

export class Colors extends Plugin<ColorsConfig> {
  readonly components: ComponentList = {
    link: ["text", "decoration"],

    entry: ["text", "caret", "border"],

    choice: ["accent"],

    button: {
      DEFAULT: ["bg"],
      link: ["text", "decoration"],
      ring: ["text", "ring"],
      bordered: ["text", "border"],
      outlined: ["text", "outline"],
    },
  };

  readonly utilities: UtilityList = {
    text: "color",
    bg: "background-color",
    decoration: "text-decoration-color",
    border: "border-color",
    outline: "outline-color",
    accent: "accent-color",
    caret: "caret-color",
    divide: "border-color",
    fill: "fill",
    stroke: "stroke",
    shadow: "--tw-shadow-color",
    ring: "--tw-ring-color",
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

      if (typeof utilities === "string") {
        rule =
          typeof color === "string"
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
          typeof color === "string"
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
            utility[0] === "DEFAULT"
              ? componentName
              : `${componentName}-${e(utility[0])}`;
          const properties = utility[1];
          if (typeof properties === "string") {
            if (typeof color === "string") {
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
            if (typeof color === "string") {
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
    return typeof color === "string"
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
