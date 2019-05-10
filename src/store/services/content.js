import Prismic from "prismic-javascript"
import PrismicDOM from "prismic-dom"
import { accessToken, apiEndpoint, linkResolver, htmlSerializer, estimateReadingTime } from "utils/content"

//
// Fetch articles from Prismic API

export const fetch = (load, onSuccess, onFail, topics) => {
  load() // loader ON
  Prismic.api(apiEndpoint, { accessToken }).then((api) => {
    api.query(Prismic.Predicates.at("document.type", "article")).then((response) => {
      if (response) {
        const articles = {}
        response.results.map((result) => {
          let newArticle = {}
          newArticle.id = result.id
          newArticle.title = result.data.title
          newArticle.author = result.data.author
          newArticle.cover = result.data.cover
          newArticle.host = result.data.host
          newArticle.originalLanguage = result.data.original_language
          newArticle.publicationDate = result.data.publication_date
          newArticle.category = result.data.category
          newArticle.tags = result.tags
          newArticle.content = PrismicDOM.RichText.asHtml(result.data.content, linkResolver, htmlSerializer)
          newArticle.durationInMinutes = estimateReadingTime(newArticle.content)
          articles[result.id] = newArticle
        })

        onSuccess({ articles, topics }) // set fresh articles list
      } else {
        return onFail // error
      }
    })
  })
}
