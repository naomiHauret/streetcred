import React from "react"
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from "react-navigation"
import ArticleScreen from "screens/Article"
import FirstTimeScreen from "screens/FirstTime"
import ExploreScreen from "screens/Explore"
import ParametersScreen from "screens/Parameters"
import AboutScreen from "screens/About"
import TermsScreen from "screens/Terms"
import BookmarkedScreen from "screens/Bookmarked"
import PickedForMeScreen from "screens/PickedForMe"
import FollowingScreen from "screens/Following"
import TabBarBottom from "components/wired/TabBarBottom"

const InitialStack = createSwitchNavigator({
  FirstTime: FirstTimeScreen,
})

const FeedStack = createMaterialTopTabNavigator({
  PickedForMe: {
    screen: PickedForMeScreen,
    params: {
      key: "feed",
    },
  },
  Following: {
    screen: FollowingScreen,
    params: {
      key: "feed",
    },
  },
})

const MoreStack = createMaterialTopTabNavigator({
  Parameters: {
    screen: ParametersScreen,
    params: {
      key: "parameters",
    },
  },
  About: {
    screen: AboutScreen,
    params: {
      key: "about",
    },
  },
  Terms: {
    screen: TermsScreen,
    params: {
      key: "terms",
    },
  },
})

const MainStack = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedStack,
      params: {
        hidden: false,
        icon: "home-outline",
        key: "feed",
      },
    },
    Explore: {
      screen: ExploreScreen,
      icon: "compass-outline",
      params: {
        hidden: false,
        icon: "compass-outline",
        key: "explore",
      },
    },
    Bookmarked: {
      screen: BookmarkedScreen,
      params: {
        hidden: false,
        icon: "bookmark",
        key: "bookmark",
      },
    },
    More: {
      screen: MoreStack,
      params: {
        hidden: false,
        icon: "dots-horizontal",
        key: "more",
      },
    },
    Article: {
      screen: ArticleScreen,
      params: {
        hidden: true,
        key: "article",
      },
    },
  },
  {
    tabBarComponent: (props) => <TabBarBottom {...props} />,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      inactiveBackgroundColor: "transparent",
      inactiveTintColor: "blue",
      activeTintColor: "red",
    },
  },
)

const ArticleStack = createStackNavigator({
  Bottom: MainStack,
})

const AppNavigator = createSwitchNavigator({
  Init: InitialStack,
  Main: MainStack,
})

export default (Navigator = createAppContainer(AppNavigator))
