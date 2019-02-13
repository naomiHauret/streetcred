
import React, { PureComponent } from 'react'
import { Text, FlatList, View, Button } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import { Transition } from 'react-navigation-fluid-transitions'
import Body from 'components/presentationals/Body'
import { t } from 'utils/translation'

export default wrap(
  class PickedForMe extends PureComponent {
    render() {
      const { translation, theme, bookmarkedList, currentlyReadingList, doneReadingList, addToBookmarked, removeFromBookmarked } = this.props
      return (

        <Body>
          <Text>Picked for me screen</Text>
          <Button
            onPress={
              () => this.props.navigation.navigate('Article')
            }
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </Body>
      )
    }
  }
)