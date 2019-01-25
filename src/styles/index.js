import { sizes } from "react-native-style-tachyons"
import * as TOKENS from "utils/designTokens"

const fontSizes = {
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

const customFontSizes = {}
const customRadius = {}

Object.keys(fontSizes).map(
  (fs) =>
    (customFontSizes[fs] = {
      fontSize: fontSizes[fs],
    }),
)

Object.keys(radius).map(
  (rad) =>
    (customRadius[rad] = {
      borderRadius: customRadius[rad],
    }),
)

export const colors = {
  "white-0": TOKENS.COLOR_WHITE_0,
  "white-1": TOKENS.COLOR_WHITE_1,
  "blue-0": TOKENS.COLOR_BLUE_0,
  "blue-1": TOKENS.COLOR_BLUE_1,
  "gray-0": TOKENS.COLOR_GRAY_0,
  "gray-1": TOKENS.COLOR_GRAY_1,
  "gray-2": TOKENS.COLOR_GRAY_2,
  "gray-3": TOKENS.COLOR_GRAY_3,
  "black-0": TOKENS.COLOR_BLACK_0,
  "black-1": TOKENS.COLOR_BLACK_1,
  "black-2": TOKENS.COLOR_BLACK_2,
}

export const customStyles = {
  ...customFontSizes,
  ...customRadius,
}
