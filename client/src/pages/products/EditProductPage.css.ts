import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const previewImageContainer = style({
	display: "flex",
	justifyContent: "center",
	margin: "10px",
});
export const previewImage = style({
	opacity: "80%",
	maxWidth: "400px",
	height: "auto",
});

export const button = style({
	display: "flex",
	justifyContent: "center",
});
