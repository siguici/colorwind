import type {
  Config,
  DarkModeConfig,
  PluginAPI,
  PluginCreator,
} from "tailwindcss/types/config";

import {
  append_style,
  stylize_class,
  stylize_properties,
  stylize_properties_callback,
  stylize_property,
  stylize_property_callback,
} from "./utils";

export interface PluginContract<T> {
  readonly api: PluginAPI;
  readonly options: T;
  readonly components: ComponentList;
  readonly utilities: UtilityList;
  create(): this;
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
export type UtilityList = {
  [key: UtilityName]: PropertyName;
};

export type ComponentName = string;

export interface ComponentList {
  [key: ComponentName]:
    | UtilityName
    | UtilityName[]
    | UtilityList
    | Record<UtilityName, UtilityList | UtilityName[]>;
}

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

export abstract class Plugin<T> implements PluginContract<T> {
  readonly darkMode: DarkMode = "media";
  abstract readonly components: ComponentList;
  abstract readonly utilities: UtilityList;

  constructor(
    readonly api: PluginAPI,
    readonly options: T,
  ) {
    const { config } = api;
    this.darkMode = config().darkMode || "media";
  }

  abstract create(): this;

  protected getPropertyOf(utility: UtilityName): PropertyName {
    return this.utilities[utility];
  }

  protected getPropertiesOf(utilities: UtilityName[]): PropertyName[] {
    const properties: PropertyName[] = [];
    // biome-ignore lint/complexity/noForEach: <explanation>
    utilities.forEach((utility) => {
      properties.push(this.getPropertyOf(utility));
    });
    return properties;
  }

  protected stylizeUtility(utility: UtilityName, value: PropertyValue) {
    return stylize_property(this.getPropertyOf(utility), value);
  }

  protected stylizeUtilityCallback(utility: UtilityName) {
    return stylize_property_callback(this.getPropertyOf(utility));
  }

  protected stylizeUtilities(utilities: UtilityName[], value: PropertyValue) {
    return stylize_properties(this.getPropertiesOf(utilities), value);
  }

  protected stylizeUtilitiesCallback(utilities: UtilityName[]) {
    return stylize_properties_callback(this.getPropertiesOf(utilities));
  }

  protected stylizeComponentsCallback(variant: string): StyleCallbacks {
    const { e } = this.api;
    const rules: StyleCallbacks = {};

    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.entries(this.components).forEach((component) => {
      const name = `${component[0]}-${e(variant)}`;
      const utilities = component[1];

      if (typeof utilities === "string") {
        rules[name] = this.stylizeUtilityCallback(utilities);
      } else if (Array.isArray(utilities)) {
        rules[name] = this.stylizeUtilitiesCallback(utilities);
      } else {
        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.entries(utilities).forEach((utility) => {
          const utilityName =
            utility[0] === "DEFAULT" ? name : `${name}-${e(utility[0])}`;
          const properties = utility[1];
          if (typeof properties === "string") {
            rules[utilityName] = this.stylizeUtilityCallback(properties);
          } else {
            rules[utilityName] = this.stylizeUtilitiesCallback(properties);
          }
        });
      }
    });
    return rules;
  }

  protected stylizeComponents(variant: string, value: PropertyValue): RuleSet {
    const { e } = this.api;
    let rules: RuleSet = {};

    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.entries(this.components).forEach((component) => {
      const name = `${component[0]}-${e(variant)}`;
      const utilities = component[1];

      if (typeof utilities === "string") {
        rules = append_style(
          stylize_class(name, this.stylizeUtility(utilities, value)),
          rules,
        );
      } else if (Array.isArray(utilities)) {
        rules = append_style(
          stylize_class(name, this.stylizeUtilities(utilities, value)),
          rules,
        );
      } else {
        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.entries(utilities).forEach((utility) => {
          const utilityName =
            utility[0] === "DEFAULT" ? name : `${name}-${e(utility[0])}`;
          const properties = utility[1];
          if (typeof properties === "string") {
            rules = append_style(
              stylize_class(
                utilityName,
                this.stylizeUtility(properties, value),
              ),
              rules,
            );
          } else {
            rules = append_style(
              stylize_class(
                utilityName,
                this.stylizeUtilities(properties, value),
              ),
              rules,
            );
          }
        });
      }
    });
    return rules;
  }

  protected addVar(name: string, value: string): this {
    return this.addBase({
      ":root": {
        [`--s-${name}`]: value,
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
