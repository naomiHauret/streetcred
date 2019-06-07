import React, { PureComponent } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button as NButton,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native"
import { Transition } from "react-navigation-fluid-transitions"
import { wrap, styles as s } from "react-native-style-tachyons"
import { t } from "utils/translation"
import Button from "components/presentationals/Button"
import Select from "components/presentationals/Select"
import Title from "components/presentationals/Title"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default wrap(
  class Launcher extends PureComponent {
    render() {
      const { translation, topics, toggleTopicState, handleSubmit, changeLocale, theme, switchTheme } = this.props
      const topicsNames = Object.keys(topics)
      const pickedTopics = Object.values(topics).filter((topic) => topic.followed === true).length > 0
      const translationOptions = {}
      translation.available.map(
        (locale) =>
          (translationOptions[locale] = {
            value: locale,
            label: t(`languages.${locale}`, translation),
          }),
      )

      return (
        <Transition appear="right" disappear="flip">
          <View cls="flx-i jcsb" style={{ position: "relative" }}>
            <View cls="asfe pr2" style={{ width: 50 }}>
              <Select
                minimal={true}
                iconColor="gray-2"
                withIcon={true}
                iconName="translate"
                label={t(`labels.language`, translation)}
                theme={theme}
                handleChange={(locale) => changeLocale(locale)}
                value={translation.locale}
                options={Object.values(translationOptions)}
              />
            </View>
            <View cls="asfe pr2" style={{ width: 50 }}>
              <TouchableOpacity cls="ml2" onPress={() => switchTheme()}>
                <MaterialCommunityIcons cls="gray-2" name="weather-night" size={25} />
              </TouchableOpacity>
            </View>

            <View
              cls="aic jcc  mb1 tac"
              style={{
                maxHeight: Dimensions.get("window").height * 0.2,
              }}
            >
              <Image
                cls="rm-contain"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: Dimensions.get("window").width - 20,
                  maxHeight: Dimensions.get("window").height * 0.2,
                }}
                source={
                  theme === "light"
                    ? require("./../../../assets/images/logo_light.png")
                    : require("./../../../assets/images/logo_dark.png")
                }
              />
            </View>
            <View cls="flx-i">
              <Title theme={theme} margin="pt3 pb2" align="center">
                {t("texts.pickTopics", translation)}
              </Title>
              <ScrollView contentContainerStyle={[s.jcc, s.aic, s.flx__i, s.flxw, s.flxdr]}>
                {topicsNames.map((item, index) => (
                  <Button
                    uppercase={false}
                    block={false}
                    theme="secondary"
                    radius="lg"
                    size="sm"
                    align="center"
                    key={index}
                    handleOnPress={(e) => {
                      e.preventDefault()
                      toggleTopicState(item)
                    }}
                    inverted={topics[item].followed}
                    margins="ma1"
                  >
                    {t(`topics.${item}`, translation)}
                  </Button>
                ))}
              </ScrollView>
            </View>
            <View>
              <Button
                handleOnPress={(e) => {
                  e.preventDefault()
                  return handleSubmit()
                }}
                disabled={!pickedTopics}
                uppercase={true}
                block={true}
                radius="default"
                theme="primary"
                align="between"
                inverted={false}
                size="xl"
              >
                {t("labels.startReading", translation)}
              </Button>
            </View>
          </View>
        </Transition>
      )
    }
  },
)
