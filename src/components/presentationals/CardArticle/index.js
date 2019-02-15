import React, { PureComponent, Fragment } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'

export default wrap(
  class CardArticle extends PureComponent {
    render() {
      const { category, handleOnPress, host, title, image } = this.props
      return  <TouchableOpacity onPress={handleOnPress} cls="flxdr jcsb aic pv3">
        <View>
          <Text cls='blue-0 fs-4xs'>{category.toUpperCase()}</Text>
          <Text cls='gray-5 mb1 fs-3xs'>{host.toUpperCase()}</Text>
          <Text cls='black-3 b fs-r'>{title}</Text>
          <Text>{title}</Text>
        </View>
        <Image cls='radius-sm' style={{ width: 95, height: 95 }} source={{ uri: image }} />
      </TouchableOpacity>
    }
  }
)