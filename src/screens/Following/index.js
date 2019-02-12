import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as TopicsActions } from 'store/symbiotes/Topics'
import { actions as ToastrActions } from 'store/symbiotes/Toastr'

const mapStateToProps = (state) => {
  return ({
    translation: state.translation,
    topics: state.topics.list,
    query: state.topics.topicToFollowQuery,
    theme: state.theme.current,
    list: state.topics.renderList,
    searchResultNumber: state.topics.queryResult,
  })
}

const mapDispatchToProps = (dispatch, props) => {
  return ({
    toggleTopicState: (payload) => dispatch(TopicsActions.toggleTopicState(payload)),
    search: (payload) => dispatch(TopicsActions.searchTopicToFollowQuery(payload)),
    addToast: (payload) => dispatch(ToastrActions.add(payload)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)