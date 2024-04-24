import {
  type ClassName,
  type ComponentList,
  Plugin,
  type UtilityList,
} from "./plugin";

export interface RequiredLinkOptions {
  linkClass: ClassName;
}
export type LinkOptions = Partial<RequiredLinkOptions>;

export class Links extends Plugin<RequiredLinkOptions> {
  readonly components: ComponentList = {};
  readonly utilities: UtilityList = {};
  public create(): this {
    const { e } = this.api;
    return this.addComponents({
      [`.${e(this.options.linkClass)}`]: {
        "&:hover": {
          textDecoration: "underline",
        },
      },
    });
  }
}
