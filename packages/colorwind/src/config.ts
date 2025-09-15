import defaultColors from "./colors";
import { isArray, isObject } from "./utils";

export { defaultColors };

export const defaultUtilities = {
	text: "color",
	bg: "background-color",
	decoration: "text-decoration-color",
	border: "border-color",
	outline: "outline-color",
	accent: "accent-color",
	caret: "caret-color",
	divide: "border-color",
	fill: "fill",
	stroke: "stroke",
	shadow: "--tw-shadow-color",
	ring: "--tw-ring-color",
};

export const defaultConfig = {
	colors: defaultColors,
	utilities: defaultUtilities,
} as const;

export type Mode = "dark" | "light";
export type ColorScheme = { [key in Mode]: string };
export type DefaultColors = typeof defaultColors;
export type DefaultColorName = keyof DefaultColors;
export type DefaultColorOption = DefaultColors[DefaultColorName];
export type UserColorName = string;
export type UserColorOption = ColorScheme | string;
export type ColorName = DefaultColorName | UserColorName;
export type ColorValue = DefaultColorOption | UserColorOption;
export type ColorConfig = Record<ColorName, ColorValue>;
export type UserColorConfig = DefaultColorName[] | ColorConfig;
export type DefaultUtilities = typeof defaultUtilities;
export type DefaultUtility = keyof DefaultUtilities;
export type DefaultProperty = DefaultUtilities[DefaultUtility];
export type UserUtilities = Record<string, string>;
export type UtilityConfig = DefaultUtilities | UserUtilities;
export type UserUtilityConfig =
	| DefaultUtility
	| DefaultProperty
	| UtilityConfig;

export type UserConfig = {
	colors?: UserColorConfig;
	utilities?: UserUtilityConfig;
};

export type Config = {
	colors: ColorConfig;
	utilities: UtilityConfig;
};

export function defineColors(colors?: UserColorConfig): ColorConfig {
	let config: ColorConfig = {};
	if (isArray<string>(colors)) {
		for (const color of colors) {
			if (color in defaultColors) {
				config[color] = defaultColors[color as DefaultColorName];
			}
		}
	} else if (isObject(colors)) {
		config = colors;
	} else {
		config = defaultConfig.colors;
	}
	return config;
}

export function defineUtilities(utilities?: UserUtilityConfig): UtilityConfig {
	let config: UtilityConfig = {};
	if (isArray<DefaultUtility>(utilities)) {
		for (const utility of utilities) {
			if (utility in defaultUtilities) {
				config[utility] = defaultUtilities[utility];
			} else {
				for (const property of Object.values(defaultUtilities)) {
					if (property === utility) {
						config[utility] = property;
					}
				}
			}
		}
	} else if (isObject(utilities)) {
		config = utilities;
	} else {
		config = defaultConfig.utilities;
	}
	return config;
}

export function defineConfig(options?: UserConfig): Config {
	return options
		? {
				...defaultConfig,
				colors: defineColors(options.colors),
				utilities: defineUtilities(options.utilities),
			}
		: defaultConfig;
}
