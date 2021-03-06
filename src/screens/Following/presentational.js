import React, { PureComponent, Fragment } from "react"
import { Text, FlatList, View } from "react-native"
import * as Animatable from "react-native-animatable"
import { wrap, styles as s } from "react-native-style-tachyons"
import Body from "components/presentationals/Body"
import SearchBar from "components/presentationals/SearchBar"
import Button from "components/presentationals/Button"
import { t } from "utils/translation"

const themeSystem = {
  topicName: {
    light: "black-3",
    dark: "white_0",
  },
}
export default wrap(
  class Following extends PureComponent {
    state = {
      searchQuery: this.props.query,
    }

    handleSearch = (text) => {
      this.setState({
        searchQuery: text,
      })
      return this.props.search({
        query: text,
        locale: this.props.translation.locale,
      })
    }

    render() {
      const { translation, topics, theme, toggleTopicState, query, list, searchResultNumber, addToast } = this.props
      const { searchQuery } = this.state
      const followedList = Object.values(topics).filter((el) => el.followed === true)
      const renderList = list.length === 0 ? followedList : list

      return (
        <Fragment>
          <View style={{ height: 45 }} cls="mt3 ph2">
            <SearchBar
              placeholder={t("placeholders.searchTopics", translation)}
              value={searchQuery}
              onInput={this.handleSearch}
              theme={theme}
              type="rounded"
            />
          </View>
          <Body theme={theme}>
            <Text cls="b fs-4xs gray-2">
              {query.trim() === ""
                ? t(`labels.${list.length > 1 ? "multipleFollow" : "singleFollow"}`, translation, {
                    number: renderList.length,
                  })
                : t(
                    `labels.${
                      searchResultNumber > 1
                        ? "multipleResults"
                        : searchResultNumber === 0
                        ? "noResults"
                        : "singleResult"
                    }`,
                    translation,
                    { number: searchResultNumber, query: searchQuery },
                  )}
            </Text>
            {renderList.map((item, index) => {
              let followed
              let handle
              let topicName
              let key
              if (typeof item === "object") {
                followed = topics[item.id].followed === true
                topicName = t(`topics.${item.id}`, translation)
                handle = () => {
                  addToast({
                    id: Date.now(),
                    text: followed
                      ? t(`messages.unfollowSuccess`, translation, { topic: topicName })
                      : t(`messages.followSuccess`, translation, { topic: topicName }),
                  })
                  return toggleTopicState(item.id)
                }
              } else {
                followed = topics[item].followed === true
                topicName = t(`topics.${item}`, translation)
                handle = () => {
                  addToast({
                    id: Date.now(),
                    text: followed
                      ? t(`messages.unfollowSuccess`, translation, { topic: topicName })
                      : t(`messages.followSuccess`, translation, { topic: topicName }),
                  })
                  return toggleTopicState(item)
                }
              }
              const buttonLabel = followed ? t("labels.following", translation) : t("labels.follow", translation)
              return (
                <Animatable.View key={index} animation="fadeInUp" duration={350} delay={50 * (index + 1)}>
                  <View style={[s.flxdr, s.jcsb, s.aic, s.mb2, s.mt2]}>
                    <Text cls={`flx-i ${themeSystem.topicName[theme]}`}>{topicName}</Text>
                    <Button
                      handleOnPress={handle}
                      bold={true}
                      theme="secondary"
                      uppercase={false}
                      inverted={followed}
                      size="sm"
                      radius="lg"
                    >
                      {buttonLabel}
                    </Button>
                  </View>
                </Animatable.View>
              )
            })}
          </Body>
        </Fragment>
      )
    }
  },
)
