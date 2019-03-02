import React from "react"
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from "react-navigation"
import ArticleScreen from "screens/Article"
import ExploreScreen from "screens/Explore"
import ParametersScreen from "screens/Parameters"
import AboutScreen from "screens/About"
import BookmarkedScreen from "screens/Bookmarked"
import PickedForMeScreen from "screens/PickedForMe"
import FollowingScreen from "screens/Following"
import TabBarBottom from "components/wired/TabBarBottom"
import TabBarTop from "components/wired/TabBarTop"

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
  },
  {
      tabBarComponent: (props) => <TabBarTop {...props} />,
  },
)

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
},
  {
    tabBarComponent: (props) => <TabBarTop {...props} />,
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
  },
)

const ArticleStack = createStackNavigator({
  Bottom: MainStack,
})

const AppNavigator = createSwitchNavigator({
  Main: MainStack,
})

export default (Navigator = createAppContainer(AppNavigator))