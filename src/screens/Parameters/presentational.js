import React, { PureComponent, Fragment } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'
import Body from 'components/presentationals/Body'
import Switch from 'components/presentationals/Switch'
import Select from 'components/presentationals/Select'
import { t } from 'utils/translation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DARK } from 'utils/theme'
import { globalThemedStylesheet } from "utils/stylesheet"

const themeSystem = {
  separator: {
    light: 'b__gray-0',
    dark: 'b__gray_5',
  },
  icon: 'gray-2'
}

export default wrap(
  class Parameters extends PureComponent {

    render() {
      const { translation, theme, changeLocale, switchTheme } = this.props
      const translationOptions = {}
      const isThemeDarkActivated = theme === DARK

      translation.available.map(locale => translationOptions[locale] = {
        value: locale,
        label: t(`languages.${locale}`, translation)
      })

      return (
        <Body>
          <View cls={`pt2 bb ${themeSystem.separator[theme]} pb3`}>
            <Switch theme={theme} active={isThemeDarkActivated} handleChange={() => switchTheme()}>
                <Fragment>
                  <MaterialCommunityIcons name="weather-night" cls={isThemeDarkActivated ? "blue-0" : themeSystem.icon} size={25} />
                  <Text cls={`${globalThemedStylesheet.text.color[theme]} ml1`}>{isThemeDarkActivated ? t(`labels.darkModeOn`, translation) : t(`labels.darkModeOff`, translation) }</Text>
                </Fragment>
            </Switch>
          </View>
          <View cls={`pt2 bb ${themeSystem.separator[theme]} pb2`}>
            <Select iconColor="gray-2" withIcon={true} iconName="translate" label={t(`labels.language`, translation)} theme={theme} handleChange={(locale) => changeLocale(locale)} value={translation.locale} options={Object.values(translationOptions)} />
          </View>
          <TouchableOpacity cls="pt3">
            <MaterialCommunityIcons name="assistant" cls={themeSystem.icon} size={25} />
            <Text>premium</Text>
          </TouchableOpacity>
        </Body>
      )
    }
  }
)
