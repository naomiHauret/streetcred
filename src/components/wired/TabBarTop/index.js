import React, { PureComponent } from 'react'
import { wrap } from "react-native-style-tachyons"
import { TouchableOpacity, Text, View, Dimensions } from 'react-native'
import { BoxShadow } from 'expo-react-native-shadow'
import { connect } from 'react-redux'
import { actions as NavigatorActions } from 'store/symbiotes/Navigator'
import { t } from 'utils/translation'

const mapStateToProps = (state) => ({
  theme: state.theme.current,
  translation: state.translation,
})

const mapDispatchToProps = (dispatch, props) => ({})

const themeSystem = {
  backgrounds: {
    light: 'bg-white-0',
    dark: 'bg-black-2',
  },
  colors: {
    dark: 'white-0',
    light: 'black-1',
  },
}

class TabBarTop extends PureComponent {
  state = {
    activeTab: this.props.navigation.state.routes[0].key,
  }
  setActiveTab = (key) => {
    this.setState({
      activeTab: key,
    })
  }

  render() {
    const { navigation, translation, theme } = this.props
    const { activeTab } = this.state
    const height = 50
    return (
    <BoxShadow setting={{
      width: Dimensions.get('window').width,
      height,
      color: "#417CB2",
      border: 2,
      radius: 0,
      opacity: 0.09,
      x: 0,
      y: 1,
    }}>
      <View style={{ height }} cls={`flxdr  ${themeSystem.backgrounds[theme]}`} >
        {
          navigation.state.routes.map(route => {
              return (route.params && route.params.hidden === true) ? null : <TouchableOpacity cls={`flx-i jcc aic ${activeTab === route.key ? "b--blue-0" : ""}`} style={{ height: '100%', borderBottomWidth: activeTab === route.key ? 4 : 0 }} key={route.key} onPress={() => {
              this.setActiveTab(route.key)
              navigation.navigate(route.key)
            }}>
              <Text cls={`asc lt-sm tac b ${themeSystem.colors[theme]} ${activeTab === route.key ? "o-100" : "o-30"}`}>
                {t(`menu.${route.key}`, translation).toUpperCase()}
              </Text>
            </TouchableOpacity>
          }
          )
        }
      </View>
    </BoxShadow>)
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrap(TabBarTop))
