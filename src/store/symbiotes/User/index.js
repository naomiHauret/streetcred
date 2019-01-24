import { createSymbiote } from 'redux-symbiote'

const initialState = {
  followedTopics: null
}

const symbiotes = {
  followTopic: (state, payload) => ({
    ...state,
    followedTopics: {
      ...followedTopics,
      [payload.id]: payload.value,
    }
  })
}

const symbiotes = {
  changeLocale: (state, payload) => {
    return ({
      ...state,
      i18n: {
        ...state.i18n,
        locale: payload,
        t: (id) => i18n.translations[payload][id],
      }
    })
  }
}
export const { actions, reducer: translationReducer } = createSymbiote(initialState, symbiotes, 'app/translation')
