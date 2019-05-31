import React, { PureComponent, Fragment } from "react"
import { ScrollView, View, Text, Image, Dimensions } from "react-native"
import { wrap, styles as s } from "react-native-style-tachyons"
import Body from "components/presentationals/Body"
import { t } from "utils/translation"
import Title from "components/presentationals/Title"
import Paragraph from "components/presentationals/Paragraph"
import * as Animatable from "react-native-animatable"
import { withNavigationFocus } from 'react-navigation'
import { globalThemedStylesheet } from "utils/stylesheet"
import { DAILY_ARTICLES_NUMBER, PREMIUM_PRICE } from "utils/const"
import Button from "components/presentationals/Button"

export default withNavigationFocus(
  wrap(
    class About extends PureComponent {

      render() {
        const { navigation, translation, theme } = this.props
        const screenWidth = Dimensions.get("window").width
        const sections = [ "aboutStreetCred", "premium", "private", "ads" ]
        return (
          <Fragment>
          <Body theme={theme}>
              {this.props.isFocused && <Animatable.View cls="aifs mt3 mb4" style={{
                width: screenWidth,
                maxHeight: Dimensions.get("window").height * 0.4
              }} animation="fadeInUp" delay={50} duration={350}>
                    <Image
                      cls="rm-contain"
                      style={{
                        width: screenWidth - 20,
                        maxHeight: Dimensions.get("window").height * 0.4
                      }}
                      source={require("./../../../assets/images/welcome.png")}
                    />
                </Animatable.View>
              }
              {this.props.isFocused && <Animatable.View animation="fadeInUp" delay={150} duration={250}>
                {sections.map((section, key)=> <View key={key}>
                    <Title theme={theme} align="left" margin="mb3">{t(`screens.about.${section}.title`, translation)}</Title>
                    <Paragraph additionalStyles={`${globalThemedStylesheet.text.color[theme]} ${ section === "premium" ? "" : "mb4"}`}>
                      {t(`screens.about.${section}.text`, translation, { price: PREMIUM_PRICE, number: DAILY_ARTICLES_NUMBER })}
                      </Paragraph>
                      {section === "premium" && <Button
                        style={{ elevation: 15 }}
                        handleOnPress={() => navigation.navigate('Premium')}
                        margins="mb4"
                        gradient={true}
                        theme="gradient"
                        radius="lg"
                        align="center"
                        style={{ width: "100%", height: 50 }}
                      >
                        <Text cls="black-1 lt-lg fs-sm fw9">
                          {t('labels.upgradeToPremium', translation).toUpperCase()}
                        </Text>
                      </Button>}
                  </View>)}
                </Animatable.View>}
              </Body>
          </Fragment>
        )
      }
    },
  )
)