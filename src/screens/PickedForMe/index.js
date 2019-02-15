import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as ContentActions } from 'store/symbiotes/Content'

const mapStateToProps = (state) => ({
  translation: state.translation,
  theme: state.theme.current,
  fullList: state.content.articles,
  bookmarkedList: state.content.bookmarkedList,
  currentlyReadingList: state.content.currentlyReadingList,
  doneReadingList: state.content.doneReadingList,
  dailyList: state.content.dailyList,
})

const mapDispatchToProps = (dispatch, props) => ({
  addToBookmarked: (payload) => dispatch(ContentActions.addToBookmarked(payload)),
  removeFromBookmarked: (payload) => dispatch(ContentActions.removeFromBookmarked(payload)),
  readArticle: (payload) => dispatch(ContentActions.readArticle(payload)),
  completeArticle: (payload) => dispatch(ContentActions.completeArticle(payload)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
