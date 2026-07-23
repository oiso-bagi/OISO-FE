import { style } from "@vanilla-extract/css";

import { vars } from "@/shared/styles/theme.css";
import { body2, body6, body7, body9 } from "@/shared/styles/typography.css";

export const page = style({
  width: "100%",
  minHeight: "100vh",
  padding: "24px 22px 20px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: vars.color.bg,
});

export const content = style({
  width: "100%",
  marginTop: "46px",
});

export const allAgreement = style([
  {
    minHeight: "84px",
    padding: 0,
    backgroundColor: vars.color.primary300,
  },
]);

export const allAgreementLabel = style([
  body2,
  {
    minHeight: "78px",
    padding: "16px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
]);

export const hiddenCheckbox = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
});

export const checkbox = style({
  width: "24px",
  height: "24px",
  flexShrink: 0,
  display: "grid",
  placeItems: "center",
  border: `2.5px solid ${vars.color.black}`,
  backgroundColor: vars.color.white,

  selectors: {
    [`${hiddenCheckbox}:focus-visible + &`]: {
      outline: `3px solid ${vars.color.secondary500}`,
      outlineOffset: "2px",
    },
    [`${hiddenCheckbox}:checked + &`]: {
      backgroundColor: vars.color.primary500,
    },
  },
});

export const checkIcon = style({
  width: "15px",
  height: "15px",
  display: "block",
});

export const agreementBox = style([
  {
    marginTop: "24px",
    padding: "17px 17px 15px",
  },
]);

export const agreementRow = style({
  minHeight: "56px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
});

export const optionalDivider = style({
  marginTop: "8px",
  paddingTop: "20px",
  borderTop: `2.5px solid ${vars.color.neutral100}`,
});

export const agreementLabel = style([
  body6,
  {
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
]);

export const agreementActions = style({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  gap: "13px",
});

export const typeBadge = style([
  body7,
  {
    minWidth: "36px",
    padding: "2px 2px",
    border: "2px solid #111111",
    backgroundColor: vars.color.white,
    textAlign: "center",
  },
]);

export const requiredBadge = style({
  backgroundColor: vars.color.neutral100,
});

export const viewButton = style([
  body9,
  {
    color: vars.color.neutral500,
    textDecoration: "underline",
    textUnderlineOffset: "2px",

    selectors: {
      "&:focus-visible": {
        outline: `3px solid ${vars.color.secondary500}`,
        outlineOffset: "2px",
      },
    },
  },
]);

export const submitButton = style([
  body2,
  {
    width: "100%",
    minHeight: "82px",
    marginTop: "auto",
    border: "2.5px solid #111111",
    borderRadius: 0,
    backgroundColor: vars.color.primary500,
    color: vars.color.black,

    selectors: {
      "&:disabled": {
        borderColor: vars.color.neutral500,
        backgroundColor: vars.color.neutral100,
        color: vars.color.neutral500,
        cursor: "not-allowed",
      },
      "&:focus-visible": {
        outline: `3px solid ${vars.color.secondary500}`,
        outlineOffset: "3px",
      },
      "&:not(:disabled):active": {
        transform: "translate(1px, 2px)",
      },
    },
  },
]);
