import React, { PureComponent, Fragment } from "react"
import { Text, View, Image, Dimensions } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"
import { MaterialIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo"
import Tag from "components/presentationals/Tag"
import Button from "components/presentationals/Button"
import { COLOR_BLUE_1, COLOR_GRAY_1, COLOR_WHITE_0, COLOR_BLACK_3 } from "utils/designTokens"
import { t } from "utils/translation"
import { BoxShadow } from "expo-react-native-shadow"
import SerifText from "components/presentationals/SerifText"

const themeSystem = {
  preview: {
    light: {
      text: "black-2",
      bg: "bg-white-0",
    },
    dark: {
      text: "white-0",
      bg: "bg-black-3",
    },
  },
  shadow: {
    light: COLOR_WHITE_0,
    dark: COLOR_BLACK_3,
  },
}

const actionButtonSize = 45
class CardCurrentlyReading extends PureComponent {
  render() {
    const {
      translation,
      category,
      goToArticle,
      host,
      title,
      image,
      percentLeft,
      timeLeft,
      publication,
      bookmarked,
      content,
      toggleBookmarked,
      theme,
      removeFromReadingList,
    } = this.props
    return (
      <View
        cls="flx-i"
        style={{
          height: Dimensions.get("window").height - 200,
        }}
      >
        <Image style={{ top: 0, left: 0 }} source={{ uri: image }} cls="absolute radius-sm w100vw h100vh" />
        <LinearGradient
          colors={["rgba(41, 41, 65, 0.71)", "transparent"]}
          style={{ top: 0, left: 0 }}
          cls="absolute w100vw h100vh radius-sm"
        />
        <View cls="flx-i pt3 ph2 white-0">
          <Tag label={category} />
          <Text cls="fs-r white-0 mt2">{host.toUpperCase()}</Text>
          <Text cls="white-0 mt2">{publication}</Text>
          <Text cls="b fs-lg white-0 mt3">{title}</Text>
          <View cls={`mt3 ${themeSystem.preview[theme].bg} radius-md`} style={{ zIndex: 0 }}>
            <LinearGradient
              colors={[themeSystem.shadow[theme], "transparent"]}
              style={{ top: 0, left: 0, height: "60%", zIndex: 1 }}
              cls="absolute w100vw radius-sm"
            />
            <SerifText
              type="serif"
              additionalStyles={`ph3 pt2 pb3 fs-sm ${themeSystem.preview[theme].text}`}
              style={{ zIndex: 0 }}
            >
              {content}
            </SerifText>
            <LinearGradient
              colors={["transparent", themeSystem.shadow[theme]]}
              style={{ bottom: 0, left: 0, height: "60%", zIndex: 1 }}
              cls="absolute w100vw radius-sm"
            />
            <View cls="flxdr w100vw absolute aic jcc" style={{ left: 0, bottom: "-17.5%", zIndex: 2 }}>
              <View style={{ width: "65%" }}>
                <Button
                  theme="primary"
                  size="default"
                  radius="lg"
                  handleOnPress={goToArticle}
                  style={{ elevation: 15 }}
                >
                  <Text cls="b lt-lg">
                    {t("labels.continue", translation).toUpperCase()}
                    {"\n"}
                  </Text>
                  <Text cls="fs-4xs">
                    {t("labels.readingLeft", translation, { percent: percentLeft, time: timeLeft })}
                  </Text>
                </Button>
              </View>
              <Button
                style={{ elevation: 15 }}
                handleOnPress={toggleBookmarked}
                margins="mh1"
                style={{ width: actionButtonSize, height: actionButtonSize }}
                gradient={true}
                theme="gradient"
                radius="lg"
                align="center"
              >
                <MaterialIcons cls="gray-2" name={bookmarked ? "bookmark" : "bookmark-border"} size={32} />
              </Button>
              <Button
                style={{ elevation: 15 }}
                handleOnPress={removeFromReadingList}
                style={{ width: actionButtonSize, height: actionButtonSize }}
                gradient={true}
                theme="gradient"
                radius="lg"
                align="center"
              >
                <MaterialIcons cls="gray-2" name="close" size={32} />
              </Button>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default wrap(CardCurrentlyReading)
