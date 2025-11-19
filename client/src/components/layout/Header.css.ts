import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const homeNavbar = style({
	backgroundColor: "transparent",
});

export const navbar = style({
	backgroundColor: vars.colors.primary,
});

export const brandLink = style({
	display: "flex",
	flexDirection: "row",
	gap: vars.space["2x"],
	alignItems: "center",
	fontFamily: vars.fonts.brand,
	color: vars.colors.accent,

	":hover": {
		color: vars.colors.accent,
	},
});

export const logo = style({
	width: 60,
});

export const brand = style({
	fontSize: vars.fontSizes["6x"],
	fontWeight: vars.fontWeights.bolder,
	lineHeight: "20px",
});

export const nav = style({
	gap: vars.space["2x"],
	alignItems: "center",
});

export const navLink = style({
	color: vars.colors.complementary,
	fontSize: vars.fontSizes["2x"],
	transition: "0.2s ease-in",
	padding: "0px !important",

	":hover": {
		color: vars.colors.accent,
	},
});

export const homeNavLink = style({
	color: vars.colors.complementary,
	fontSize: vars.fontSizes["2x"],
	transition: "0.2s ease-in",
	padding: "0px !important",

	":hover": {
		color: vars.colors.accent,
	},
});

export const headerButtonLink = style({
	backgroundColor: vars.colors.primaryLight,
	boxShadow: "none",
	fontSize: vars.fontSizes["1x"],
});

export const homeHeaderButtonLink = style({
	backgroundColor: "transparent",
	color: vars.colors.accent,
	boxShadow: "none",
	fontSize: vars.fontSizes["1x"],
});
