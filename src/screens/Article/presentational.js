import React, { PureComponent, Fragment } from "react"
import { Text, ScrollView, View, Dimensions, Image, TouchableOpacity, Alert } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"
import { Transition } from "react-navigation-fluid-transitions"
import { NavigationEvents } from "react-navigation"
import { LinearGradient } from "expo"
import HTMLView from "react-native-htmlview"
import { DateTime } from "luxon"
import * as Animatable from "react-native-animatable"
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import Body from "components/presentationals/Body"
import Button from "components/presentationals/Button"
import Tag from "components/presentationals/Tag"
import { t } from "utils/translation"
import { RADIUS_MD, COLOR_BLUE_0, COLOR_WHITE_0, COLOR_BLACK_3, COLOR_BLACK_2 } from "utils/designTokens"
import { Viewport } from "@skele/components"

const AwareView = Viewport.Aware(View)
const paddingToBottom = 20
const actionButtonSize = 45
const themeSystem = {
  article: {
    bg: {
      light: "bg-white-0",
      dark: "bg-black-2",
    },
    color: {
      light: COLOR_BLACK_2,
      dark: COLOR_WHITE_0,
    },
  },
  progression: {
    bg: {
      light: "bg-gray-0",
      dark: " bg_blue_2_10",
    },
  },
  topbar: {
    bg: {
      dark: "bg-black-4",
      light: "bg-white-0",
    },
    text: {
      dark: "white-0",
      light: "black-2",
    },
    backIcon: {
      dark: "black-2",
      light: "gray-4",
    },
  },
}

export default wrap(
  class Article extends PureComponent {
    state = {
      offsetY: 0,
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
    }
    isBookmarked = (article) => this.props.bookmarkedList.includes(article) === true
    toggleBookmarked = (article) => {
      const { translation, articles, removeFromBookmarked, addToast, addToBookmarked } = this.props
      if (this.isBookmarked(article) === true) {
        addToast({
          id: Date.now(),
          text: t("messages.removeFromBookmarkedSuccess", translation, { article: articles[`${article}`].title }),
        })
        return removeFromBookmarked(article)
      } else {
        addToast({
          id: Date.now(),
          text: t("messages.addToBookmarkedSuccess", translation, { article: articles[`${article}`].title }),
        })
        return addToBookmarked(article)
      }
    }

    setOffsetY = (number) => this.setState({ offsetY: Math.max(20 - 0.2 * number, 0) })

    render() {
      const {
        translation,
        theme,
        navigation,
        articles,
        switchTheme,
        completeArticle,
        setProgression,
        currentlyReadingList,
        doneReadingList,
        bookmarkedList,
        preferredFontSize,
        increaseFontSize,
        decreaseFontSize,
        questions,
        answerToQuestion,
        answers,
        addToast,
      } = this.props
      const articleId = navigation.getParam("articleId", "NO-ID")
      const screenWidth = Dimensions.get("window").width
      const screenHeight = Dimensions.get("window").height
      const percent =
        Object.keys(currentlyReadingList).includes(articleId) &&
        currentlyReadingList[articleId] !== undefined &&
        currentlyReadingList[articleId].progression !== undefined
          ? `${currentlyReadingList[articleId].progression}%`
          : Object.keys(doneReadingList).includes(articleId)
          ? "100%"
          : "0%"
      const bookmarked = this.isBookmarked(articleId)
      const formUID = articles[`${articleId}`].relatedFormUID
      return (
        <Fragment>
          <View>
            <Animatable.View
              transition={"height"}
              style={{
                height:
                  (currentlyReadingList[articleId] !== undefined && currentlyReadingList[articleId].progression) >= 23
                    ? 35
                    : 0,
              }}
            >
              <Animatable.View
                cls={`pv2 aic flxdr jcsb ${themeSystem.topbar.bg[theme]}`}
                delay={50}
                duration={450}
                animation={
                  currentlyReadingList[articleId] !== undefined && currentlyReadingList[articleId].progression >= 23
                    ? "slideInDown"
                    : "slideOutUp"
                }
              >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <MaterialIcons name="arrow-back" cls={`${themeSystem.topbar.backIcon[theme]}`} size={30} />
                </TouchableOpacity>
                <Text cls={`${themeSystem.topbar.text[theme]} asc b fs-2xs flx-i tac`}>
                  {articles[`${articleId}`].title.substring(0, 25)}...
                </Text>
                <View cls="flxdr aic">
                  <TouchableOpacity cls="mr2" onPress={() => switchTheme()}>
                    <MaterialCommunityIcons cls="gray-2" name="weather-night" size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity cls="mr2" onPress={() => this.toggleBookmarked(articleId)}>
                    <MaterialIcons cls="gray-2" name={bookmarked ? "bookmark" : "bookmark-border"} size={25} />
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </Animatable.View>
            <View
              cls={`bg-blue-1 ${
                (currentlyReadingList[articleId] !== undefined && currentlyReadingList[articleId].progression) >= 23
                  ? "mt2"
                  : ""
              }`}
              style={{ width: percent, height: 5, elevation: 15, top: 0, bottom: 0 }}
            />
          </View>
          <Viewport.Tracker>
            <ScrollView
              ref={(ref) => {
                this.myScroll = ref
              }}
              scrollEventThrottle={400}
              onScroll={({ nativeEvent }) => {
                const { layoutMeasurement, contentSize, contentOffset } = nativeEvent
                const position = layoutMeasurement.height + contentOffset.y
                const progression = (position / (contentSize.height - paddingToBottom)) * 100
                this.setOffsetY(contentOffset.y)
                setProgression({ id: articleId, progression, position: contentOffset.y })
                if (this.isCloseToBottom(nativeEvent)) {
                  completeArticle(articleId)
                }
              }}
            >
              <Animatable.View animation="slideInUp" duration={350}>
                <Image
                  cls="absolute"
                  style={{ borderRadius: 0, top: 0, left: 0, width: screenWidth, height: screenHeight - 80 }}
                  source={{ uri: articles[`${articleId}`].cover["2x"].url }}
                />
                <LinearGradient
                  colors={["rgba(41, 41, 65, 0.71)", "transparent"]}
                  style={{ top: 0, left: 0, height: screenHeight - 80 }}
                  cls="absolute w100vw radius-sm"
                />
              </Animatable.View>
              <Animatable.View
                animation={
                  currentlyReadingList[articleId] !== undefined && currentlyReadingList[articleId].progression < 23
                    ? "fadeInUp"
                    : "fadeOutDown"
                }
                delay={25}
                duration={350}
                cls="pl3 pt5"
              >
                <View style={{ top: this.state.offsetY }}>
                  <Tag label={articles[`${articleId}`].category} />
                  <Text cls="fs-r white-0 mt2">{articles[`${articleId}`].host.toUpperCase()}</Text>
                  <Text cls="white-0 mt2">{articles[`${articleId}`].publication}</Text>
                  <Text cls="b fs-lg white-0 mt3">{articles[`${articleId}`].title}</Text>
                  <Text cls="white-0 mt3 i">
                    {t("labels.byAuthor", translation, { author: articles[`${articleId}`].author })}
                  </Text>
                  <Text cls={`white-0 fs-3xs mt2 mb1`}>
                    {DateTime.fromISO(articles[`${articleId}`].publicationDate)
                      .setLocale(translation.locale)
                      .toFormat("ff")}
                  </Text>
                  <View cls="mt2 aic flxdr">
                    <MaterialCommunityIcons size={22} cls="white-0" name="translate" />
                    <Text cls="white-0 ml1 fs-4xs">
                      {t("labels.translatedFromLanguage", translation, {
                        language: t(`languages.${articles[`${articleId}`].originalLanguage}`, translation),
                      })}
                    </Text>
                  </View>
                </View>
              </Animatable.View>
              <View cls="absolute flxdr" style={{ top: 20, right: 20 }}>
                <TouchableOpacity onPress={() => increaseFontSize()}>
                  <MaterialCommunityIcons cls="white-0" name="format-font-size-increase" size={25} />
                </TouchableOpacity>
                <TouchableOpacity cls="mh3" onPress={() => decreaseFontSize()}>
                  <MaterialCommunityIcons cls="white-0" name="format-font-size-decrease" size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchTheme()}>
                  <MaterialCommunityIcons cls="white-0" name="weather-night" size={25} />
                </TouchableOpacity>
              </View>
              <Body theme={theme}>
                <View style={{ top: this.state.offsetY }}>
                  <View style={{ borderRadius: RADIUS_MD, padding: 0, overflow: "hidden" }}>
                    <Animatable.View
                      duration={450}
                      animation="slideInUp"
                      delay={25}
                      cls={`${themeSystem.article.bg[theme]}`}
                      style={{ marginTop: 20, paddingVertical: 30, paddingHorizontal: 20 }}
                      onAnimationBegin={() =>
                        this.myScroll.scrollTo({
                          x: 0,
                          y: Object.keys(currentlyReadingList).includes(articleId)
                            ? currentlyReadingList[articleId].position
                            : 0,
                        })
                      }
                    >
                      <Animatable.View duration={450} animation="fadeInUp" delay={250}>
                        <HTMLView
                          value={articles[`${articleId}`].content}
                          stylesheet={{
                            div: {
                              fontSize: preferredFontSize,
                              fontFamily: "serif",
                            },
                            span: {
                              fontSize: preferredFontSize,
                              fontFamily: "serif",
                            },
                            ul: {
                              color: themeSystem.article.color[theme],
                              fontSize: preferredFontSize,
                              fontFamily: "serif",
                            },
                            li: {
                              color: themeSystem.article.color[theme],
                              fontSize: preferredFontSize,
                              fontFamily: "serif",
                            },
                            ol: {
                              color: themeSystem.article.color[theme],
                              fontSize: preferredFontSize,
                              fontFamily: "serif",
                            },
                            p: {
                              color: themeSystem.article.color[theme],
                              fontSize: preferredFontSize,
                              fontFamily: "serif",
                            },
                            a: {
                              color: COLOR_BLUE_0,
                              textDecoration: "underline",
                              fontSize: preferredFontSize,
                              fontFamily: "serif",
                            },
                          }}
                        />
                      </Animatable.View>
                    </Animatable.View>
                  </View>
                  <Animatable.View
                    duration={550}
                    delay={150}
                    animation={
                      currentlyReadingList[articleId] !== undefined && currentlyReadingList[articleId].progression < 23
                        ? "fadeInDown"
                        : "fadeOutUp"
                    }
                    style={{ elevation: 2, position: "absolute", top: 15, right: 5 }}
                  >
                    <Button
                      style={{ elevation: 15 }}
                      handleOnPress={() => this.toggleBookmarked(articleId)}
                      style={{ width: actionButtonSize, height: actionButtonSize }}
                      gradient={true}
                      theme="gradient"
                      radius="lg"
                      align="center"
                    >
                      <MaterialIcons cls="gray-2" name={bookmarked ? "bookmark" : "bookmark-border"} size={32} />
                    </Button>
                  </Animatable.View>
                </View>
                <AwareView
                  onViewportEnter={() =>
                    !answers.includes(formUID) ? (
                      Alert.alert(
                        t("labels.survey", translation),
                        questions[formUID][translation.locale],
                        [
                          {
                            text: t("labels.yes", translation),
                            onPress: () => {
                              answerToQuestion({ uid: formUID, answer: true })
                              addToast({
                                id: Date.now(),
                                text: t("messages.thankYouForTheAnswer", translation),
                              })
                            },
                          },
                          {
                            text: t("labels.no", translation),
                            onPress: () => {
                              answerToQuestion({ uid: formUID, answer: false })
                              addToast({
                                id: Date.now(),
                                text: t("messages.thankYouForTheAnswer", translation),
                              })
                            },
                          },
                        ],
                        { cancelable: false },
                      )
                    ) : (
                      <GoToPremium
                        navigation={navigation}
                        theme={theme}
                        title={t("labels.bestExperience", translation)}
                        translation={translation}
                      />
                    )
                  }
                ></AwareView>
              </Body>
            </ScrollView>
          </Viewport.Tracker>

          <NavigationEvents
            onDidFocus={(payload) =>
              this.myScroll.scrollTo({
                x: 0,
                y: Object.keys(currentlyReadingList).includes(articleId) ? currentlyReadingList[articleId].position : 0,
              })
            }
          />
        </Fragment>
      )
    }
  },
)
