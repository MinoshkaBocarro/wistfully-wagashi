import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const container = style({
	display: "flex",
	flex: "1",
	flexDirection: "column",
	borderRadius: "10px",
	backgroundColor: vars.colors.primaryLight,
});
