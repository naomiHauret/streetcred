import React, { PureComponent } from 'react'
import { Picker, View, Text } from 'react-native'
import { wrap } from 'react-native-style-tachyons'
import { FontAwesome } from '@expo/vector-icons'
import { globalThemedStylesheet } from "utils/stylesheet"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

class Select extends PureComponent {
  state = {
    value: this.props.value
  }
  changeValue = (itemValue) => {
    this.setState({value: itemValue})
    return this.props.handleChange(itemValue)
  }
  render() {
    const { options, theme, label, withIcon, iconName, iconColor } = this.props
    const { value } = this.state

    return <View cls="flxdr aic">
      <View cls="flxdr aic">
        {withIcon === true && <MaterialCommunityIcons cls={`${iconColor} mr1`} name={iconName} size={20} />}
        <Text cls={`${globalThemedStylesheet.text.color[theme]} aic`}>{label}</Text>
      </View>
      <Picker
        cls={`ml1 ${globalThemedStylesheet.text.color[theme]} flx-i`}
        style={{ backgroundColor: 'transparent' }}
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) =>this.changeValue(itemValue, itemIndex)  }
        >
        {options.map((option, index) => <Picker.Item
          key={index}
          label={option.label}
          value={option.value}
      />)}
    </Picker>
      <FontAwesome name="caret-down" size={15} cls={`asc ${globalThemedStylesheet.text.color[theme]}`} />
    </View>
  }
}

export default wrap(Select)