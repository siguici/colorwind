import type {
  Config,
  DarkModeConfig,
  PluginAPI,
  PluginCreator,
} from 'tailwindcss/types/config';

import {
  isArray,
  isObject,
  isString,
  stylizeProperties,
  stylizePropertiesCallback,
  stylizeProperty,
  stylizePropertyCallback,
} from './utils';

export type PluginConfig = {
  utilities: UtilityMap;
  components: ComponentList;
};

export interface PluginContract<T extends PluginConfig> {
  readonly api: PluginAPI;
  readonly options: T;
}

export type PluginWithoutOptions =
  | PluginCreator
  | {
      handler: PluginCreator;
      config?: Partial<Config>;
    };
export type PluginWithOptions<T> = {
  (
    options: T,
  ): {
    handler: PluginCreator;
    config?: Partial<Config> | undefined;
  };
  __isOptionsFunction: true;
};

export type PropertyVariant<T extends string> = {
  [key in T]: string;
};
export type PropertyOption<T extends string> = string | PropertyVariant<T>;
export type PropertyConfig<T extends string> = {
  [key in string]: PropertyOption<T>;
};

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

export class UtilityError extends Error {}

export class ComponentError extends Error {}

export type DeclarationBlock = Record<string, string>;
export interface RuleSet {
  [key: string]: DeclarationBlock | RuleSet | string;
}
export type StyleCallback = (
  value: string,
  extra: { modifier: string | null },
) => RuleSet | null;
export type StyleCallbacks = Record<string, StyleCallback>;
export type StyleValues = Record<string, string>;

export type DarkMode = Partial<DarkModeConfig>;

export abstract class Plugin<T extends PluginConfig>
  implements PluginContract<T>
{
  readonly darkMode: DarkMode = 'media';

  constructor(
    readonly api: PluginAPI,
    readonly options: T,
  ) {
    const { config } = api;
    this.darkMode = config().darkMode || 'media';
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

  protected addVar(name: string, value: string, prefix = 'cw'): this {
    return this.addBase({
      ':root': {
        [`--${prefix}-${name}`]: value,
      },
    });
  }

  protected addBase(base: RuleSet | RuleSet[]): this {
    this.api.addBase(base);
    return this;
  }

  protected addComponents(components: RuleSet | RuleSet[]): this {
    this.api.addComponents(components);
    return this;
  }

  protected matchComponents(
    components: StyleCallbacks,
    values: StyleValues = {},
  ): this {
    this.api.matchComponents(components, {
      values,
    });
    return this;
  }

  protected addUtility(
    className: string,
    utilityName: string,
    propertyValue?: string,
  ): this {
    const { e } = this.api;
    this.addUtilities({
      [`.${e(className)}`]: this.stylizeUtility(
        propertyValue ? utilityName : className,
        propertyValue ?? utilityName,
      ),
    });
    return this;
  }

  protected addUtilities(utilities: RuleSet | RuleSet[]): this {
    this.api.addUtilities(utilities);
    return this;
  }

  protected matchUtilities(
    utilities: StyleCallbacks,
    values: StyleValues = {},
  ): this {
    this.api.matchUtilities(utilities, {
      values,
    });
    return this;
  }
}
