import React, { PureComponent, Fragment } from "react"
import { Text, ScrollView, View, Image, Linking, Dimensions } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"
import Body from "components/presentationals/Body"
import Title from "components/presentationals/Title"
import Button from "components/presentationals/Button"
import { t } from "utils/translation"
import * as Animatable from "react-native-animatable"
import { globalThemedStylesheet } from "utils/stylesheet"

export default wrap(
  class Premium extends PureComponent {

    render() {
      const { navigation, translation, theme } = this.props
      const sections = ['limits', 'ads', 'surveys']
      return (
        <Fragment>
          <Animatable.View cls="flx-i" animation="fadeInUp">
            <View cls="pt3 ph2">
              <ScrollView>
                <Title theme={theme} align="center" >{t("screens.premium.title", translation)}</Title>
              </ScrollView>
              <View cls="ph2">
                <Button
                  handleOnPress={() => Linking.openURL('https://parlezvousbestial.now.sh')}
                  margins="mt3 mb4"
                  gradient={true}
                  theme="gradient"
                  radius="lg"
                  align="center"
                  style={{ elevation: 15, width: "100%", height: 50 }}
                >
                  <Text cls="black-1 lt-lg fs-sm fw9">
                    {t('labels.upgradeToPremium', translation).toUpperCase()}
                  </Text>
                </Button>
              </View>
            </View>
          <View cls="flx-i">
            <Body theme={theme}>
              <View cls="ph2">
                <Text cls={`f5 fw9 tac ${globalThemedStylesheet.text.color[theme]}`}>{t("screens.premium.advantages", translation)}</Text>
                {sections.map((section, key) => <Fragment key={key}>
                <Title margin="mt3 mb2" theme={theme} align="center">{t(`screens.premium.sections.${section}.title`, translation)}</Title>
                <Text cls={`mb3 tac ${globalThemedStylesheet.text.color[theme]}`}>{t(`screens.premium.sections.${section}.text`, translation)}</Text>
                </Fragment> )}
              </View>
            </Body>
          </View>
          </Animatable.View>
        </Fragment>
      )
    }
  },
)
