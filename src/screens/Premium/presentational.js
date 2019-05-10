import React, { PureComponent, Fragment } from "react"
import { Text, ScrollView, View, Image, Dimensions } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"
import Body from "components/presentationals/Body"
import { t } from "utils/translation"
import Title from "components/presentationals/Title"
import * as Animatable from "react-native-animatable"

export default wrap(
  class Premium extends PureComponent {
    state = { }

    render() {
      const { navigation, translation, theme } = this.props

      return (
        <Fragment>
          <Body theme={theme}>
            <Animatable.View animation="fadeInUp" delay={50} duration={450}>
                <Text>
                </Text>
            </Animatable.View>
          </Body>
        </Fragment>
      )
    }
  },
)
