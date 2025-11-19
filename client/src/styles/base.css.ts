import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

// Set base fontSize and backgroundColour
globalStyle("html", {
	fontSize: "120%",
	backgroundColor: vars.colors.primary,
});

// Set backgroundColour
globalStyle("body", {
	backgroundColor: vars.colors.primary,
});
