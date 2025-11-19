import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const loadingContainer = style({
	minHeight: "50vh",
	display: "flex",
	flex: 1,
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
});

export const loadingSpinner = style({
	color: vars.colors.accentLight,
	width: "10rem",
	height: "10rem",
	fontSize: vars.fontSizes["4x"],
});
