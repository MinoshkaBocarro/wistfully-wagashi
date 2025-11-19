import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const text = style({
	padding: "0.2rem",
	fontSize: vars.fontSizes["5x"],
});

export const button = style({
	paddingTop: "1.7rem",
	display: "flex",
	justifyContent: "center",
});
