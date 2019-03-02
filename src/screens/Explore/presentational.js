
import React, { PureComponent, Fragment } from 'react'
import { Text, ScrollView, View, Image, Dimensions } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import Body from 'components/presentationals/Body'
import SearchBar from 'components/presentationals/SearchBar'
import CardArticle from 'components/presentationals/CardArticle'
import { t } from 'utils/translation'
import Title from 'components/presentationals/Title'
import * as Animatable from 'react-native-animatable'

export default wrap(
  class Explore extends PureComponent {
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
    isBookmarked = (article) => this.props.bookmarkedList.includes(article) === true

    toggleBookmarked = (article) => {
      const { translation, fullList, removeFromBookmarked, addToast, addToBookmarked } = this.props
      if (this.isBookmarked(article) === true) {
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
    render() {
      const { navigation, translation, theme, fullList, bookmarkedList, doneReadingList, readArticle, search, queryResults, renderList } = this.props
      const { searchQuery } = this.state
      const screenWidth = Dimensions.get('window').width

      return (
        <Fragment>
          <View style={{ height: 45 }}>
            <SearchBar
              type='block'
              placeholder={t('placeholders.search', translation)}
              onInput={this.handleSearch}
              value={searchQuery} theme={theme}
            />
          </View>

          <Body>
              {searchQuery.trim() !== "" && <Text cls={`b fs-4xs gray-2 ${queryResults === 0 ? "mb3" : "mb2"}`}>
                {t(`labels.${queryResults > 1 ? "multipleResults" : queryResults === 0 ? "noResults" : "singleResult"}`, translation, { number: queryResults, query: searchQuery })}
              </Text>
              }
              <ScrollView>
                {(searchQuery.trim() === "" ||  queryResults === 0) && <View cls="flxdr jcsb aic">
                  <Title theme={theme} align="left">{t('labels.explore', translation)}</Title>
                  <Text cls="gray-2 b fs-4xs ph3 pv1 radius-lg bg_blue_2_10">{Object.keys(fullList).length}</Text>
                </View>
                }
                <Animatable.View animation="fadeInUp" delay={50} duration={450} >
                {
                  renderList.slice(0).reverse().map((article, index) => {
                    return <CardArticle
                      key={index}
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
                      bookmarked={this.isBookmarked(article)}
                      icon={"bookmark"}
                      toggleBookmarked={() => this.toggleBookmarked(article)}
                      theme={theme}
                    />
                  })
                }
                </Animatable.View>
              </ScrollView>
            </Body>
        </Fragment>
      )
    }
  }
)