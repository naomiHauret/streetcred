import React, { PureComponent } from 'react'
import { Text as NativeText } from 'react-native'
import { wrap } from "react-native-style-tachyons"

class SerifText extends PureComponent {
  render() {
    const { children, additionalStyles, customStyles, type, uppercase } = this.props
    let content
    if (typeof children === 'string') {
      content = uppercase === true ? children.toUpperCase() : children
    }
    return <NativeText style={customStyles} cls={`ff-${type} ${additionalStyles !== undefined ? additionalStyles : ""}`} >
      {content}
    </NativeText>
  }
}

export default wrap(
  SerifText
)