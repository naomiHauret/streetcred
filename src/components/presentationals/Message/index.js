import React, { PureComponent, Fragment } from 'react'
import  { View, Text, TouchableOpacity } from 'react-native'
import { wrap } from 'react-native-style-tachyons'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

const themeSystem = {
  backgrounds: {
    info: 'bg-blue-0',
    alert: 'bg-red',
  },
}

class Message extends PureComponent {
  componentDidMount() {
    const { closable, onClose } = this.props
    closable === true && setTimeout(onClose, 5000)
  }
  render() {
    const { children, theme, closable, onClose } = this.props
    return  <View cls={`${themeSystem.backgrounds[theme]} pa2 jcc aic flxdr jcsb w100vw`}>
        <Text cls='white-0 tc ph3'>
          {children}
        </Text>
        {closable === true && <TouchableOpacity cls='ph2 absolute' style={{ right: 0 }} onPress={onClose}>
          <Ionicons name="ios-close" size={25} cls="white-0" />
        </TouchableOpacity>}
      </View>
  }
}

Message.propTypes = {
  theme: PropTypes.oneOf(['info', 'alert']).isRequired,
  closable: PropTypes.bool.isRequired,
}

Message.defaultProps = {
  theme: "info",
  closable: false,
}

export default wrap(Message)