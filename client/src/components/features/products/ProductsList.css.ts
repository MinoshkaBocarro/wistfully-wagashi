import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const gridContainer = style({
	margin: `${vars.space["2x"]} 0`,
	width: "100%",
	maxWidth: "1200px",
});

export const productGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
	gridTemplateRows: "repeat(auto-fit, min-content)",
	gap: vars.space["4x"],
	margin: `auto`,
	justifyContent: "space-between",
});
