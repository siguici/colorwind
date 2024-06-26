import type {
  Config,
  DarkModeConfig,
  PluginAPI,
  PluginCreator,
} from 'tailwindcss/types/config';

import {
  appendStyle,
  isArray,
  isObject,
  isString,
  stylizeClass,
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

export type ClassName = string;
export type ClassNames = ClassName[];

export type PropertyName = string;
export type PropertyValue = string;
export type PropertyVariant<T extends string> = {
  [key in T]: PropertyValue;
};
export type PropertyOption<T extends string> =
  | PropertyValue
  | PropertyVariant<T>;
export type PropertyConfig<T extends string> = {
  [key in PropertyName]: PropertyOption<T>;
};

export type UtilityName = string;
export type UtilityValue = PropertyName;
export type UtilityList = UtilityName[];
export type UtilityMap = {
  [key: UtilityName]: UtilityValue;
};
export type Utilities = UtilityList | UtilityMap;

export type ComponentName = string;
export type ComponentOption =
  | UtilityName
  | Utilities
  | Record<UtilityName, Utilities>;

export interface ComponentList {
  [key: ComponentName]: ComponentOption;
}

export function isUtilityName(name: unknown): name is UtilityName {
  return isString(name);
}

export function isUtilityValue(value: unknown): value is UtilityValue {
  return isString(value);
}

export function isUtilityList(utilities: unknown): utilities is UtilityList {
  return isArray<UtilityName>(utilities, isString);
}

export function isUtilityMap(utilities: unknown): utilities is UtilityMap {
  return isObject<UtilityName, UtilityValue>(
    utilities,
    isUtilityName,
    isUtilityValue,
  );
}

export function isUtilities(utilities: unknown): utilities is Utilities {
  return isUtilityList(utilities) || isUtilityMap(utilities);
}

export function isComponentName(name: unknown): name is ComponentName {
  return isString(name);
}

export function isComponentOption(option: unknown): option is ComponentOption {
  return (
    isUtilityName(option) ||
    isUtilities(option) ||
    isObject<UtilityName, Utilities>(option, isUtilityName, isUtilities)
  );
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

  protected getPropertyOf(utility: UtilityName): PropertyName {
    return this.options.utilities[utility];
  }

  protected getPropertiesOf(utilities: UtilityList): PropertyName[] {
    const properties: PropertyName[] = [];
    for (const utility of utilities) {
      properties.push(this.getPropertyOf(utility));
    }
    return properties;
  }

  protected stylizeUtility(
    utility: UtilityName,
    value: PropertyValue,
  ): DeclarationBlock {
    return stylizeProperty(this.getPropertyOf(utility), value);
  }

  protected stylizeUtilityCallback(utility: UtilityName): StyleCallback {
    return stylizePropertyCallback(this.getPropertyOf(utility));
  }

  protected stylizeUtilities(
    utilities: UtilityList,
    value: PropertyValue,
  ): DeclarationBlock {
    return stylizeProperties(this.getPropertiesOf(utilities), value);
  }

  protected stylizeUtilitiesCallback(utilities: UtilityList): StyleCallback {
    return stylizePropertiesCallback(this.getPropertiesOf(utilities));
  }

  protected stylizeComponentsCallback(variant: string): StyleCallbacks {
    const { e } = this.api;
    const rules: StyleCallbacks = {};

    for (const [componentName, option] of Object.entries(
      this.options.components,
    )) {
      const name = `${componentName}-${e(variant)}`;

      if (isUtilityName(option)) {
        rules[name] = this.stylizeUtilityCallback(option);
      } else if (isUtilityList(option)) {
        rules[name] = this.stylizeUtilitiesCallback(option);
      } else {
        for (const [utilityName, properties] of Object.entries(option)) {
          const className =
            utilityName === 'DEFAULT' ? name : `${name}-${e(utilityName)}`;
          if (isUtilityValue(properties)) {
            rules[className] = this.stylizeUtilityCallback(properties);
          } else {
            rules[className] = this.stylizeUtilitiesCallback(properties);
          }
        }
      }
    }
    return rules;
  }

  protected stylizeComponents(variant: string, value: PropertyValue): RuleSet {
    const { e } = this.api;
    let rules: RuleSet = {};

    for (const [componentName, option] of Object.entries(
      this.options.components,
    )) {
      const name = `${componentName}-${e(variant)}`;

      if (isUtilityName(option)) {
        rules = appendStyle(
          stylizeClass(name, this.stylizeUtility(option, value)),
          rules,
        );
      } else if (isUtilityList(option)) {
        rules = appendStyle(
          stylizeClass(name, this.stylizeUtilities(option, value)),
          rules,
        );
      } else {
        for (const utility of Object.entries(option)) {
          const utilityName =
            utility[0] === 'DEFAULT' ? name : `${name}-${e(utility[0])}`;
          const properties = utility[1];
          if (typeof properties === 'string') {
            rules = appendStyle(
              stylizeClass(utilityName, this.stylizeUtility(properties, value)),
              rules,
            );
          } else {
            rules = appendStyle(
              stylizeClass(
                utilityName,
                this.stylizeUtilities(properties, value),
              ),
              rules,
            );
          }
        }
      }
    }
    return rules;
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
