import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as ContentActions } from 'store/symbiotes/Content'

const mapStateToProps = (state) => ({
  translation: state.translation,
  theme: state.theme.current,
  articles: state.content.articles,
  currentlyReadingList: state.content.currentlyReadingList,
  doneReadingList: state.content.doneReadingList,
})

const mapDispatchToProps = (dispatch, props) => ({
  addToBookmarked: (payload) => dispatch(ContentActions.addToBookmarked(payload)),
  removeFromBookmarked: (payload) => dispatch(ContentActions.removeFromBookmarked(payload)),
  completeArticle: (payload) => dispatch(ContentActions.completeArticle(payload)),
  setProgression: (payload) => dispatch(ContentActions.setProgression(payload)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
