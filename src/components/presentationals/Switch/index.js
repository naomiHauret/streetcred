import React, { PureComponent, Fragment } from 'react'
import { View, Switch as NativeSwitch, TouchableOpacity, Text } from 'react-native'
import { COLOR_BLUE_0, COLOR_BLUE_3, COLOR_WHITE_2, COLOR_BLACK_0 } from 'utils/designTokens'
import { wrap } from 'react-native-style-tachyons'

const themeSystem = {
  trackColor: {
    light: COLOR_WHITE_2,
    dark: COLOR_BLACK_0,
  },
  thumbColor: {
    light: COLOR_WHITE_2,
    dark: COLOR_BLACK_0
  }
}

export default wrap(
class Switch extends PureComponent {
  state = {
    active: this.props.active,
  }

  toggleActive = () => {
    this.setState({
      active: !this.state.active
    })
    return this.props.handleChange()
  }
  render() {
    const { children, theme } = this.props
    const { active } = this.state
    return <TouchableOpacity onPress={this.toggleActive} cls="flxdr aic jcsb">
        <View cls="aic flxdr">
          {children}
        </View>
        <NativeSwitch
          trackColor={{ false: themeSystem.trackColor[`${theme}`], true: COLOR_BLUE_3 }}
          thumbColor={active ? COLOR_BLUE_0 : themeSystem.trackColor[`${theme}`]}
          onValueChange={this.toggleActive}
          value={active} />
      </TouchableOpacity>
  }
})