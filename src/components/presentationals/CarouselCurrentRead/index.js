import React, { PureComponent } from "react"
import { Dimensions } from "react-native"
import Carousel from "react-native-snap-carousel"
import CardCurrentlyReading from "components/presentationals/CardCurrentlyReading"
import { t } from "utils/translation"
import { DateTime } from "luxon"
class CarouselCurrentRead extends PureComponent {
  render() {
    const { list, actions, theme, translation, handleSnapToItem, articles } = this.props
    return (
      <Carousel
        inactiveSlideScale={0.95}
        ref={(c) => {
          this._carousel = c
        }}
        containerCustomStyle={{
          marginLeft: -9,
        }}
        contentContainerCustomStyle={{
          marginLeft: -14,
        }}
        decelerationRate="fast"
        enableMomentum={false}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width - 48}
        data={Object.keys(list)}
        firstItem={0}
        onSnapToItem={handleSnapToItem}
        renderItem={({ item, index }) => {
          return (
            <CardCurrentlyReading
              key={index}
              theme={theme}
              translation={translation}
              category={t(`topics.${articles[item].category}`, translation)}
              host={articles[`${item}`].host}
              publication={DateTime.fromISO(articles[`${item}`].publicationDate)
                .setLocale(translation.locale)
                .toFormat("ff")}
              title={articles[`${item}`].title}
              image={articles[item].cover["2x"].url}
              percentLeft={
                list[item] === undefined || list[item].progression === 0 ? 100 : Math.ceil(100 - list[item].progression)
              }
              timeLeft={
                list[item] === undefined || list[item].progression === 0
                  ? articles[`${item}`].durationInMinutes
                  : Math.ceil((list[item].progression / 100) * articles[`${item}`].durationInMinutes) -
                    articles[`${item}`].durationInMinutes
              }
              bookmarked={actions.isBookmarked(item)}
              content={`${articles[`${item}`].content.replace(/<[^>]*>/g, "").substr(0, 130)}...`}
              goToArticle={() => actions.goToArticle(item)}
              toggleBookmarked={() => actions.toggleBookmarked(item)}
              removeFromReadingList={() => actions.removeFromReadingList(item)}
            />
          )
        }}
      />
    )
  }
}

export default CarouselCurrentRead
