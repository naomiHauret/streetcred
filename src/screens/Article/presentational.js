
import React, { PureComponent, Fragment } from 'react'
import { Text, ScrollView, View, Button, Dimensions, Image } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import { Transition } from 'react-navigation-fluid-transitions'
import HTMLView from 'react-native-htmlview'
import Body from 'components/presentationals/Body'
import Tag from 'components/presentationals/Tag'
import { t } from 'utils/translation'
export default wrap(
  class Article extends PureComponent {
    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      const paddingToBottom = 20
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
    }

    render() {
      const { translation, theme, navigation, articles, completeArticle } = this.props
      const articleId = navigation.getParam('articleId', 'NO-ID')
      const screenWidth = Dimensions.get('window').width
      const screenHeight = Dimensions.get('window').height

      return (
        <ScrollView scrollEventThrottle={400} onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent)) {
              completeArticle(articleId)
            }
          }}>
          <Transition shared="cover">
            <Image cls='radius-sm absolute' style={{ top: 0, left: 0, width: 150, height: 150 }} source={{ uri: articles[`${articleId}`].cover['2x'].url }} />
          </Transition>
          <Tag label={articles[`${articleId}`].category}/>
          <Text>{articles[`${articleId}`].host}</Text>
          <Text>{articles[`${articleId}`].publication}</Text>
          <Text>{articles[`${articleId}`].title}</Text>
          <Text>{ t('labels.byAuthor', translation, { author: articles[`${articleId}`].author} )}</Text>
          <Text>{ t('labels.translatedFromLanguage', translation, { language: t( `languages.${articles[`${articleId}`].originalLanguage}`, translation )})}</Text>
          <Transition appear="horizontal">
            <Body>
              <HTMLView
                value={articles[`${articleId}`].content}
              />
            </Body>
          </Transition>
        </ScrollView>
      )
    }
  }
)