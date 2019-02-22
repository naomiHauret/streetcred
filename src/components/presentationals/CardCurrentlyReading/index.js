import React, { PureComponent, Fragment } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo'
import Tag from 'components/presentationals/Tag'
import Button from 'components/presentationals/Button'
import { COLOR_BLUE_1, COLOR_GRAY_1 } from 'utils/designTokens'
import { t } from 'utils/translation'

const themeSystem = {
  preview: {
    light: {
      text: 'black-2',
      bg: 'white-0'
    },
    dark: {
      text: 'white-0',
      bg: 'black-3'
    },  },
}
class CardCurrentlyReading extends PureComponent {
  render() {
    const { translation, category, goToArticle, host, title, image, percentLeft, timeLeft, publication, bookmarked, content, toggleBookmarked, theme, removeFromReadingList } = this.props

    return <View
      style={{
        width: Dimensions.get('window').width - 35,
        height: Dimensions.get('window').height - 200,
    }}>
      <Image style={{top: 0, left: 0}} source={{ uri: image }} cls="absolute radius-sm w100vw h100vh" />
      <LinearGradient colors={['rgba(41, 41, 65, 0.71)', 'transparent']} style={{ top: 0, left: 0 }} cls="absolute w100vw h100vh radius-sm" />
      <View cls="flx-i pt3 ph2 white-0">
        <Tag label={category} />
        <Text cls="fs-r white-0 mt2">{host.toUpperCase()}</Text>
        <Text cls="white-0 mt2">{publication}</Text>
        <Text cls="b fs-lg white-0 mt3">{title}</Text>
        <View cls={`mt3 ${themeSystem.preview[theme].bg} radius-sm`}>
          <LinearGradient
           colors={['#FFFFFF', 'transparent']}
           style={{ top: 0, left: 0, height: 55 }}
           cls="absolute w100vw radius-sm" />
          <Text cls={`fs-r ph3 pt2 pb3 ${themeSystem.preview[theme].text}`}>
            {content}
          </Text>
          <View cls="flxdr w100vw absolute" style={{ left: 0, bottom: "-20%",}}>
            <View style={{width: "65%"}}>
              <Button
                theme="primary"
                size="default"
                radius="lg"
                margins="nml2"
                handleOnPress={goToArticle}
              >
                <Text cls="b lt-lg">
                  {t('labels.continue', translation).toUpperCase()}{"\n"}
                </Text>
                <Text cls="fs-4xs">
                  {t('labels.readingLeft', translation, { percent: percentLeft, time: timeLeft  })}
                </Text>
              </Button>
              </View>
              <Button handleOnPress={toggleBookmarked} style={{width: 55, height: 55}} margins="mh1" gradient={true} theme="gradient" radius="lg" align="center">
              <MaterialIcons cls="gray-2" name={bookmarked ? "bookmark" : "bookmark-border" } size={32} />
              </Button>
            <Button handleOnPress={removeFromReadingList} margins="mr1" style={{ width: 55, height: 55 }} gradient={true} theme="gradient" radius="lg" align="center">
              <MaterialIcons cls="gray-2" name="close" size={32} />
            </Button>
          </View>
        </View>
        </View>
    </View>
  }
}


export default wrap(CardCurrentlyReading)