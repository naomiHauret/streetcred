import React from 'react'
import { TouchableHighlight, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { actions as TranslationActions } from 'store/symbiotes/Translation'
import { actions as NavigatorActions } from 'store/symbiotes/Navigator'

const mapStateToProps = (state) => ({
  i18n: state.translation.i18n,
  activeBottomTab: state.navigator.activeBottomTab,
  theme: state.theme.current,
})

const mapDispatchToProps = (dispatch, props) => ({
  changeTab: (payload) => dispatch(NavigatorActions.changeTab(payload))
})

const TabBarBottom = props => {
  const { navigation, changeTab, activeBottomTab, activeTintColor, inactiveTintColor } = props
  return (
    <View style={{ backgroundColor: "#fff", flexDirection: "row" }}>
    {
      navigation.state.routes.map(route => {
          return (route.params && route.params.hidden === true ) ? null :
            <TouchableHighlight style={{ flex: 1 }} key={route.key} onPress={() => {
              changeTab(route.key)
              navigation.navigate(route.key)
            }}>
              <MaterialCommunityIcons color={activeBottomTab === route.key ? activeTintColor : inactiveTintColor } name={route.params.icon} />
            </TouchableHighlight>
          }
        )
      }
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabBarBottom)
