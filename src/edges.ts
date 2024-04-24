import defaultTheme from "tailwindcss/defaultTheme";
import { type ComponentList, Plugin, type UtilityList } from "./plugin";
import type { ClassName } from "./plugin";

export type RequiredEdgeOptions = {
  entryClass: ClassName;
  buttonClass: ClassName;
};

export type EdgeOptions = Partial<RequiredEdgeOptions>;

export class Edges extends Plugin<RequiredEdgeOptions> {
  readonly components: ComponentList = {};
  readonly utilities: UtilityList = {};
  create(): this {
    const { e } = this.api;
    const { spacing, borderWidth, borderRadius } = defaultTheme;

    const boxStyle = {
      paddingLeft: spacing[4],
      paddingRight: spacing[4],
      paddingTop: spacing[2],
      paddingBottom: spacing[2],
    };

    const borderStyle = {
      borderWidth: borderWidth[2],
      borderRadius: borderRadius.md,

      "&-l": {
        borderRightWidth: spacing[0],
        borderRadius: borderRadius.none,
        borderTopLeftRadius: borderRadius.md,
        borderBottomLeftRadius: borderRadius.md,
      },

      "&-r": {
        borderLeftWidth: spacing[0],
        borderRadius: borderRadius.none,
        borderTopRightRadius: borderRadius.md,
        borderBottomRightRadius: borderRadius.md,
      },

      "&-t": {
        borderBottomWidth: spacing[0],
        borderRadius: borderRadius.none,
        borderTopLeftRadius: borderRadius.md,
        borderTopRightRadius: borderRadius.md,
      },

      "&-b": {
        borderRightWidth: spacing[0],
        borderRadius: borderRadius.none,
        borderBottomLeftRadius: borderRadius.md,
        borderBottomRightRadius: borderRadius.md,
      },
    };

    const entryStyle = {
      ...boxStyle,
      ...borderStyle,
    };

    const buttonStyle = {
      ...boxStyle,
      ...borderStyle,
    };

    return this.addComponents({
      [`.${e(this.options.entryClass)}`]: entryStyle,
      [`.${e(this.options.buttonClass)}`]: buttonStyle,
    });
  }
}
