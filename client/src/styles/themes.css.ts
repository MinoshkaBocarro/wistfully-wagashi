import { createGlobalTheme } from "@vanilla-extract/css";
import twColors from "tailwindcss/colors.js";

export const root = createGlobalTheme(":root", {
	fonts: {
		brand: "Alice, apple-system, sans-serif",
		body: "Lato, apple-system, sans-serif",
	},
	colors: {
		primary: "rgba(0, 0, 0, 1)",
		complementary: twColors.stone[50],
		accent: twColors.violet[400],
		accentLight: twColors.violet[200],
		accentDark: twColors.violet[900],
		primaryLight: "rgba(26, 24, 24, 1)",

		success: twColors.emerald[200],
		warning: twColors.orange[200],
		error: twColors.rose[600],
		grey200: twColors.gray[200],
		grey300: twColors.gray[300],
		grey400: twColors.gray[400],
		grey500: twColors.gray[500],
		grey600: twColors.gray[600],
	},
	space: {
		none: "0",
		"1x": "8px",
		"2x": "16px",
		"3x": "24px",
		"4x": "32px",
		"5x": "40px",
		"6x": "48px",
	},
	fontSizes: {
		"1x": "1.1rem",
		"2x": "1.17rem",
		"3x": "1.25rem",
		"4x": "1.3rem",
		"5x": "1.5rem",
		"6x": "1.6rem",
		"7x": "1.7rem",
		"8x": "1.8rem",
	},
	fontWeights: { light: "300", normal: "500", bold: "600", bolder: "700" },
});

export const vars = { ...root };
