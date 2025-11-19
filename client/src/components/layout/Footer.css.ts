import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const home = style({
	color: vars.colors.accentDark,
	backgroundColor: "transparent",
	padding: vars.space["3x"],
	textAlign: "center",
});

export const footer = style({
	color: vars.colors.accentLight,
	backgroundColor: vars.colors.primary,
	padding: vars.space["3x"],
	textAlign: "center",
});
