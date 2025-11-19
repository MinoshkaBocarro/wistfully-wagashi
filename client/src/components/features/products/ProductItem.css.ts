import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const productCard = style({
	display: "grid",
	gridTemplateRows: "3fr 2fr",
	justifyItems: "center",
	textAlign: "center",
	height: "100%",
});

export const productCardContent = style({
	padding: "0.7rem",
	display: "grid",
	gridTemplateRows: "1fr min-content",
	gap: "15px",
	// gap: "5px",
});

export const cardHeading = style({
	fontSize: "1.2rem",
});

export const image = style({
	height: "100%",
	width: "auto",
	objectFit: "cover",
});
