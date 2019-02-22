
import React, { PureComponent, Fragment } from 'react'
import { Text, ScrollView, View, Image, Dimensions } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import Body from 'components/presentationals/Body'
import SearchBar from 'components/presentationals/SearchBar'
import CardArticle from 'components/presentationals/CardArticle'
import { t } from 'utils/translation'
import Title from 'components/presentationals/Title'


export default wrap(
  class Bookmarked extends PureComponent {
    state = {
      searchQuery: this.props.query,
    }

    handleSearch = (text) => {
      this.setState({
        searchQuery: text,
      })
      return this.props.search({
        query: text,
      })
    }
    render() {
      const { navigation,translation, theme, fullList, bookmarkedList,
        doneReadingList, addToBookmarked, removeFromBookmarked, addToast,
        readArticle, search, queryResults, renderList
      } = this.props
      const { searchQuery } = this.state
      const screenWidth = Dimensions.get('window').width

      return (
        <Fragment>
          <View style={{ height: 45 }}>
            <SearchBar
              type='block'
              placeholder={t('labels.search', translation)}
              onInput={this.handleSearch}
              value={searchQuery} theme={theme}
            />
          </View>

          {bookmarkedList.length === 0 ? <Fragment>
            <View cls="flx-i jcc">
              <Image cls="rm-contain" style={{ width: screenWidth }} source={require('./../../illustrations/empty.png') } />
            </View>
            <View style={{height: "35%"}} cls="ph4">
              <Title theme={theme} align="center" margin="mt3">{t('labels.nothingBookmarked', translation)}</Title>
            </View>
          </Fragment> : <Body>
              {searchQuery.trim() !== "" && <Text cls={`b fs-4xs gray-2 ${queryResults === 0 ? "mb3" : "mb2"}`}>
                {t(`labels.${queryResults > 1 ? "multipleResults" : queryResults === 0 ? "noResults" : "singleResult"}`, translation, { number: queryResults, query: searchQuery })}
              </Text>
            }
            <ScrollView>
              {(searchQuery.trim() === "" || queryResults === 0 ) && <View cls="flxdr jcsb aic">
                  <Title theme={theme} align="left">{t('labels.bookmarked', translation)}</Title>
                  <Text cls="gray-2 b fs-4xs ph3 pv1 radius-lg bg_blue_2_10">{bookmarkedList.length}</Text>
                </View>
              }
              {
                  renderList.slice(0).reverse().map((article, index) => {
                  const isBookmarked = bookmarkedList.includes(article) === true
                  const toggleBookmarked = () => {
                    if (isBookmarked === true) {
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
                          return navigation.navigate('Article', { articleId: article })
                        }
                        }
                        host={fullList[`${article}`].host}
                        title={fullList[`${article}`].title}
                        image={fullList[`${article}`].cover.mini.url}
                        duration={t('labels.duration', translation, { duration: fullList[`${article}`].durationInMinutes })}
                        publication={fullList[`${article}`].publicationDate}
                        bookmarked={isBookmarked}
                        icon={"close"}
                        key={index}
                        toggleBookmarked={toggleBookmarked}
                        theme={theme}
                      />
                    })
              }
            </ScrollView>
          </Body> }

        </Fragment>
      )
    }
  }
)