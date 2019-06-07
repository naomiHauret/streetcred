import React, { PureComponent, Fragment } from "react"
import { Text, View } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"
import Button from "components/presentationals/Button"
import Title from "components/presentationals/Title"
import { t } from "utils/translation"

class GoToPremium extends PureComponent {
  render() {
    const { title, translation, theme, navigation } = this.props
    return (
      <Fragment>
        <Title theme={theme} align="center" margin="mt4">
          {title}
        </Title>
        <Text cls="mt2 tac gray-2 fs-3xs" style={{ lineHeight: 20 }}>
          {t("texts.goPremium", translation)}
        </Text>
        <View cls="ph2">
          <Button
            handleOnPress={() => navigation.navigate("Premium")}
            margins="mt3 mb4"
            gradient={true}
            theme="gradient"
            radius="lg"
            align="center"
            style={{ elevation: 15, width: "100%", height: 50 }}
          >
            <Text cls="black-1 lt-lg fs-sm fw9">{t("labels.upgradeToPremium", translation).toUpperCase()}</Text>
          </Button>
        </View>
      </Fragment>
    )
  }
}

export default wrap(GoToPremium)
