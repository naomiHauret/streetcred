import { createSymbiote } from 'redux-symbiote'
import { accessToken, apiEndpoint } from 'utils/content'
//
// Handle UI appearance of bottom navbar

const initialState = {
  loading: false,
  articles: {},
  current: null,
}

const symbiotes = {
  load: (state) => ({
    loading: true,
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
