import React, { PureComponent, Fragment } from "react"
import { Text, View, Image, TouchableOpacity } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import { COLOR_BLUE_1, COLOR_GRAY_1 } from "utils/designTokens"
import { DateTime } from "luxon"

const themeSystem = {
  title: {
    light: "black-3",
    dark: "white-0",
  },
  publication: {
    light: "gray-2 ",
    dark: "gray-5",
  },
  host: {
    light: "gray-5",
    dark: "gray-2 ",
  },
}
class CardArticle extends PureComponent {
  render() {
    const {
      locale,
      alreadyRead,
      category,
      goToArticle,
      host,
      title,
      image,
      duration,
      publication,
      bookmarked,
      icon,
      toggleBookmarked,
      theme,
    } = this.props

    return (
      <TouchableOpacity onPress={goToArticle} cls="flxdr jcsb pv3">
        <View cls="pr3 flxs1">
          <Text cls="blue-0 fs-4xs mb1">{category.toUpperCase()}</Text>
          <Text cls={`${themeSystem.host[theme]} fs-3xs mt1`}>{host.toUpperCase()}</Text>
          <Text cls={`${themeSystem.title[theme]} b fs-r mt1`}>{title}</Text>
          <Text cls={`${themeSystem.publication[theme]} fs-4xs mt2`}>
            <Text>
              {DateTime.fromISO(publication)
                .setLocale(locale)
                .toFormat("ff")}
            </Text>{" "}
            ● <Text>{duration}</Text>
          </Text>
        </View>
        <View>
          <View cls="aife jcfe" style={{ flexDirection: "row" }}>
            {alreadyRead && <MaterialCommunityIcons cls={`gray-1`} size={25} name="book-open-page-variant" />}
            <TouchableOpacity onPress={toggleBookmarked}>
              <MaterialIcons
                size={27}
                name={icon}
                style={{ color: bookmarked === false || icon === "close" ? COLOR_GRAY_1 : COLOR_BLUE_1 }}
              />
            </TouchableOpacity>
          </View>
          <Image cls="radius-sm mt2 rm-cover" style={{ width: 95, height: 95 }} source={{ uri: image }} />
        </View>
      </TouchableOpacity>
    )
  }
}

export default wrap(CardArticle)
