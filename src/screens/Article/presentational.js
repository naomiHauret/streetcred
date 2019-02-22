
import React, { PureComponent, Fragment } from 'react'
import { Text, ScrollView, View, Button, Dimensions, Image } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import { Transition } from 'react-navigation-fluid-transitions'
import { NavigationEvents } from 'react-navigation'
import HTMLView from 'react-native-htmlview'
import Body from 'components/presentationals/Body'
import Tag from 'components/presentationals/Tag'
import { t } from 'utils/translation'

const paddingToBottom = 20

export default wrap(
  class Article extends PureComponent {
    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
    }

    render() {
      const { translation, theme, navigation, articles, completeArticle, setProgression, currentlyReadingList, doneReadingList } = this.props
      const articleId = navigation.getParam('articleId', 'NO-ID')
      const screenWidth = Dimensions.get('window').width
      const screenHeight = Dimensions.get('window').height

      const percent = Object.keys(currentlyReadingList).includes(articleId) && currentlyReadingList[articleId] !== undefined && currentlyReadingList[articleId].progression !== undefined ? `${currentlyReadingList[articleId].progression}%` : doneReadingList.includes(articleId) ? '100%' : '0%'

      return (
        <Fragment>
          <View>
            <View cls="bg-blue-1" style={{  height: 5, width: percent }} />
          </View>
          <ScrollView ref={(ref) => {
            this.myScroll = ref
          }} scrollEventThrottle={400} onScroll={({nativeEvent}) => {
            const { layoutMeasurement, contentSize, contentOffset } = nativeEvent
            const position = layoutMeasurement.height + contentOffset.y
            const progression = (position / (contentSize.height - paddingToBottom) ) * 100

            setProgression({ id: articleId, progression, position: contentOffset.y })
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
                  textSelectable={true}
                />
              </Body>
            </Transition>
          </ScrollView>
          <NavigationEvents
            onDidFocus={payload => this.myScroll.scrollTo({ x: 0, y: Object.keys(currentlyReadingList).includes(articleId) ? currentlyReadingList[articleId].position : 0 })} />
        </Fragment>
      )
    }
  }
)