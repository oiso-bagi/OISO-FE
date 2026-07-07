import { style } from "@vanilla-extract/css";

export const card = style({
  width: "100%",

  padding: "14px 16px 16px",

  backgroundColor: "#ffffff",
  border: "3px solid #000000",
  boxShadow: "6px 6px 0 #000000",

  color: "#000000",
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "12px",
});

export const title = style({
  margin: 0,

  fontSize: "20px",
  fontWeight: 800,
  lineHeight: 1.25,
  letterSpacing: "-0.5px",
});

export const price = style({
  flexShrink: 0,

  fontSize: "17px",
  fontWeight: 800,
  lineHeight: 1.3,
  whiteSpace: "nowrap",
});

export const savedDate = style({
  margin: "10px 0 12px",

  color: "#666666",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: 1,
});

export const tagList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",

  marginTop: "8px",
});

export const tag = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  minHeight: "26px",
  padding: "2px 8px",

  backgroundColor: "#ffffff",
  border: "3px solid #000000",

  fontSize: "14px",
  fontWeight: 800,
  lineHeight: 1,
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",

  marginTop: "14px",
});

export const detailLink = style({
  color: "#000000",
  fontSize: "16px",
  fontWeight: 800,
  lineHeight: 1,
  textDecoration: "none",
});

export const detailButton = style({
  color: "#000000",
  fontSize: "16px",
  fontWeight: 800,
  lineHeight: 1,

  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
});
