import type { DeclarationBlock, PluginAPI, StyleCallback } from 'plugwind.js';
import {
  stylizeProperties,
  stylizePropertiesCallback,
  stylizeProperty,
  stylizePropertyCallback,
} from 'plugwind.js/utils';
import DEFAULT_COLORS, { type ColorsConfig, type ColorOption } from './colors';
import { isArray, isObject, isString } from './utils';

export type UtilityList = string[];
export type UtilityMap = Record<string, string>;

export type ComponentValue = string | UtilityList;
export type ComponentVariant = Record<string, ComponentValue>;
export type ComponentOption = ComponentValue | ComponentVariant;

export type ComponentList = Record<string, ComponentOption>;

export function isUtilityList(utilities: unknown): utilities is UtilityList {
  return isArray<string>(utilities, isString);
}

export function isUtilityMap(utilities: unknown): utilities is UtilityMap {
  return isObject<string, string>(utilities, isString, isString);
}

export function isComponentValue(value: unknown): value is ComponentValue {
  return isString(value) || isUtilityList(value);
}

export function isComponentVariant(
  variant: unknown,
): variant is ComponentVariant {
  return isObject<string, ComponentValue>(variant, isString, isComponentValue);
}

export function isComponentOption(option: unknown): option is ComponentOption {
  return isComponentValue(option) || isComponentVariant(option);
}

export interface ColorwindConfig {
  utilities: UtilityMap;
  components: ComponentList;
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

export class Colorwind {
  public constructor(
    readonly api: PluginAPI,
    readonly options: ColorwindConfig,
  ) {
    this.addColors();
  }

  protected getPropertyOf(utility: string): string {
    return this.options.utilities[utility];
  }

  protected getPropertiesOf(utilities: UtilityList): string[] {
    const properties: string[] = [];
    for (const utility of utilities) {
      properties.push(this.getPropertyOf(utility));
    }
    return properties;
  }

  protected stylizeUtility(
    utilityName: string,
    propertyValue: string,
  ): DeclarationBlock {
    return stylizeProperty(this.getPropertyOf(utilityName), propertyValue);
  }

  protected stylizeUtilityCallback(utilityName: string): StyleCallback {
    return stylizePropertyCallback(this.getPropertyOf(utilityName));
  }

  protected stylizeUtilities(
    utilityList: UtilityList,
    propertyValue: string,
  ): DeclarationBlock {
    return stylizeProperties(this.getPropertiesOf(utilityList), propertyValue);
  }

  protected stylizeUtilitiesCallback(utilityList: UtilityList): StyleCallback {
    return stylizePropertiesCallback(this.getPropertiesOf(utilityList));
  }

  public addColors(): void {
    for (const [colorName, colorOption] of Object.entries(
      this.options.colors,
    )) {
      this.addColor(colorName, colorOption);
    }
  }

  public addColor(name: string, option: ColorOption): void {
    this.addColorComponents(name, option, this.options.components);
    this.addColorUtilities(name, option, this.options.utilities);
  }

  public addColorComponents(
    colorName: string,
    colorOption: ColorOption,
    componentList: ComponentList,
  ): void {
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
  }

  public addColorComponent(
    componentName: string,
    componentOption: ComponentOption,
    colorName: string,
    colorOption: ColorOption,
  ): void {
    if (isString(componentOption)) {
      this.addColorComponentUtility(
        componentName,
        componentOption,
        colorName,
        colorOption,
      );
      return;
    }

    if (isUtilityList(componentOption)) {
      this.addColorComponentUtilityList(
        componentName,
        componentOption,
        colorName,
        colorOption,
      );
      return;
    }

    this.addColorComponentVariant(
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
  ): void {
    const className = `${componentName}-${utilityName}-${colorName}`;
    isString(colorOption)
      ? this.api.addUtility(
          className,
          this.stylizeUtility(utilityName, colorOption),
        )
      : this.api.addDark(
          className,
          this.stylizeUtility(utilityName, colorOption.light),
          this.stylizeUtility(utilityName, colorOption.dark),
        );
  }

  public addColorComponentUtilityList(
    componentName: string,
    utilityList: UtilityList,
    colorName: string,
    colorOption: ColorOption,
  ): void {
    const className = `${componentName}-${colorName}`;
    isString(colorOption)
      ? this.api.addComponent(
          className,
          this.stylizeUtilities(utilityList, colorOption),
        )
      : this.api.addDark(
          className,
          this.stylizeUtilities(utilityList, colorOption.light),
          this.stylizeUtilities(utilityList, colorOption.dark),
        );
  }

  public addColorComponentVariant(
    componentName: string,
    componentVariant: ComponentVariant,
    colorName: string,
    colorOption: ColorOption,
  ): void {
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
  }

  public addColorUtilities(
    colorName: string,
    colorOption: ColorOption,
    utilityMap: UtilityMap,
  ): void {
    for (const [utilityName, propertyName] of Object.entries(utilityMap)) {
      this.addColorUtility(utilityName, propertyName, colorName, colorOption);
    }
  }

  public addColorUtility(
    utilityName: string,
    propertyName: string,
    colorName: string,
    colorOption: ColorOption,
  ): void {
    const className = `${utilityName}-${colorName}`;
    isString(colorOption)
      ? this.api.addUtility(
          className,
          stylizeProperty(propertyName, colorOption),
        )
      : this.api.addDark(
          className,
          stylizeProperty(propertyName, colorOption.light),
          stylizeProperty(propertyName, colorOption.dark),
        );
  }
}

export default function (
  api: PluginAPI,
  options?: ColorwindOptions,
): Colorwind {
  const opts = options ?? DEFAULT_OPTIONS;
  opts.colors = opts.colors ?? DEFAULT_COLORS;
  opts.utilities = opts.utilities ?? DEFAULT_UTILITIES;
  opts.components = opts.components ?? DEFAULT_COMPONENTS;
  return new Colorwind(api, opts as ColorwindConfig);
}
