import React, { PureComponent } from 'react'
import { TextInput as NativeTextInput, TouchableHighlight, View } from 'react-native'
import { wrap, styles as s } from "react-native-style-tachyons"
import {
  Ionicons
 } from '@expo/vector-icons'

const themeSystem = {
  radius: {
    rounded: 'br5',
    block: 'br0'
  },
  paddings: {
    rounded: 'pl3 pr2',
    block: 'ph2'
  },
  borders: {
    rounded: {
      dark: 'ba b--black-3',
      light: 'ba b--gray-0',
    },
    block: {
      dark: 'bb b--black-3',
      light: 'ba b--black-3',
    },
  },
  backgrounds: {
    dark: 'bg-black-5',
    light: 'bg-white-0',
  },
  colors: {
    dark: 'gray-0',
    light: 'black-1',
  },
  placeholders: {
    dark: 'black-0',
    light: 'gray-3',
  }
}

export default wrap(
  class SearchBar extends PureComponent {
    state = {
      text: this.props.value,

    }
    handleChange = (text) => {
      this.setState({ text })
    }

    render() {
      const { block, size, placeholder, onInput, value, theme, type } = this.props

      return (
        <View cls={`flxdr flx-i jcsb aic ${themeSystem.borders[type][theme]} ${themeSystem.colors[theme]} ${themeSystem.backgrounds[theme]} ${themeSystem.paddings[type]} ${themeSystem.radius[type]}`}>
          <NativeTextInput
            onChangeText={(text) => {
              this.handleChange(text)
              return onInput(text)}
            }
            placeholder={placeholder}
            value={this.state.text}
            clearButtonMode={'always'}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize={'none'}
            cls={`flx-i`}
          />
          <View style={{ width: 50 }} cls='aife pv2 pr2'>
            {this.state.text.trim() !== '' ? <TouchableHighlight onPress={() => {
              this.handleChange('')
              return onInput('')
            }
            }>
              <Ionicons name="ios-close-circle" cls='blue-0' size={20} />
              </TouchableHighlight> : <Ionicons name="ios-search" cls='blue-0' size={20} />
            }
          </View>
        </View>
      )
    }
  }
)