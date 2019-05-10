import React, { PureComponent } from "react"
import { TextInput as NativeTextInput, TouchableOpacity, View } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"
import { Ionicons } from "@expo/vector-icons"
import { COLOR_BLACK_0, COLOR_GRAY_3 } from "utils/designTokens"

const themeSystem = {
  radius: {
    rounded: "br5",
    block: "br0",
  },
  paddings: {
    rounded: "pl3 pr2",
    block: "ph2",
  },
  borders: {
    rounded: {
      dark: "ba b--black-2",
      light: "ba b--gray-0",
    },
    block: {
      dark: "bb b--black-3",
      light: "",
    },
  },
  backgrounds: {
    dark: "bg-black-5",
    light: "bg-white-0",
  },
  colors: {
    dark: "gray-0",
    light: "black-1",
  },
  placeholders: {
    dark: COLOR_BLACK_0,
    light: COLOR_GRAY_3,
  },
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
      const { placeholder, onInput, value, theme, type } = this.props

      return (
        <View
          style={{ elevation: type === "block" ? 6 : 0 }}
          cls={`flxdr flx-i jcsb aic ${themeSystem.borders[type][theme]} ${themeSystem.backgrounds[theme]} ${
            themeSystem.paddings[type]
          } ${themeSystem.radius[type]}`}
        >
          <NativeTextInput
            onChangeText={(text) => {
              this.handleChange(text)
              return onInput(text)
            }}
            placeholder={placeholder}
            value={this.state.text}
            clearButtonMode={"always"}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize={"none"}
            cls={`flx-i  ${themeSystem.colors[theme]} `}
            placeholderTextColor={`${themeSystem.placeholders[theme]}`}
          />
          <View style={{ width: 50 }} cls="aife pv2 pr2">
            {this.state.text.trim() !== "" ? (
              <TouchableOpacity
                onPress={() => {
                  this.handleChange("")
                  return onInput("")
                }}
              >
                <Ionicons name="ios-close-circle" cls="blue-0" size={20} />
              </TouchableOpacity>
            ) : (
              <Ionicons name="ios-search" cls="blue-0" size={20} />
            )}
          </View>
        </View>
      )
    }
  },
)
