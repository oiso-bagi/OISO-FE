import { style } from "@vanilla-extract/css";

export const navigation = style({
  position: "fixed",
  left: "50%",
  bottom: 0,
  transform: "translateX(-50%)",

  width: "100%",
  maxWidth: "430px",
  height: "72px",

  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  alignItems: "center",

  backgroundColor: "#ffffff",
  borderTop: "3px solid #000000",
  zIndex: 100,
});

export const item = style({
  height: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",

  color: "#000000",
  textDecoration: "none",
});

export const iconBox = style({
  width: "36px",
  height: "36px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const activeIconBox = style({
  backgroundColor: "#e85b3a",
  border: "3px solid #000000",
});

export const icon = style({
  width: "24px",
  height: "24px",
  objectFit: "contain",
});

export const activeIcon = style({
  filter: "brightness(0) invert(1)",
});

export const label = style({
  color: "#777777",
  fontSize: "11px",
  fontWeight: 500,
  lineHeight: 1,
});

export const activeLabel = style({
  color: "#000000",
  fontWeight: 700,
});
