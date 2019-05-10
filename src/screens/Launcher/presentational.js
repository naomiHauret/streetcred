import React, { PureComponent } from "react"
import { StyleSheet, Text, View, ScrollView, Button as NButton } from "react-native"
import { Transition } from "react-navigation-fluid-transitions"
import { wrap, styles as s } from "react-native-style-tachyons"
import { t } from "utils/translation"
import Button from "components/presentationals/Button"

export default wrap(
  class Launcher extends PureComponent {
    render() {
      const { translation, topics, toggleTopicState, handleSubmit } = this.props
      const topicsNames = Object.keys(topics)
      const pickedTopics = Object.values(topics).filter((topic) => topic.followed === true).length > 0
      return (
        <Transition appear="right" disappear="flip">
          <View cls="flx-i jcsb">
            <View cls="flx-i">
              <Text cls="pt3 pb2 fs-lg black-0 b tac">{t("texts.pickTopics", translation)}</Text>
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
