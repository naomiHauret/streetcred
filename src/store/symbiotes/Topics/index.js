import { createSymbiote } from 'redux-symbiote'

const initialState = {
  topics: null
}

const symbiotes = {
  toggleTopicState: (state, payload) => ({
    ...state,
    topics: null, // map topic, switch id : follow à true ou false
  }),
}

export const { actions, reducer: topicsReducer } = createSymbiote(initialState, symbiotes, 'app/topics')
