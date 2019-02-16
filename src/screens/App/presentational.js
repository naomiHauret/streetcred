import React, { PureComponent, Fragment } from 'react'
import { View, ScrollView, StatusBar, Platform } from 'react-native'
import { wrap } from "react-native-style-tachyons"
import { Transition } from 'react-navigation-fluid-transitions'
import * as THEMES from 'utils/theme'
import Launcher from "screens/Launcher"
import MessageOffline from 'components/wired/MessageOffline'
import Message from 'components/presentationals/Message'
import AppNavigator from 'components/wired/AppNavigator'

export default wrap(
  class App extends PureComponent {
    render() {
      const { theme, userHasCheckedIn, removeToast, toastrs } = this.props
      const screenTheme = { }
      screenTheme[THEMES.LIGHT] = 'white-1'
      screenTheme[THEMES.DARK] = 'black-3'

      return (
        <View style={{ paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }} cls={`flx-i bg-${screenTheme[theme]}`}>
          <StatusBar hidden={false} />
          <Transition appear="flip" disappear="flip">
            <MessageOffline />
          </Transition>
          {userHasCheckedIn === true ? <Fragment>
            {toastrs.map((toastr, index) => <Transition key={toastr.id} appear="scale" disappear="right" >
              <Message theme="info" closable={true} onClose={() => removeToast(toastr.id) } >
                  {toastr.text}
                </Message>
              </Transition>
            )}
            <AppNavigator />
          </Fragment> : <Launcher />}
        </View>
      )
    }
  }
)

