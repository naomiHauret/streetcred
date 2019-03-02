import { sizes } from "react-native-style-tachyons"
import * as TOKENS from "utils/designTokens"

const fontSizes = {
  "fs-4xs": TOKENS.SIZE_4XS,
  "fs-3xs": TOKENS.SIZE_3XS,
  "fs-2xs": TOKENS.SIZE_2XS,
  "fs-xs": TOKENS.SIZE_XS,
  "fs-sm": TOKENS.SIZE_SM,
  "fs-r": TOKENS.SIZE_REGULAR,
  "fs-lg": TOKENS.SIZE_LG,
  "fs-xl": TOKENS.SIZE_XL,
  "fs-2xl": TOKENS.SIZE_2XL,
}

const radius = {
  "radius-sm": TOKENS.RADIUS_SM,
  "radius-md": TOKENS.RADIUS_MD,
  "radius-lg": TOKENS.RADIUS_LG,
}

const letterSpacings = {
  lt0: TOKENS.LETTER_SPACING_0,
  "lt-xs": TOKENS.LETTER_SPACING_XS,
  "lt-sm": TOKENS.LETTER_SPACING_SM,
  "lt-lg": TOKENS.LETTER_SPACING_LG,
}

const customFontSizes = {}
const customRadius = {}
const customLetterSpacings = {}

Object.keys(fontSizes).map(
  (fs) =>
    (customFontSizes[fs] = {
      fontSize: fontSizes[fs],
    }),
)

Object.keys(radius).map(
  (rad) =>
    (customRadius[rad] = {
      borderRadius: radius[rad],
    }),
)

Object.keys(letterSpacings).map(
  (lt) =>
    (customLetterSpacings[lt] = {
      letterSpacing: letterSpacings[lt],
    }),
)

export const colors = {
  "white-0": TOKENS.COLOR_WHITE_0,
  "white-1": TOKENS.COLOR_WHITE_1,
  "blue-0": TOKENS.COLOR_BLUE_0,
  "blue-1": TOKENS.COLOR_BLUE_1,
  "blue-2": TOKENS.COLOR_BLUE_2,
  "gray-0": TOKENS.COLOR_GRAY_0,
  "gray-1": TOKENS.COLOR_GRAY_1,
  "gray-2": TOKENS.COLOR_GRAY_2,
  "gray-3": TOKENS.COLOR_GRAY_3,
  "gray-4": TOKENS.COLOR_GRAY_4,
  "gray-5": TOKENS.COLOR_GRAY_5,
  "black-0": TOKENS.COLOR_BLACK_0,
  "black-1": TOKENS.COLOR_BLACK_1,
  "black-2": TOKENS.COLOR_BLACK_2,
  "black-3": TOKENS.COLOR_BLACK_3,
  "black-4": TOKENS.COLOR_BLACK_4,
  "black-5": TOKENS.COLOR_BLACK_5,
  red: TOKENS.COLOR_RED,
  transparent: "transparent",
}

export const customStyles = {
  ...customFontSizes,
  ...customRadius,
  ...customLetterSpacings,
  nml2: {
    marginLeft: -9,
  },
  flxdr: {
    flexDirection: "row",
  },
  flxdc: {
    flexDirection: "column",
  },
  tac: {
    textAlign: "center",
  },
  tal: {
    textAlign: "left",
  },
  flxw: {
    flexWrap: "wrap",
  },
  w100vw: {
    width: "100%",
  },
  h100vh: {
    height: "100%",
  },
  flxs1: {
    flexShrink: 1,
  },
  flxg0: {
    flexGrow: 0,
  },
}
