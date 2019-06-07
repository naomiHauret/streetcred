import React, { PureComponent } from "react"
import { LinearGradient } from "expo"
import { TouchableOpacity, View } from "react-native"
import { wrap } from "react-native-style-tachyons"
import Text from "./Text"
import { COLOR_GRAY_0, COLOR_WHITE_0 } from "utils/designTokens"

const themeSystem = {
  backgrounds: {
    primary: {
      inverted: {
        true: "transparent",
        false: "bg-blue-1",
      },
    },
    secondary: {
      inverted: {
        true: "transparent",
        false: "bg-blue-0",
      },
    },
  },
  colors: {
    gradient: "black-0",
    primary: {
      inverted: {
        true: "blue-1",
        false: "white-0",
      },
    },
    secondary: {
      inverted: {
        true: "blue-0",
        false: "white-0",
      },
    },
  },
  fontSizes: {
    sm: "fs-3xs",
    default: "fs-r",
    xl: "fs-xl",
  },
  borders: {
    primary: {
      inverted: {
        true: "b__blue_1",
        false: "b__transparent",
      },
    },
    secondary: {
      inverted: {
        true: "b__blue_0",
        false: "b__transparent",
      },
    },
  },
  radius: {
    default: "br0",
    lg: "radius-lg",
  },
  paddings: {
    sm: "pv1 ph3",
    default: "pa2",
    xl: "pa3",
  },
  letterSpacings: {
    default: "lt0",
    xs: "lt-xs",
    sm: "lt-sm",
    lg: "lt-lg",
  },
  aligns: {
    center: "jcc aic tac",
    between: "jcsb",
  },
}
export default wrap(
  class Button extends PureComponent {
    static defaultProps = {
      uppercase: false,
      theme: "primary",
      radius: "default",
      size: "default",
      inverted: false,
      disabled: false,
      margins: "ma0",
      align: "center",
      bold: false,
      gradient: false,
    }
    render() {
      const {
        children,
        theme,
        size,
        radius,
        gradient,
        inverted,
        uppercase,
        handleOnPress,
        disabled,
        margins,
        align,
        bold,
      } = this.props
      const letterSpacing = !uppercase
        ? themeSystem.letterSpacings.default
        : size === "xl"
        ? themeSystem.letterSpacings.lg
        : size === "default"
        ? themeSystem.letterSpacings.sm
        : themeSystem.letterSpacings.xs
      return gradient === false ? (
        <TouchableOpacity
          {...this.props}
          onPress={handleOnPress}
          cls={`ba ${margins} ${disabled === true ? "o-50" : "o-100"} ${
            themeSystem.backgrounds[theme].inverted[inverted]
          } ${themeSystem.borders[theme].inverted[inverted]} ${themeSystem.radius[radius]}`}
        >
          <Text
            align={themeSystem.aligns[align]}
            bold={bold}
            spacing={letterSpacing}
            paddings={themeSystem.paddings[size]}
            uppercase={uppercase}
            theme={themeSystem.colors[theme].inverted[inverted]}
            size={themeSystem.fontSizes[size]}
          >
            {children}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          {...this.props}
          onPress={handleOnPress}
          cls={`${margins} ${themeSystem.aligns[align]} ${disabled === true ? "o-50" : "o-100"}`}
        >
          <LinearGradient
            cls={`h100vh w100vw ${themeSystem.radius[radius]}`}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLOR_WHITE_0, COLOR_WHITE_0, COLOR_GRAY_0]}
          >
            <View cls={`flx-i ${themeSystem.aligns[align]}`}>{children}</View>
          </LinearGradient>
        </TouchableOpacity>
      )
    }
  },
)
