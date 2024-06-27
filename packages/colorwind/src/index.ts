import plugin from 'tailwindcss/plugin';
import type { PluginAPI } from 'tailwindcss/types/config';
import DEFAULT_COLORS, { type ColorsConfig, type ColorOption } from './colors';
import {
  type ComponentList,
  type ComponentOption,
  type ComponentVariant,
  Plugin,
  type PluginConfig,
  type PluginWithOptions,
  type RuleSet,
  type UtilityList,
  type UtilityMap,
  isUtilityList,
} from './plugin';
import { darkenClass, darkenUtility, isString, stylizeUtility } from './utils';

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

  public addColor(name: string, option: ColorOption): this {
    return this.addColorComponents(
      name,
      option,
      this.options.components,
    ).addColorUtilities(name, option, this.options.utilities);
  }

  public addColorComponents(
    colorName: string,
    colorOption: ColorOption,
    componentList: ComponentList,
  ): this {
    for (const [componentName, componentOption] of Object.entries(
      componentList,
    )) {
      this.addColorComponent(
        componentName,
        componentOption,
        colorName,
        colorOption,
      );
    }
    return this;
  }

  public addColorComponent(
    componentName: string,
    componentOption: ComponentOption,
    colorName: string,
    colorOption: ColorOption,
  ): this {
    if (isString(componentOption)) {
      return this.addColorComponentUtility(
        componentName,
        componentOption,
        colorName,
        colorOption,
      );
    }

    if (isUtilityList(componentOption)) {
      return this.addColorComponentUtilityList(
        componentName,
        componentOption,
        colorName,
        colorOption,
      );
    }

    return this.addColorComponentVariant(
      componentName,
      componentOption,
      colorName,
      colorOption,
    );
  }

  public addColorComponentUtility(
    componentName: string,
    utilityName: string,
    colorName: string,
    colorOption: ColorOption,
  ): this {
    const className = `${componentName}-${utilityName}-${colorName}`;
    isString(colorOption)
      ? this.addUtility(className, utilityName, colorOption)
      : this.addComponents(
          darkenClass(
            this.darkMode,
            className,
            this.stylizeUtility(utilityName, colorOption.light),
            this.stylizeUtility(utilityName, colorOption.dark),
          ),
        );
    return this;
  }

  public addColorComponentUtilityList(
    componentName: string,
    utilityList: UtilityList,
    colorName: string,
    colorOption: ColorOption,
  ): this {
    const className = `${componentName}-${colorName}`;
    this.addComponents(
      isString(colorOption)
        ? {
            [`.${className}`]: this.stylizeUtilities(utilityList, colorOption),
          }
        : darkenClass(
            this.darkMode,
            className,
            this.stylizeUtilities(utilityList, colorOption.light),
            this.stylizeUtilities(utilityList, colorOption.dark),
          ),
    );
    return this;
  }

  public addColorComponentVariant(
    componentName: string,
    componentVariant: ComponentVariant,
    colorName: string,
    colorOption: ColorOption,
  ): this {
    for (const [variantName, utilities] of Object.entries(componentVariant)) {
      this.addColorComponent(
        variantName === 'DEFAULT'
          ? componentName
          : `${componentName}-${variantName}`,
        utilities,
        colorName,
        colorOption,
      );
    }
    return this;
  }

  public addColorUtilities(
    name: string,
    color: ColorOption,
    utilities: UtilityMap,
  ): this {
    return this.addUtilities(this.stylizeColorUtility(name, color, utilities));
  }

  public stylizeColorUtility(
    name: string,
    color: ColorOption,
    utilities: UtilityMap,
  ): RuleSet {
    const { e } = this.api;
    return typeof color === 'string'
      ? stylizeUtility(utilities, e(name), color)
      : darkenUtility(
          this.darkMode,
          utilities,
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
