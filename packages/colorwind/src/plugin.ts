import type { DeclarationBlock, PluginAPI } from 'plugwind.js';
import { stylizeProperties, stylizeProperty } from 'plugwind.js/utils';
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

function getPropertyOf(utility: string, utilities: UtilityMap): string {
  return utilities[utility];
}

function getPropertiesOf(
  utilityList: UtilityList,
  utilityMap: UtilityMap,
): string[] {
  const properties: string[] = [];
  for (const utility of utilityList) {
    properties.push(getPropertyOf(utility, utilityMap));
  }
  return properties;
}

function stylizeUtility(
  utilityName: string,
  propertyValue: string,
  utilities: UtilityMap,
): DeclarationBlock {
  return stylizeProperty(getPropertyOf(utilityName, utilities), propertyValue);
}

function stylizeUtilities(
  utilityList: UtilityList,
  propertyValue: string,
  utilityMap: UtilityMap,
): DeclarationBlock {
  return stylizeProperties(
    getPropertiesOf(utilityList, utilityMap),
    propertyValue,
  );
}

export function addColors(api: PluginAPI, colors: ColorsConfig): void {
  for (const [colorName, colorOption] of Object.entries(colors)) {
    addColor(api, colorName, colorOption);
  }
}

export function addColor(
  api: PluginAPI,
  name: string,
  option: ColorOption,
  config = DEFAULT_OPTIONS,
): void {
  addColorComponents(api, name, option, config.components);
  addColorUtilities(api, name, option, config.utilities);
}

export function addColorComponents(
  api: PluginAPI,
  colorName: string,
  colorOption: ColorOption,
  componentList: ComponentList,
): void {
  for (const [componentName, componentOption] of Object.entries(
    componentList,
  )) {
    addColorComponent(
      api,
      componentName,
      componentOption,
      colorName,
      colorOption,
    );
  }
}

export function addColorComponent(
  api: PluginAPI,
  componentName: string,
  componentOption: ComponentOption,
  colorName: string,
  colorOption: ColorOption,
): void {
  if (isString(componentOption)) {
    addColorComponentUtility(
      api,
      componentName,
      componentOption,
      colorName,
      colorOption,
    );
    return;
  }

  if (isUtilityList(componentOption)) {
    addColorComponentUtilityList(
      api,
      componentName,
      componentOption,
      colorName,
      colorOption,
    );
    return;
  }

  addColorComponentVariant(
    api,
    componentName,
    componentOption,
    colorName,
    colorOption,
  );
}

export function addColorComponentUtility(
  api: PluginAPI,
  componentName: string,
  utilityName: string,
  colorName: string,
  colorOption: ColorOption,
  utilityMap: UtilityMap = {},
): void {
  const className = `${componentName}-${utilityName}-${colorName}`;
  isString(colorOption)
    ? api.addUtility(
        className,
        stylizeUtility(utilityName, colorOption, utilityMap),
      )
    : api.addDark(
        className,
        stylizeUtility(utilityName, colorOption.light, utilityMap),
        stylizeUtility(utilityName, colorOption.dark, utilityMap),
      );
}

export function addColorComponentUtilityList(
  api: PluginAPI,
  componentName: string,
  utilityList: UtilityList,
  colorName: string,
  colorOption: ColorOption,
  utilityMap: UtilityMap = {},
): void {
  const className = `${componentName}-${colorName}`;
  isString(colorOption)
    ? api.addComponent(
        className,
        stylizeUtilities(utilityList, colorOption, utilityMap),
      )
    : api.addDark(
        className,
        stylizeUtilities(utilityList, colorOption.light, utilityMap),
        stylizeUtilities(utilityList, colorOption.dark, utilityMap),
      );
}

export function addColorComponentVariant(
  api: PluginAPI,
  componentName: string,
  componentVariant: ComponentVariant,
  colorName: string,
  colorOption: ColorOption,
): void {
  for (const [variantName, utilities] of Object.entries(componentVariant)) {
    addColorComponent(
      api,
      variantName === 'DEFAULT'
        ? componentName
        : `${componentName}-${variantName}`,
      utilities,
      colorName,
      colorOption,
    );
  }
}

export function addColorUtilities(
  api: PluginAPI,
  colorName: string,
  colorOption: ColorOption,
  utilityMap: UtilityMap,
): void {
  for (const [utilityName, propertyName] of Object.entries(utilityMap)) {
    addColorUtility(api, utilityName, propertyName, colorName, colorOption);
  }
}

export function addColorUtility(
  api: PluginAPI,
  utilityName: string,
  propertyName: string,
  colorName: string,
  colorOption: ColorOption,
): void {
  const className = `${utilityName}-${colorName}`;
  isString(colorOption)
    ? api.addUtility(className, stylizeProperty(propertyName, colorOption))
    : api.addDark(
        className,
        stylizeProperty(propertyName, colorOption.light),
        stylizeProperty(propertyName, colorOption.dark),
      );
}

export default function (api: PluginAPI, options?: ColorwindOptions): void {
  const opts = options ?? DEFAULT_OPTIONS;
  opts.colors = opts.colors ?? DEFAULT_COLORS;
  opts.utilities = opts.utilities ?? DEFAULT_UTILITIES;
  opts.components = opts.components ?? DEFAULT_COMPONENTS;
  addColors(api, opts as ColorwindConfig);
}
