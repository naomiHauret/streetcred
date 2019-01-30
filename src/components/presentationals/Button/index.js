import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'
import { wrap } from "react-native-style-tachyons"
import Text from './Text'

const themeSystem = {
  backgrounds: {
    primary: {
      inverted: {
        true: 'transparent',
        false: 'bg-blue-1',
      }
    },
    secondary: {
      inverted: {
        true: 'transparent',
        false: 'bg-blue-0',
      }
    }
  },
  colors: {
    primary: {
      inverted: {
        true: 'blue-1',
        false: 'white-0',
      }
    },
    secondary: {
      inverted: {
        true: 'blue-0',
        false: 'white-0',
      }
    },
  },
  fontSizes: {
    sm: 'fs-sm',
    default: 'fs-r',
    xl: "fs-xl",
  },
  borders: {
    primary: {
      inverted: {
        true: 'b__blue_1',
        false: 'b__transparent',
      }
    },
    secondary: {
      inverted: {
        true: 'b__blue_0',
        false: 'b__transparent',
      }
    },
  },
  radius: {
    default: 'br0',
    lg: 'radius-lg'
  },
  paddings: {
    sm: "pv1 ph3",
    default: "pa2",
    xl: "pa3",
  },
  letterSpacings: {
    default: 'lt0',
    xs: 'lt-xs',
    sm: 'lt-sm',
    lg: 'lt-lg',
  },
  aligns: {
    center: 'jcc',
    between:  'jcsb'
  }
}
export default wrap(
  class Button extends PureComponent {
    static defaultProps = {
      uppercase: false,
      theme: 'primary',
      radius: 'default',
      size: 'default',
      inverted: false,
      disabled: false,
      margins: 'ma0',
      align: 'center',
    }
    render() {
      const { children, theme, size, radius, inverted, uppercase, handleOnPress, disabled, margins, align } = this.props
      const letterSpacing = !uppercase ? themeSystem.letterSpacings.default : size === 'xl' ? themeSystem.letterSpacings.lg : size === 'default' ? themeSystem.letterSpacings.sm : themeSystem.letterSpacings.xs
      return <TouchableOpacity {...this.props} onPress={handleOnPress} cls={`ba ${margins} ${disabled === true ? 'o-50' : 'o-100' } ${themeSystem.backgrounds[theme].inverted[inverted]} ${themeSystem.borders[theme].inverted[inverted]} ${themeSystem.radius[radius]}`}>
        <Text spacing={letterSpacing} paddings={themeSystem.paddings[size]} uppercase={uppercase} theme={themeSystem.colors[theme].inverted[inverted]} size={themeSystem.fontSizes[size]}>
          {children}
        </Text>
      </TouchableOpacity>
    }
  }
)