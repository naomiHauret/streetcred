import React, { PureComponent } from "react"
import { ScrollView, View, Dimensions } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"
import { LinearGradient } from "expo"
import { COLOR_WHITE_1, COLOR_BLACK_5, COLOR_BLACK_3, COLOR_WHITE_0 } from "utils/designTokens"

const themeSystem = {
  gradientBg: {
    light: [COLOR_WHITE_0, 'transparent'],
    dark: [COLOR_BLACK_5, 'transparent']
  }
}
export default wrap(
  class Body extends PureComponent {
    render() {
      const {theme} = this.props
      const gradientHeight = Dimensions.get("window").height * 0.25
      const gradientWidth = Dimensions.get("window").width

      return (
        <View style={{
          position: 'relative'
        }}>

        <LinearGradient cls={`absolute`} style={{
          zIndex: -1,
          height: gradientHeight,
          width: gradientWidth
          }} colors={themeSystem.gradientBg[theme]} />
          <ScrollView scrollEventThrottle={16} contentContainerStyle={[s.pt3, s.ph2, s.pb3, s.flx__i]}>
            {this.props.children}
          </ScrollView>
        </View>
      )
    }
  },
)
