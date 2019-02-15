
import React, { PureComponent, Fragment } from 'react'
import { Text, FlatList, View, Button } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import { Transition } from 'react-navigation-fluid-transitions'
import HTMLView from 'react-native-htmlview'
import Body from 'components/presentationals/Body'
import { t } from 'utils/translation'

export default wrap(
  class Article extends PureComponent {
    render() {
      const { translation, theme, navigation, articles } = this.props

      return (
        <Body>
          <HTMLView
            value={articles[`${navigation.getParam('articleId', 'NO-ID')}`].content}
          />
        </Body>
      )
    }
  }
)