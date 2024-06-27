import type {
  DarkMode,
  DeclarationBlock,
  RuleSet,
  StyleCallback,
  StyleCallbacks,
  UtilityMap,
} from './plugin';

export function darken(
  darkMode: DarkMode,
  ruleName: string,
  lightRules: RuleSet,
  darkRules: RuleSet | undefined = undefined,
): RuleSet {
  const rules: RuleSet = {};

  if (darkRules !== undefined) {
    let strategy: string;
    let selector: string | string[] | undefined;

    if (
      darkMode === 'media' ||
      darkMode === 'class' ||
      darkMode === 'selector'
    ) {
      strategy = darkMode;
      selector = undefined;
    } else {
      strategy = darkMode[0] || 'media';
      selector = darkMode[1];
    }

    switch (strategy) {
      case 'variant': {
        const selectors = Array.isArray(selector)
          ? selector
          : [selector || '.dark'];
        for (const selector of selectors) {
          rules[ruleName] = {
            ...lightRules,
            [selector]: {
              ...darkRules,
            },
          };
        }
        break;
      }
      case 'selector':
        rules[ruleName] = {
          ...lightRules,
          [`&:where(${selector || '.dark'}, ${selector || '.dark'} *)`]: {
            ...darkRules,
          },
        };
        break;
      case 'class':
        rules[ruleName] = {
          ...lightRules,
          [`:is(${selector || '.dark'} &)`]: {
            ...darkRules,
          },
        };
        break;
      default:
        rules[ruleName] = {
          ...lightRules,
          '@media (prefers-color-scheme: dark)': {
            '&': {
              ...darkRules,
            },
          },
        };
    }
  } else {
    rules[ruleName] = lightRules;
  }

  return rules;
}

export function darkenClass(
  darkMode: DarkMode,
  className: string,
  lightRules: RuleSet,
  darkRules: RuleSet | undefined = undefined,
): RuleSet {
  return darken(darkMode, `.${className}`, lightRules, darkRules);
}

export function stylizeClass(
  className: string,
  properties: DeclarationBlock,
): RuleSet {
  let declarations: DeclarationBlock = {};
  for (const property of Object.entries(properties)) {
    declarations = appendStyle(
      stylizeProperty(property[0], property[1]),
      declarations,
    );
  }

  return {
    [`.${className}`]: declarations,
  };
}

export function stylizeProperty(
  property: string,
  value: string,
): DeclarationBlock {
  return {
    [property]: value,
  };
}

export function stylizeProperties(
  properties: string[],
  value: string,
): DeclarationBlock {
  let rule: DeclarationBlock = {};
  for (const propertyName of properties) {
    rule = appendStyle(stylizeProperty(propertyName, value), rule);
  }
  return rule;
}

export function stylizePropertyCallback(property: string): StyleCallback {
  return (value) => {
    return stylizeProperty(property, value);
  };
}

export function stylizePropertiesCallback(properties: string[]): StyleCallback {
  return (value) => {
    return stylizeProperties(properties, value);
  };
}

export function stylizeUtility(
  utilities: UtilityMap,
  name: string,
  value: string,
): RuleSet {
  const rules: RuleSet = {};

  for (const utility of Object.entries(utilities)) {
    rules[`.${utility[0]}-${name}`] = {
      [utility[1]]: value,
    };
  }

  return rules;
}

export function stylizeUtilityCallback(
  utilities: UtilityMap,
  name: string,
): StyleCallbacks {
  const rules: StyleCallbacks = {};

  for (const utility of Object.entries(utilities)) {
    rules[`.${utility[0]}-${name}`] = stylizePropertyCallback(utility[1]);
  }

  return rules;
}

export function darkenUtility(
  darkMode: DarkMode,
  utilities: UtilityMap,
  name: string,
  lightValue: string,
  darkValue: string,
): RuleSet {
  let rules: RuleSet = {};

  for (const utility of Object.entries(utilities)) {
    const utilityName = `${utility[0]}-${name}`;
    const propertyName = utility[1];
    rules[`.${utilityName}-light`] = stylizeProperty(propertyName, lightValue);
    rules[`.${utilityName}-dark`] = stylizeProperty(propertyName, darkValue);
    rules = appendStyle(
      darkenClass(
        darkMode,
        utilityName,
        stylizeProperty(propertyName, lightValue),
        stylizeProperty(propertyName, darkValue),
      ),
      rules,
    );
  }

  return rules;
}

export function appendStyle<T extends DeclarationBlock | RuleSet>(
  style: T,
  styles: T,
): T {
  return {
    ...styles,
    ...style,
  };
}

export function prependStyle<T extends DeclarationBlock | RuleSet>(
  style: T,
  styles: T,
): T {
  return {
    ...style,
    ...styles,
  };
}

export function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}

export function isArray<T = unknown>(
  arr: unknown,
  filter?: (value: unknown, index: number) => boolean,
): arr is T[] {
  return Array.isArray(arr) && (filter ? arr.every(filter) : true);
}

export function isObject<K extends string | number | symbol, V = unknown>(
  obj: unknown,
  keyFilter?: (key: K) => boolean,
  valueFilter?: (value: V) => boolean,
): obj is Record<K, V> {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    !isArray(obj) &&
    !(obj instanceof RegExp) &&
    (keyFilter ? (Object.keys(obj) as K[]).every(keyFilter) : true) &&
    (valueFilter ? Object.values(obj).every(valueFilter) : true)
  );
}
