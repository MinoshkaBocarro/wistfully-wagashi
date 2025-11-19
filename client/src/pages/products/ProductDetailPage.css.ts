import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

// TODO Adjust (ai gen)

export const pageCenter = style({
	display: "flex",
	alignItems: "center",
});

export const container = style({
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	gap: "2rem",
	padding: "2rem",
	margin: "0",

	"@media": {
		"(max-width: 1000px)": {
			gridTemplateColumns: "none",
		},
	},
});

export const imageContainer = style({
	display: "flex",
	alignItems: "center",
});

export const image = style({
	flex: 1,
	width: "auto",
	height: "100%",
	overflow: "hidden",
	objectFit: "cover",
	display: "block",
	borderRadius: "10px",
	boxShadow: vars.boxShadow,
});

export const productInformationContainer = style({
	display: "flex",
	alignItems: "center",
});

export const productInformation = style({
	padding: "30px 35px",
	paddingTop: "25px",
	gap: "1rem",
});

export const category = style({
	alignSelf: "flex-end",
	color: vars.colors.complementary,
});

export const productContentContainer = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.space["2x"],
});

export const title = style({
	fontSize: "2rem",
	fontWeight: 700,
	marginBottom: "0.5rem",
	textAlign: "center",
	color: vars.colors.accent,
	fontFamily: vars.fonts.brand,
});

export const description = style({
	fontSize: "1rem",
	lineHeight: 1.5,
	color: vars.colors.complementary,
	textAlign: "justify",
});

export const price = style({
	fontSize: vars.fontSizes["3x"],
	textAlign: "right",
	marginBottom: "-20px",
});

export const detailsList = style({
	display: "grid",
	flexDirection: "column",
	gap: "5px",
});

export const infoGroup = style({
	display: "flex",
});

export const label = style({
	fontWeight: 600,
	marginRight: "0.5rem",
	minWidth: "max-content",
});

export const stock = style({
	color: vars.colors.grey400,
	textAlign: "center",
});

export const buttonContainer = style({
	display: "flex",
	justifyContent: "center",
	gap: vars.space["1x"],
});
