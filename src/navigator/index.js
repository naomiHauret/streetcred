import React from "react"
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from "react-navigation"
import { FluidNavigator } from "react-navigation-fluid-transitions"
import ArticleScreen from "screens/Article"
import ExploreScreen from "screens/Explore"
import ParametersScreen from "screens/Parameters"
import AboutScreen from "screens/About"
import BookmarkedScreen from "screens/Bookmarked"
import PickedForMeScreen from "screens/PickedForMe"
import FollowingScreen from "screens/Following"
import TabBarBottom from "components/wired/TabBarBottom"
import TabBarTop from "components/wired/TabBarTop"

const FeedStack = createMaterialTopTabNavigator(
  {
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
  },
  {
    tabBarComponent: (props) => <TabBarTop {...props} />,
    swipeEnabled: false,
  },
)

const MoreStack = createMaterialTopTabNavigator(
  {
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
  },
  {
    tabBarComponent: (props) => <TabBarTop {...props} />,
    swipeEnabled: false,
  },
)

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
    Bookmarked: {
      screen: BookmarkedScreen,
      params: {
        hidden: false,
        icon: "bookmark",
        key: "bookmark",
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

    Article: {
      screen: ArticleScreen,
      params: {
        hidden: true,
        key: "article",
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
  },
  {
    tabBarComponent: (props) => <TabBarBottom {...props} />,
  },
)

const ArticleStack = createStackNavigator({
  Bottom: MainStack,
})

const AppNavigator = createSwitchNavigator({
  Main: MainStack,
})

const App = FluidNavigator({
  App: AppNavigator,
})

export default (Navigator = createAppContainer(App))
