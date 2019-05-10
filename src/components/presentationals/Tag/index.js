import React, { PureComponent } from "react"
import { wrap } from "react-native-style-tachyons"
import { Text } from "react-native"

class Tag extends PureComponent {
  render() {
    const { label } = this.props
    return <Text cls="asfs white-0 ba fs-3xs b__white_0 radius-lg pv1 ph3 lt-xs">{label.toUpperCase()}</Text>
  }
}

export default wrap(Tag)
