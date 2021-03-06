import React, { Fragment } from "react"
import { Text as NativeText } from "react-native"
import { wrap } from "react-native-style-tachyons"

const Text = (props) => {
  const { children, theme, size, uppercase, spacing, paddings, bold, align } = props
  let content
  if (typeof children === "string") {
    content = uppercase ? children.toUpperCase() : children
  } else if (typeof children !== "undefined" && typeof children !== undefined) {
    content = children.map((child) => (uppercase && typeof child === "string" ? child.toUpperCase() : child))
  } else {
    content = <Fragment />
  }

  return (
    <NativeText
      style={{ minWidth: 60 }}
      cls={`${theme} ${align} ${size} ${spacing} ${paddings} ${bold === true ? "b" : ""}`}
    >
      {content}
    </NativeText>
  )
}

export default wrap(Text)
