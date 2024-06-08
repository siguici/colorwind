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
  type PluginWithOptions,
  type RuleSet,
  type UtilityList,
} from './plugin';
import {
  append_style,
  darken_class,
  darken_utility,
  stylize_utility,
} from './utils';

export type RequiredPluginConfig = {
  colors: ColorsConfig;
  utilities: UtilityList;
  components: ComponentList;
};

export type PluginConfig = Partial<RequiredPluginConfig> | undefined;

export const DEFAULT_UTILITIES: UtilityList = {
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

export const DEFAULT_OPTIONS: RequiredPluginConfig = {
  colors: DEFAULT_COLORS,
  utilities: DEFAULT_UTILITIES,
  components: DEFAULT_COMPONENTS,
};

export class Colorwind extends Plugin<RequiredPluginConfig> {
  readonly components: ComponentList;
  readonly utilities: UtilityList;

  public constructor(api: PluginAPI, options: RequiredPluginConfig) {
    super(api, options as RequiredPluginConfig);
    this.utilities = options.utilities;
    this.components = options.components;
  }

  public create(): this {
    for (const color of Object.entries(this.options.colors)) {
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
export function plugColors(): PluginWithOptions<PluginConfig> {
  return plugin.withOptions(
    (options: PluginConfig = DEFAULT_OPTIONS) =>
      (api) => {
        options = options ?? DEFAULT_OPTIONS;
        options.colors = options.colors ?? DEFAULT_COLORS;
        options.utilities = options.utilities ?? DEFAULT_UTILITIES;
        options.components = options.components ?? DEFAULT_COMPONENTS;
        useColorwind(
          api,
          options as RequiredPluginConfig,
        );
      },
  );
}

function useColorwind(
  api: PluginAPI,
  options: RequiredPluginConfig,
): Colorwind {
  return new Colorwind(api, options).create();
}

const colorwind: PluginWithOptions<PluginConfig> = plugColors();

export default colorwind;
