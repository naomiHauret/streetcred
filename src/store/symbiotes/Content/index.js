import { createSymbiote } from 'redux-symbiote'
import { DAILY_ARTICLES_NUMBER } from 'utils/const'

const initialState = {
  loading: false,
  articles: {},
  bookmarkedList: [],
  currentlyReadingList: [],
  doneReadingList: [],
  current: null,
  error: false,
  dailyList: {},
}

const symbiotes = {
  load: (state) => ({
    ...state,
    loading: true,
  }),
  errorOnLoad: (state) => ({
    ...state,
    loading: false,
    error: true,
  }),
  setArticles: (state, payload) => {
    const { articles, topics } = payload

    // id for our daily
    const date = new Date()
    const day = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`

   // Daily list article: not in previous daily, not already read or currently read, matches user's interests
    const dailyList = Object.values(articles).filter(article => {
      // check is article matches user's interests (topics corresponding to tags of the article)
      const hasTags = article.tags.map(tag => topics.includes(tag) === true).includes(true) === true

      // check if article isn't already in previous dailies
      const notInFeedList = Object.values(state.dailyList).map(day => {
          if(day.includes(article.id) === false) return article.id
        }
      )
      if (hasTags === true && notInFeedList.includes(article.id) === true && state.bookmarkedList.includes(article.id) === false && state.currentlyReadingList.includes(article.id) === false && state.doneReadingList.includes(article.id) === false ) return article
    }).map(filtered => filtered.id)

        return {
      ...state,
      loading: false,
      articles: articles,
      dailyList: {
        ...state.dailyList,
        [day]: dailyList.length > DAILY_ARTICLES_NUMBER ? dailyList.slice(0, DAILY_ARTICLES_NUMBER - 1) : dailyList,
      }
   }
  },
  addToBookmarked: (state, payload) => ({
    ...state,
    bookmarkedList: [
      ...state.bookmarkedList,
      payload,
    ],
  }),
  removeFromBookmarked: (state, payload) => ({
    ...state,
    bookmarkedList: state.bookmarkedList.filter(article => article.id !== payload)
  }),

  readArticle: (state, payload) => ({
    ...state,
    currentlyReadingList: [
      ...state.currentlyReadingList,
      payload,
    ],
    current: payload,
  }),
  completeArticle: (state, payload) => ({
    ...state,
    currentlyReadingList: state.currentlyReadingList.filter(article => article.id !== payload),
    doneReadingList: [
      ...state.doneReadingList,
      payload,
    ]
  }),

}
export const { actions, reducer: contentReducer } = createSymbiote(initialState, symbiotes, 'app/content')
