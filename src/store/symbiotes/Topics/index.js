import { createSymbiote } from 'redux-symbiote'
import Fuse from 'fuse.js/src'
import topicsList from 'utils/topics'
import topicsSearchDocs from "./../../../../indices/topics.json"

const topics = {}
topicsList.map(topic => topics[topic] = {
  id: topic,
  followed: false,
})

const initialState = {
  topicToFollowQuery: "",
  list: topics,
  renderList: [],
  queryResult: null,
}

const symbiotes = {
  searchTopicToFollowQuery: (state, payload) => {
    const query = payload.query
    let options = {
      keys: [payload.locale],
      id: 'id',
      shouldSort: false,
      threshold: 0.2
    }
    let newRenderList
    const fuse = new Fuse(topicsSearchDocs, options)
    const searchResult = fuse.search(query)

    if(searchResult.length <= 0 || query.trim() === '') {
      newRenderList = Object.values(state.list).filter(el => el.followed === true)
    } else {
      const followedItems = Object.values(state.list).filter(el => el.followed === true && searchResult.includes(el.id) === true)
      const otherItems = Object.values(state.list).filter(el => el.followed === false && searchResult.includes(el.id) === true)
      newRenderList = [
        ...followedItems,
        ...otherItems
      ]
    }
    return {
      ...state,
      topicToFollowQuery: payload.query,
      renderList: newRenderList,
      queryResult: searchResult.length,
    }
  },
  toggleTopicState: (state, payload) => {

    let newRenderList = [
      ...state.renderList
    ]

    return {
    ...state,
    list: {
      ...state.list,
      [payload]: {
        ...state.list[payload],
        followed: !state.list[payload].followed,
      },
    },
  }
},
}

export const { actions, reducer: topicsReducer } = createSymbiote(initialState, symbiotes, 'app/topics')
