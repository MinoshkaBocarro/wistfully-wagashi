import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const app = style({
	display: "flex",
	flexDirection: "column",
	minHeight: "100vh",
	color: vars.colors.complementary,
	fontFamily: vars.fonts.body,
	backgroundColor: vars.colors.primary,
});

export const appContent = style({
	flex: 1,
	display: "flex",
	width: "100%",
});
