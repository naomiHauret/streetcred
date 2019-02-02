import React, { PureComponent, Fragment } from 'react'
import  { View, Text } from 'react-native'
import { wrap } from 'react-native-style-tachyons'
import { Transition } from 'react-navigation-fluid-transitions'

const themeSystem = {
  backgrounds: {
    info: 'bg-blue-0',
    alert: 'bg-red',
  },
}

class Message extends PureComponent {
  state = {
    show: true,
  }
  render() {
    const { children, theme } = this.props
    const { show } = this.state
    return show !== true ? <Fragment/> : <Transition appear="flip" disappear="flip">
      <View cls={`${themeSystem.backgrounds[theme]} pa2 jcc aic`}>
        <Text cls='white-0'>
          {children}
        </Text>
      </View>
    </Transition>
  }
}

export default wrap(Message)