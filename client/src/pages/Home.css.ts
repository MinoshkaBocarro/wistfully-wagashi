import { style } from "@vanilla-extract/css";
import { vars } from "../styles/themes.css";

export const homePageContainer = style({
	backgroundImage: "url(../assets/images/home-page-background.webp)",
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center center",
	minHeight: "100vh",
	color: vars.colors.complementary,
	fontFamily: vars.fonts.body,
	position: "relative",
});

export const gradient = style({
	display: "flex",
	flexDirection: "column",
	height: "100%",
	width: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	position: "absolute",
	top: 0,
	left: 0,
});

export const homePageAppContent = style({
	flex: 1,
	display: "grid",
	width: "100%",
	gridTemplateRows: "2fr 1fr",
});

export const heroSection = style({
	display: "flex",
	flexDirection: "column",
	flex: 1,
	alignItems: "center",
	justifyContent: "center",
});

export const title = style({
	margin: 0,
	fontSize: "3rem",
	fontWeight: vars.fontWeights.bold,
	fontFamily: vars.fonts.brand,
	color: vars.colors.accent,
});

export const text = style({
	color: vars.colors.complementary,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	fontSize: vars.fontSizes["4x"],
	textAlign: "center",
});
