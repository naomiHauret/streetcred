import { createSymbiote } from 'redux-symbiote'
import { DAILY_ARTICLES_NUMBER } from 'utils/const'
import Fuse from 'fuse.js/src'

const initialState = {
  loading: false, // loading from Prismic indicator
  articles: {}, // all our articles
  bookmarkedList: [], // bookmarked articles list
  currentlyReadingList: [], // articles that are currently read by the user
  doneReadingList: [], // articles already read by the user
  error: false, // loading error
  dailyList: {},  // daily article feed
  pickedList: [], // picked articles
  bookmarkedSearchIndex: [],
  queryBookmarked: "",
  queryBookmarkedResultsNumber: null,
  exploreSearchIndex: [],
  queryExplore: "",
  queryExploreResultsNumber: null,
  renderQueryBookmarks: [],
  renderQueryExplore: [],
}

const symbiotes = {
  // Loading indicator for articles
  load: (state) => ({
    ...state,
    loading: true,
  }),

  // Error on articles loading
  errorOnLoad: (state) => ({
    ...state,
    loading: false,
    error: true,
  }),

  // Set daily feed from prismic
  setArticles: (state, payload) => {
    const { articles, topics } = payload
    // id for our daily
    const date = new Date()
    const newPickList = []
    let dailyList
    const day = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`

    if (state.dailyList[day] !== undefined) {
      dailyList = state.dailyList[day]
    } else {
      let notInFeedList = []
      let hasTags

      dailyList = Object.values(articles).filter(article => {
        // check is article matches user's interests (topics corresponding to tags of the article)
        hasTags = article.tags.map(tag => topics.includes(tag) === true).includes(true) === true
        if (hasTags === true && state.pickedList.includes(article.id) === false && state.bookmarkedList.includes(article.id) === false && Object.keys(state.currentlyReadingList).includes(article.id) === false && state.doneReadingList.includes(article.id) === false) {
          newPickList.push(article.id)
          return article
        }
      }).map(filtered => filtered.id)
      dailyList = dailyList.length > DAILY_ARTICLES_NUMBER ? dailyList.slice(0, DAILY_ARTICLES_NUMBER - 1) : dailyList
    }

      const searchIndex = Object.values(articles).map(article => ({
        id: article.id,
        title: article.title,
        author: article.author,
        host: article.host,
        category: article.category,
        tags: article.tags,
      }))

      return {
        ...state,
        loading: false,
        articles: {
          ...articles,
        },
        dailyList: {
          ...state.dailyList,
          [day]: dailyList,
        },
        pickedList: [
          ...state.pickedList,
          ...newPickList
        ],
        exploreSearchIndex: {
          ...state.exploreSearchIndex,
          ...searchIndex
        },
        renderQueryExplore: [
          ...Object.keys(articles),
        ],
   }
  },

  // Add to bookmarked content list
  addToBookmarked: (state, payload) => ({
      ...state,
      bookmarkedList: [
        ...state.bookmarkedList,
        payload,
      ],
      bookmarkedSearchIndex: {
        ...state.bookmarkedSearchIndex,
        [payload]: {
          id: payload,
          title: state.articles[payload].title,
          author: state.articles[payload].author,
          host: state.articles[payload].host,
          category: state.articles[payload].category,
          tags: state.articles[payload].tags,
        }
      }
    }),

  // Remove from bookmarked content list
  removeFromBookmarked: (state, payload) => ({
    ...state,
    bookmarkedList: state.bookmarkedList.filter(article => article !== payload),
    bookmarkedSearchIndex: {
      ...state.bookmarkedSearchIndex,
      [payload]: undefined,
    },
  }),

  // Add to current read list
  readArticle: (state, payload) => {
    const article = {
      ...state.currentlyReadingList[payload],
      id: payload,
    }

    if (!Object.keys(state.currentlyReadingList).includes(payload)) {
      article.progression = 0
      article.position = 0
    }
    return {
      ...state,
      currentlyReadingList: {
        ...state.currentlyReadingList,
        [payload]: article,
      },
    }
  },

  // Update reading progression of content in percent
  setProgression: (state, payload) => ({
    ...state,
    currentlyReadingList: {
      ...state.currentlyReadingList,
      [payload.id]: {
        ...state.currentlyReadingList[payload.id],
        progression: payload.progression,
        position: payload.position,
      },
    }
  }),

  // Remove article from reading list, add it to done list
  completeArticle: (state, payload) => ({
    ...state,
    currentlyReadingList: {
      ...state.currentlyReadingList,
      [payload] : undefined
    },
    doneReadingList: [
      ...state.doneReadingList,
      payload,
    ]
  }),
  removeFromReadingList: (state, payload) => {
    const newCurrentlyReadingList = {}
    Object.keys(state.currentlyReadingList).reduce((object, key) => {
      if (key !== payload) {
        newCurrentlyReadingList[key] = state.currentlyReadingList[key]
      }
    }, {})
    return {
      ...state,
      currentlyReadingList: newCurrentlyReadingList,
    }
  },
  searchBookmarks: (state, payload) => {
    const query = payload.query
    let options = {
      keys: ["title", "author", "host", "category", "tags"],
      shouldSort: true,
      threshold: 0.2
    }
    let newRenderList
    const fuse = new Fuse(Object.values(state.bookmarkedSearchIndex), options)
    const searchResult = fuse.search(query)

    if (searchResult.length <= 0 || query.trim() === '') {
      newRenderList = state.bookmarkedList
    } else {
      newRenderList = searchResult.map(result => result.id)
    }

    return  {
      ...state,
      queryBookmarked: payload.query,
      renderQueryBookmarks: newRenderList,
      queryBookmarkedResultsNumber: searchResult.length,
    }
  },
  searchThroughExplore: (state, payload) => {
    const query = payload.query
    let options = {
      keys: ["title", "author", "host", "category", "tags"],
      shouldSort: true,
      threshold: 0.2
    }
    let newRenderList
    const fuse = new Fuse(Object.values(state.exploreSearchIndex), options)
    const searchResult = fuse.search(query)

    if (searchResult.length <= 0 || query.trim() === '') {
      newRenderList = Object.keys(state.articles)
    } else {
      newRenderList = searchResult.map(result => result.id)
    }

    return {
      ...state,
      queryExplore: payload.query,
      renderQueryExplore: newRenderList,
      queryExploreResultsNumber: searchResult.length,
    }
  },
}
export const { actions, reducer: contentReducer } = createSymbiote(initialState, symbiotes, 'app/content')
