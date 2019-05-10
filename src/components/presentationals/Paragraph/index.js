import React, { PureComponent } from "react"
import { Text } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"

export default wrap(
  class Paragraph extends PureComponent {
    render() {
      const { additionalStyles, children } = this.props

      return (
        <Text cls={additionalStyles} style={{
          fontSize: 14,
          lineHeight: 20
        }}>
          {children}
        </Text>
      )
    }
  }
)
