
import React, { PureComponent, Fragment } from 'react'
import { Text, ScrollView, View, Button } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import { Transition } from 'react-navigation-fluid-transitions'
import Body from 'components/presentationals/Body'
import CardArticle from 'components/presentationals/CardArticle'
import { t } from 'utils/translation'
import { DAILY_ARTICLES_NUMBER } from 'utils/const'

export default wrap(
  class PickedForMe extends PureComponent {
    render() {
      const { translation, theme, fullList, dailyList, bookmarkedList, currentlyReadingList, doneReadingList, addToBookmarked, removeFromBookmarked } = this.props

      return (
        <Body>
          {currentlyReadingList.length > 0 && <Fragment>
            <Text>{t('labels.currentRead', translation)}</Text>
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
                    return <CardArticle
                      category={fullList[`${article}`].category}
                      handleOnPress={() => navigation.navigate('Article', { articleId: article })}
                      host={fullList[`${article}`].host}
                      title={fullList[`${article}`].title}
                      image={fullList[`${article}`].cover.mini.url}
                      key={articleIndex}
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