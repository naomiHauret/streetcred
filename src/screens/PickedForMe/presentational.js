import React, { PureComponent, Fragment } from "react"
import { Text, ScrollView, View, Image, Dimensions } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"
import { Transition } from "react-navigation-fluid-transitions"
import Body from "components/presentationals/Body"
import Title from "components/presentationals/Title"
import Paragraph from "components/presentationals/Paragraph"
import CarouselCurrentRead from "components/presentationals/CarouselCurrentRead"
import CardArticle from "components/presentationals/CardArticle"
import GoToPremium from "components/presentationals/GoToPremium"
import { t } from "utils/translation"
import { DAILY_ARTICLES_NUMBER } from "utils/const"
import * as Animatable from "react-native-animatable"
import { Viewport } from "@skele/components"

const ViewportAwareView = Viewport.Aware(View)

export default wrap(
  class PickedForMe extends PureComponent {
    state = {
      carouselCurrentItem: 0,
    }
    handleDoneReadingViewRef = (ref) => (this.doneReadingView = ref)
    slideIn = () => this.doneReadingView.slideInUp(800)

    isBookmarked = (article) => this.props.bookmarkedList.includes(article) === true
    toggleBookmarked = (article) => {
      const { translation, addToast, removeFromBookmarked, addToBookmarked, fullList } = this.props
      if (this.isBookmarked(article) === true) {
        addToast({
          id: Date.now(),
          text: t("messages.removeFromBookmarkedSuccess", translation, { article: fullList[`${article}`].title }),
        })
        return removeFromBookmarked(article)
      } else {
        addToast({
          id: Date.now(),
          text: t("messages.addToBookmarkedSuccess", translation, { article: fullList[`${article}`].title }),
        })
        return addToBookmarked(article)
      }
    }

    deleteFromReading = (article) => {
      const { translation, addToast, removeFromReadingList, fullList } = this.props
      addToast({
        id: Date.now(),
        text: t("messages.removeFromReadingSuccess", translation, { article: fullList[`${article}`].title }),
      })
      return removeFromReadingList(article)
    }

    handleSnapToItem = (index) => {
      this.setState({
        carouselCurrentItem: index,
      })
    }

    render() {
      const {
        navigation,
        translation,
        theme,
        fullList,
        dailyList,
        bookmarkedList,
        currentlyReadingList,
        doneReadingList,
        addToBookmarked,
        removeFromBookmarked,
        addToast,
        readArticle,
      } = this.props
      const currentReadKeys = Object.keys(currentlyReadingList)

      return (
        <Body theme={theme}>
          {currentReadKeys.length > 0 && (
            <Fragment>
              <View cls="flxdr jcsb aifs">
                <Title theme={theme} align="left" margin="mb3">
                  {t("labels.currentRead", translation)}
                </Title>
                <Text cls="gray-2 b fs-4xs ph3 pv1 radius-lg bg_blue_2_10">
                  {this.state.carouselCurrentItem + 1}/{currentReadKeys.length}
                </Text>
              </View>
              <CarouselCurrentRead
                list={currentlyReadingList}
                handleSnapToItem={this.handleSnapToItem}
                translation={translation}
                theme={theme}
                articles={fullList}
                actions={{
                  goToArticle: (item) => {
                    readArticle(item)
                    return navigation.navigate("Article", { articleId: item })
                  },
                  isBookmarked: (item) => this.isBookmarked(item),
                  toggleBookmarked: (item) => this.toggleBookmarked(item),
                  removeFromReadingList: (item) => this.deleteFromReading(item),
                }}
              />
            </Fragment>
          )}
          <Animatable.View animation="fadeInUp" delay={150} duration={350}>
            <Title theme={theme} align="left" margin={`mb3 ${currentReadKeys.length > 0 ? "mt4" : ""}`}>
              {t("labels.yourDaily", translation, { number: DAILY_ARTICLES_NUMBER })}
            </Title>
            <Paragraph additionalStyles="gray-2">{t("texts.dailyDescription", translation)}</Paragraph>
            <Paragraph additionalStyles="b mb4 gray-2 mt2">
              {t("texts.freemiumRestriction", translation, { number: DAILY_ARTICLES_NUMBER })}
            </Paragraph>
          </Animatable.View>
          <Viewport.Tracker>

          <ScrollView>
            <Animatable.View animation="fadeInUp" delay={250} duration={450}>
              {Object.values(dailyList)
                .slice(0)
                .reverse()
                .map((listIndex, index) => {
                  return (
                    <Fragment key={index}>
                      {listIndex.map((article, articleIndex) => {
                        const isItemBookmarked = this.isBookmarked(article)
                        const isDoneReadingArticle = doneReadingList.includes(article)

                        return (
                          <CardArticle
                            key={articleIndex}
                            category={fullList[`${article}`].category}
                            goToArticle={() => {
                              readArticle(article)
                              return navigation.navigate("Article", { articleId: article })
                            }}
                            locale={translation.locale}
                            host={fullList[`${article}`].host}
                            title={fullList[`${article}`].title}
                            image={fullList[`${article}`].cover.mini.url}
                            duration={t("labels.duration", translation, {
                              duration: fullList[`${article}`].durationInMinutes,
                            })}
                            publication={fullList[`${article}`].publicationDate}
                            bookmarked={isItemBookmarked}
                            icon={isItemBookmarked ? "bookmark" : "bookmark-border"}
                            key={articleIndex}
                            alreadyRead={isDoneReadingArticle}
                            toggleBookmarked={() => this.toggleBookmarked(article)}
                            theme={theme}
                          />
                        )
                      })}
                    </Fragment>
                  )
                })}
              <ViewportAwareView onViewportEnter={this.slideIn}>
                <Animatable.View ref={this.handleDoneReadingViewRef}>
                    <GoToPremium theme={theme} title={t('labels.noLimit', translation)} translation={translation} />
                </Animatable.View>
              </ViewportAwareView>
            </Animatable.View>
          </ScrollView>
          </Viewport.Tracker>
        </Body>
      )
    }
  },
)
