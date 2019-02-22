
import React, { PureComponent, Fragment } from 'react'
import { Text, ScrollView, View, Image, Dimensions } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import { Transition } from 'react-navigation-fluid-transitions'
import Carousel from 'react-native-snap-carousel'
import Body from 'components/presentationals/Body'
import Title from 'components/presentationals/Title'
import CardArticle from 'components/presentationals/CardArticle'
import CardCurrentlyReading from 'components/presentationals/CardCurrentlyReading'
import { t } from 'utils/translation'
import { DAILY_ARTICLES_NUMBER } from 'utils/const'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo'

export default wrap(
  class PickedForMe extends PureComponent {
    isBookmarked = (article) => this.props.bookmarkedList.includes(article) === true
    toggleBookmarked = (article) => {
      const { translation, addToast, removeFromBookmarked, addToBookmarked, fullList } = this.props
        if(this.isBookmarked(article) === true) {
          addToast({
            id: Date.now(),
            text: t('messages.removeFromBookmarkedSuccess', translation, { article: fullList[`${article}`].title })
          })
          return removeFromBookmarked(article)
        } else {
          addToast({
            id: Date.now(),
            text: t('messages.addToBookmarkedSuccess', translation, { article: fullList[`${article}`].title })
          })
          return addToBookmarked(article)
        }
      }

    deleteFromReading = (article) => {
      const { translation, addToast, removeFromReadingList, fullList } = this.props
      addToast({
        id: Date.now(),
        text: t('messages.removeFromReadingSuccess', translation, {article: fullList[`${article}`].title })
      })
      return removeFromReadingList(article)
    }

    render() {
      const { navigation, translation, theme, fullList, dailyList, bookmarkedList, currentlyReadingList, doneReadingList, addToBookmarked, removeFromBookmarked, addToast, readArticle } = this.props

      return (
        <Body>
          {Object.keys(currentlyReadingList).length > 0 && <Fragment>
            <View cls="flxdr jcsb aifs">
              <Title theme={theme} align="left" margin="mb3">{t('labels.currentRead', translation)}</Title>
              <Text cls="gray-2 b fs-4xs ph3 pv1 radius-lg bg_blue_2_10">{Object.keys(currentlyReadingList).length}</Text>
            </View>
            {Object.keys(currentlyReadingList).map((item, index) => <CardCurrentlyReading
              key={index}
              theme={theme}
              translation={translation}
              category={t(`topics.${fullList[item].category}`, translation)}
              host={fullList[`${item}`].host}
              publication={fullList[`${item}`].publicationDate}
              title={fullList[`${item}`].title}
              image={fullList[item].cover['2x'].url}
              percentLeft={Math.ceil(100 - currentlyReadingList[item].progression)}
              timeLeft={Math.ceil(currentlyReadingList[item].progression / 100 * fullList[`${item}`].durationInMinutes)}
              bookmarked={this.isBookmarked(item)}
              content={`${fullList[`${item}`].content.replace(/<[^>]*>/g, "").substr(0, 130)}...`}
              goToArticle={() => {
                readArticle(item)
                return navigation.navigate('Article', { articleId: article })
              }}
              toggleBookmarked={() => this.toggleBookmarked(item)}
              removeFromReadingList={() => this.deleteFromReading(item)}
            />)}

            </Fragment>
          }
          <Title theme={theme} align="left" margin="mb3">{t('labels.yourDaily', translation, {number: DAILY_ARTICLES_NUMBER })}</Title>
          <Text cls="gray-2">{t('texts.dailyDescription', translation)}</Text>
          <Text cls="b mb4 gray-2">{t('texts.freemiumRestriction', translation, { number: DAILY_ARTICLES_NUMBER })}</Text>
          <ScrollView>
            {
              Object.values(dailyList).slice(0).reverse().map((listIndex, index) => {
                return <Fragment key={index}>
                  {listIndex.map((article, articleIndex) => {
                    const isItemBookmarked = this.isBookmarked(article)
                    return <CardArticle
                      category={fullList[`${article}`].category}
                      goToArticle={() => {
                        readArticle(article)
                        return navigation.navigate('Article', { articleId: article })}
                      }
                      host={fullList[`${article}`].host}
                      title={fullList[`${article}`].title}
                      image={fullList[`${article}`].cover.mini.url}
                      duration={t('labels.duration', translation, { duration: fullList[`${article}`].durationInMinutes })  }
                      publication={fullList[`${article}`].publicationDate}
                      bookmarked={isItemBookmarked}
                      icon={ isItemBookmarked ? "bookmark" : "bookmark-border"}
                      key={articleIndex}
                      toggleBookmarked={() => this.toggleBookmarked(article)}
                      theme={theme}
                    />
                  })
                  }
                </Fragment>
              })}
          </ScrollView>
          </Body>
      )
    }
  }
)