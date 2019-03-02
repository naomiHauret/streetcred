import React, { PureComponent, Fragment } from 'react'
import { View, ScrollView, StatusBar, Platform } from 'react-native'
import { wrap } from "react-native-style-tachyons"
import * as Animatable from 'react-native-animatable'
import Launcher from "screens/Launcher"
import MessageOffline from 'components/wired/MessageOffline'
import Message from 'components/presentationals/Message'
import AppNavigator from 'components/wired/AppNavigator'
import { globalThemedStylesheet } from "utils/stylesheet"

export default wrap(
  class App extends PureComponent {
    render() {
      const { theme, userHasCheckedIn, removeToast, toastrs } = this.props

      return (
        <View style={{ paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }} cls={`flx-i ${globalThemedStylesheet.background[theme]}`}>
          <StatusBar hidden={false} />
           <Animatable.View animation='slideInDown'>
            <MessageOffline />
          </Animatable.View>
          {userHasCheckedIn === true ? <Fragment>
            {toastrs.map((toastr, index) => <Message animationEnter='slideInDown' animationExit='slideOutUp' key={index} theme="info" closable={true} onClose={() => removeToast(toastr.id) } >
                  {toastr.text}
                </Message>
            )}
            <AppNavigator />
          </Fragment> : <Launcher />}
        </View>
      )
    }
  }
)

