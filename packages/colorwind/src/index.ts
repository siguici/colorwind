import plugin from 'tailwindcss/plugin';
import type { PluginAPI } from 'tailwindcss/types/config';
import DEFAULT_COLORS, {
  type ColorsConfig,
  type ColorOption,
  type ColorName,
} from './colors';
import {
  type ComponentList,
  Plugin,
  type PluginConfig,
  type PluginWithOptions,
  type RuleSet,
  type UtilityMap,
} from './plugin';
import {
  appendStyle,
  darkenClass,
  darkenUtility,
  stylizeUtility,
} from './utils';

export interface ColorwindConfig extends PluginConfig {
  colors: ColorsConfig;
}

export type ColorwindOptions = Partial<ColorwindConfig>;

export const DEFAULT_UTILITIES: UtilityMap = {
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

export const DEFAULT_COMPONENTS: ComponentList = {
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

export const DEFAULT_OPTIONS: ColorwindConfig = {
  colors: DEFAULT_COLORS,
  utilities: DEFAULT_UTILITIES,
  components: DEFAULT_COMPONENTS,
};

export class Colorwind extends Plugin<ColorwindConfig> {
  public constructor(api: PluginAPI, options: ColorwindConfig) {
    super(api, options);
    this.addColors();
  }

  public addColors(): this {
    for (const [colorName, colorOption] of Object.entries(
      this.options.colors,
    )) {
      this.addColor(colorName, colorOption);
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
    for (const component of Object.entries(this.options.components)) {
      const componentName = `${component[0]}-${name}`;
      const utilities = component[1];
      let rule: RuleSet = {};

      if (typeof utilities === 'string') {
        rule =
          typeof color === 'string'
            ? {
                [`.${componentName}`]: this.stylizeUtility(utilities, color),
              }
            : darkenClass(
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
            : darkenClass(
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
              rule = appendStyle(
                darkenClass(
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
              rule = appendStyle(
                darkenClass(
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
      ? stylizeUtility(this.options.utilities, e(name), color)
      : darkenUtility(
          this.darkMode,
          this.options.utilities,
          e(name),
          color.light,
          color.dark,
        );
  }
}

const colorwind: PluginWithOptions<ColorwindOptions> = plugin.withOptions(
  (options?: ColorwindOptions) => (api: PluginAPI) => {
    const opts = options ?? DEFAULT_OPTIONS;
    opts.colors = opts.colors ?? DEFAULT_COLORS;
    opts.utilities = opts.utilities ?? DEFAULT_UTILITIES;
    opts.components = opts.components ?? DEFAULT_COMPONENTS;
    new Colorwind(api, opts as ColorwindConfig);
  },
);

export default colorwind;
