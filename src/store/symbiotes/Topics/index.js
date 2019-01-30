import { createSymbiote } from 'redux-symbiote'
import topicsList from 'utils/topics'

const topics = {}
topicsList.map(topic => topics[topic] = {
  followed: false,
})

const initialState = {
  list: topics,
}

const symbiotes = {
  toggleTopicState: (state, payload) => ({
    ...state,
    list: {
      ...state.list,
      [payload]: {
        followed: !state.list[payload].followed,
      },
    },
  }),
}

export const { actions, reducer: topicsReducer } = createSymbiote(initialState, symbiotes, 'app/topics')
