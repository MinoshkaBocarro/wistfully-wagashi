import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const heading = style({
	padding: "40px 45px",
	// background:
	// 	"linear-gradient(to bottom, rgba(68, 58, 58, 0.42) 0%, rgba(68, 58, 58, 0) 100%)",
	borderRadius: "10px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
});

export const headingContent = style({
	maxWidth: "800px",
});

export const title = style({
	fontFamily: vars.fonts.brand,
	marginBottom: "5px",
});
export const subtitle = style({
	color: vars.colors.accentLight,
	fontSize: vars.fontSizes["3x"],
	margin: 0,
	marginBottom: "20px",
	fontStyle: "italic",
});

export const categorySwitch = style({
	padding: "20px",
	display: "flex",
	gap: "20px",
	justifyContent: "center",
});

export const categorySwitchItem = style({
	cursor: "pointer",
});

export const categoryOn = style({
	textDecoration: "underline",
	textDecorationColor: vars.colors.accent,
	textUnderlineOffset: "10px",
});

export const separator = style({
	border: "solid 1.5px pink",
	borderColor: vars.colors.accent,
});

export const buttonContainer = style({
	display: "flex",
	justifyContent: "end",
	padding: "10px 0 2px",
});
