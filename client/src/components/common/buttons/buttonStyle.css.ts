import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const button = style({
	fontSize: vars.fontSizes["1x"],
	minWidth: "max-content",
	width: "fit-content",
	height: vars.space["3x"],
	padding: `${vars.space["2x"]} ${vars.space["2x"]}`,
	borderRadius: vars.space["1x"],
	backgroundColor: vars.colors.accent,
	border: `1px ${vars.colors.accent} solid`,
	color: vars.colors.complementary,
	boxShadow: vars.boxShadow,
	display: "flex",
	alignItems: "center",
	textDecoration: "none",
	justifySelf: "center",

	":hover": {
		color: vars.colors.complementary,
		backgroundColor: vars.colors.accentLight,
		border: `1px ${vars.colors.accentDark} solid`,
	},

	":disabled": {
		color: vars.colors.complementary,
		backgroundColor: vars.colors.accentLight,
		border: `1px ${vars.colors.accent} solid`,
	},
});
