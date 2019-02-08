import React, { PureComponent } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { wrap } from "react-native-style-tachyons"
import * as THEMES from 'utils/theme'
import Launcher from "screens/Launcher"
import MessageOffline from 'components/wired/MessageOffline'
import Navigator from 'navigator'
import { accessToken, apiEndpoint } from 'utils/content'
import Prismic from 'prismic-javascript'

export default wrap(
  class App extends PureComponent {
    componentWillMount() {
      Prismic.api(apiEndpoint, { accessToken }).then(api => {
        api.query(Prismic.Predicates.at('document.type', 'article')).then(response => {
          if (response) {
            // console.log(response.results)
          }
        })
      })
    }

    render() {
      const { theme, userHasCheckedIn } = this.props
      const screenTheme = { }
      screenTheme[THEMES.LIGHT] = 'white-1'
      screenTheme[THEMES.DARK] = 'black-3'

      return (
        <View style={{ paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }} cls={`flx-i bg-${screenTheme[theme]}`}>
          <StatusBar hidden={false} />
          <MessageOffline />
          {userHasCheckedIn === true ? <Navigator /> : <Launcher />}
        </View>
      )
    }
  }
)

