import { createSymbiote } from 'redux-symbiote'
import { accessToken, apiEndpoint } from 'utils/content'

const initialState = {
  loading: false,
  articles: {},
  current: null,
  error: false,
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
  setArticles: (state, payload) => ({
    ...state,
    loading: false,
    articles: payload,
  }),
  toggleBookmarked: (state, payload) => ({
    ...state,
    articles: {
      ...state.articles,
      [payload]: {
        ...state.articles[payload],
        bookmarked: !state.articles[payload].bookmarked,
      },
    },
  }),
  read: (state, payload) => ({
    ...state,
    articles: {
      ...state.articles,
      [payload]: {
        ...state.articles[payload],
        read: true,
      },
    },
    current: payload,
  }),
  complete: (state, payload) => ({
    ...state,
    articles: {
      ...state.articles,
      [payload]: {
        ...state.articles[payload],
        complete: true,
      },
    },
    current: payload,
  }),

}
export const { actions, reducer: contentReducer } = createSymbiote(initialState, symbiotes, 'app/content')
