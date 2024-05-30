import type {
  ClassName,
  DarkMode,
  DeclarationBlock,
  PropertyName,
  PropertyValue,
  RuleSet,
  StyleCallback,
  StyleCallbacks,
  UtilityList,
} from "./plugin";

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
      darkMode === "media" ||
      darkMode === "class" ||
      darkMode === "selector"
    ) {
      strategy = darkMode;
      selector = undefined;
    } else {
      strategy = darkMode[0] || "media";
      selector = darkMode[1];
    }

    switch (strategy) {
      case "variant": {
        const selectors = Array.isArray(selector)
          ? selector
          : [selector || ".dark"];
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
      case "selector":
        rules[ruleName] = {
          ...lightRules,
          [`&:where(${selector || ".dark"}, ${selector || ".dark"} *)`]: {
            ...darkRules,
          },
        };
        break;
      case "class":
        rules[ruleName] = {
          ...lightRules,
          [`:is(${selector || ".dark"} &)`]: {
            ...darkRules,
          },
        };
        break;
      default:
        rules[ruleName] = {
          ...lightRules,
          "@media (prefers-color-scheme: dark)": {
            "&": {
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

export function darken_class(
  darkMode: DarkMode,
  className: string,
  lightRules: RuleSet,
  darkRules: RuleSet | undefined = undefined,
): RuleSet {
  return darken(darkMode, `.${className}`, lightRules, darkRules);
}

export function stylize_class(
  className: ClassName,
  properties: DeclarationBlock,
): RuleSet {
  let declarations: DeclarationBlock = {};
  for (const property of Object.entries(properties)) {
    declarations = append_style(
      stylize_property(property[0], property[1]),
      declarations,
    );
  }

  return {
    [`.${className}`]: declarations,
  };
}

export function stylize_property(
  property: PropertyName,
  value: PropertyValue,
): DeclarationBlock {
  return {
    [property]: value,
  };
}

export function stylize_properties(
  properties: PropertyName[],
  value: PropertyValue,
): DeclarationBlock {
  let rule: DeclarationBlock = {};
  for (const propertyName of properties) {
    rule = append_style(stylize_property(propertyName, value), rule);
  }
  return rule;
}

export function stylize_property_callback(
  property: PropertyName,
): StyleCallback {
  return (value) => {
    return stylize_property(property, value);
  };
}

export function stylize_properties_callback(
  properties: PropertyName[],
): StyleCallback {
  return (value) => {
    return stylize_properties(properties, value);
  };
}

export function stylize_utility(
  utilities: UtilityList,
  name: PropertyName,
  value: PropertyValue,
): RuleSet {
  const rules: RuleSet = {};

  for (const utility of Object.entries(utilities)) {
    rules[`.${utility[0]}-${name}`] = {
      [utility[1]]: value,
    };
  }

  return rules;
}

export function stylize_utility_callback(
  utilities: UtilityList,
  name: PropertyName,
): StyleCallbacks {
  const rules: StyleCallbacks = {};

  for (const utility of Object.entries(utilities)) {
    rules[`.${utility[0]}-${name}`] = stylize_property_callback(utility[1]);
  }

  return rules;
}

export function darken_utility(
  darkMode: DarkMode,
  utilities: UtilityList,
  name: PropertyName,
  lightValue: PropertyValue,
  darkValue: PropertyValue,
): RuleSet {
  let rules: RuleSet = {};

  for (const utility of Object.entries(utilities)) {
    const utilityName = `${utility[0]}-${name}`;
    const propertyName = utility[1];
    rules[`.${utilityName}-light`] = stylize_property(propertyName, lightValue);
    rules[`.${utilityName}-dark`] = stylize_property(propertyName, darkValue);
    rules = append_style(
      darken_class(
        darkMode,
        utilityName,
        stylize_property(propertyName, lightValue),
        stylize_property(propertyName, darkValue),
      ),
      rules,
    );
  }

  return rules;
}

export function append_style<T extends DeclarationBlock | RuleSet>(
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
