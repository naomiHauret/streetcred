import React, { PureComponent } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { wrap } from "react-native-style-tachyons"
import * as THEMES from 'utils/theme'
import Launcher from "screens/Launcher"
import Navigator from 'navigator'

export default wrap(
  class App extends PureComponent {
    componentDidMount() {
      this.props.componentDidMount()
    }
    render() {
      const { theme, checkedIn } = this.props
      const screenTheme = { }
      screenTheme[THEMES.LIGHT] = 'white-1'
      screenTheme[THEMES.DARK] = 'black-3'

      return (
        <View style={{ paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }} cls={`flx-i bg-${screenTheme[theme]}`}>
          <StatusBar hidden={false} />
          {checkedIn === true ? <Navigator /> : <Launcher />}
        </View>
      )
    }
  }
)

