import React, { PureComponent, Fragment } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import { MaterialIcons } from '@expo/vector-icons'
import { COLOR_BLUE_1, COLOR_GRAY_1 } from 'utils/designTokens'

const themeSystem = {
  title: {
    light: 'black-3',
    dark: 'white-0',
  },
}
class CardCurrentlyReading extends PureComponent {
  render() {
    const { category, goToArticle, host, title, image, duration, publication, bookmarked, icon, toggleBookmarked, theme } = this.props

    return <TouchableOpacity onPress={goToArticle} cls="flxdr jcsb pv3">

      <View cls="pr3 flxs1">
        <Text cls='blue-0 fs-4xs mb1'>{category.toUpperCase()}</Text>
        <Text cls='gray-5 fs-3xs mt1'>{host.toUpperCase()}</Text>
        <Text cls={`${themeSystem.title[theme]} b fs-r`}>{title}</Text>
        <Text cls="gray-2 fs-4xs mt2"><Text>{publication}</Text> ● <Text>{duration}</Text></Text>
      </View>
      <View>
        <TouchableOpacity onPress={toggleBookmarked} cls="aife">
          <MaterialIcons size={27} name={icon} style={{ color: bookmarked === false || icon === 'remove' ? COLOR_GRAY_1 : COLOR_BLUE_1 }} />
        </TouchableOpacity>
        <Image cls='radius-sm mt2 rm-cover' style={{ width: 95, height: 95 }} source={{ uri: image }} />
      </View>
    </TouchableOpacity>
  }
}


export default wrap(CardArticle)