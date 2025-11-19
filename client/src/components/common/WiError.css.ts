import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const notFoundBox = style({
	display: "flex",
	flexDirection: "column",
	flex: 1,
	alignItems: "center",
	justifyContent: "center",
	marginTop: "1rem",
	minHeight: "60vh",
	gap: "1rem",
});

export const heading = style({
	fontSize: vars.fontSizes["4x"],
	padding: vars.space["2x"],
	fontWeight: vars.fontWeights.bold,
	fontFamily: vars.fonts.brand,
});

export const text = style({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	gap: "5px",
});
