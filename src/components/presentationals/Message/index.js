import React, { PureComponent, Fragment } from 'react'
import  { View, Text, TouchableOpacity } from 'react-native'
import { wrap } from 'react-native-style-tachyons'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable-unmountable'

const themeSystem = {
  backgrounds: {
    info: 'bg-blue-0',
    alert: 'bg-red',
  },
}

class Message extends PureComponent {
  state = {
    mounted: true
  }
  componentDidMount() {
    const { closable, onClose } = this.props
    setTimeout(
      () => this.setState({ mounted: false}), 5000
    )
    setTimeout(
      onClose, 10000
    )
  }

  handleClose = () => {
    this.setState({ mounted: false})
    setTimeout(
      onClose, 150
    )
  }


  render() {
    const { children, theme, closable, onClose, animationExit, animationEnter } = this.props
    return  <Animatable.View
      animation='slideInDown'
      duration={125}
      unmountAnimation='slideOutUp'
      unmountDuration={125}
      mounted={this.state.mounted}
      cls={`${themeSystem.backgrounds[theme]} pa2 jcc aic flxdr jcsb w100vw`}
    >
        <Text cls='white-0 tc ph3'>
          {children}
        </Text>
        {closable === true && <TouchableOpacity cls='ph2 absolute' style={{ right: 0 }} onPress={onClose}>
          <Ionicons name="ios-close" size={25} cls="white-0" />
        </TouchableOpacity>}
      </Animatable.View>
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

export default Animatable.animatableUnmountable(wrap(Message))