
import React, { PureComponent, Fragment } from 'react'
import { Text, ScrollView, View, Button } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import { Transition } from 'react-navigation-fluid-transitions'
import Carousel from 'react-native-snap-carousel'
import Body from 'components/presentationals/Body'
import CardArticle from 'components/presentationals/CardArticle'
import { t } from 'utils/translation'
import { DAILY_ARTICLES_NUMBER } from 'utils/const'

export default wrap(
  class PickedForMe extends PureComponent {
    render() {
      const { navigation, translation, theme, fullList, dailyList, bookmarkedList, currentlyReadingList, doneReadingList, addToBookmarked, removeFromBookmarked, addToast, readArticle } = this.props

      return (
        <Body>
          {currentlyReadingList.length > 0 && <Fragment>
            <Text>{t('labels.currentRead', translation)}</Text>
            <Carousel
              layout={'default'} ref={(c) => { this._carousel = c }}
              data={currentlyReadingList}
              renderItem={({ item, index }) => {
                return <View>
                  <Text>{fullList[`${item}`].title}</Text>
                </View>
              }}
              sliderWidth={350}
              itemWidth={350} />

            </Fragment>
          }
          <Text cls="fs-xl b black-1 mb3">{t('labels.yourDaily', translation, {number: DAILY_ARTICLES_NUMBER })}</Text>
          <Text cls="gray-2">{t('texts.dailyDescription', translation)}</Text>
          <Text cls="b mb4 gray-2">{t('texts.freemiumRestriction', translation, { number: DAILY_ARTICLES_NUMBER })}</Text>
          <ScrollView>
            {
              Object.values(dailyList).slice(0).reverse().map((listIndex, index) => {
                return <Fragment key={index}>
                  {listIndex.map((article, articleIndex) => {
                    const isBookmarked = bookmarkedList.includes(article) === true
                    const toggleBookmarked = () => {
                      if(isBookmarked === true) {
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
                      bookmarked={isBookmarked}
                      icon={ isBookmarked ? "bookmark" : "bookmark-border"}
                      key={articleIndex}
                      toggleBookmarked={toggleBookmarked}
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