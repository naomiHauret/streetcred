import React from "react"
import { wrap } from "react-native-style-tachyons"
import { TouchableOpacity, Text, View, Dimensions } from "react-native"
import { BoxShadow } from "expo-react-native-shadow"
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons"
import { connect } from "react-redux"
import { actions as NavigatorActions } from "store/symbiotes/Navigator"
import { COLOR_BLUE_2 } from "utils/designTokens"

const mapStateToProps = (state) => ({
  activeBottomTab: state.navigator.activeBottomTab,
  theme: state.theme.current,
})

const mapDispatchToProps = (dispatch, props) => ({
  changeTab: (payload) => dispatch(NavigatorActions.changeTab(payload)),
})

const themeSystem = {
  backgrounds: {
    light: "bg-white-0",
    dark: "bg-black-2",
  },
  colors: {
    dark: "white-0",
    light: "black-1",
  },
}

const TabBarBottom = (props) => {
  const { navigation, changeTab, activeBottomTab, activeTintColor, inactiveTintColor, theme } = props
  const height = 50
  return (
    <BoxShadow
      setting={{
        width: Dimensions.get("window").width,
        height,
        color: COLOR_BLUE_2,
        border: 2,
        radius: 0,
        opacity: 0.09,
        x: 0,
        y: -1,
      }}
    >
      <View style={{ height }} cls={`flxdr ${themeSystem.backgrounds[theme]}`}>
        {navigation.state.routes.map((route) => {
          return route.params.hidden === true ? null : (
            <TouchableOpacity
              style={{ height: "100%" }}
              cls="flx-i jcc aic"
              key={route.key}
              onPress={() => {
                changeTab(route.key)
                navigation.navigate(route.key)
              }}
            >
              <Text
                style={{ marginTop: activeBottomTab === route.key ? -10 : 0 }}
                cls={`asc ${themeSystem.colors[theme]} ${activeBottomTab === route.key ? "o-100" : "o-30"}`}
              >
                <MaterialCommunityIcons size={24} name={route.params.icon} />
              </Text>
              {activeBottomTab === route.key && (
                <Octicons cls="blue-0 absolute" style={{ bottom: 1.5 }} name="primitive-dot" size={15} />
              )}
            </TouchableOpacity>
          )
        })}
      </View>
    </BoxShadow>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrap(TabBarBottom))
