import React from "react"
import { connect } from "react-redux"
import Screen from "./presentational"
import { actions as ContentActions } from "store/symbiotes/Content"
import { actions as ToastrActions } from "store/symbiotes/Toastr"

const mapStateToProps = (state) => ({
  translation: state.translation,
  theme: state.theme.current,
  fullList: state.content.articles,
  bookmarkedList: state.content.bookmarkedList,
  doneReadingList: state.content.doneReadingList,
  currentlyReadingList: state.content.currentlyReadingList,
  query: state.content.queryBookmarked,
  queryResults: state.content.queryBookmarkedResultsNumber,
  renderList: state.content.renderQueryBookmarks,
})

const mapDispatchToProps = (dispatch, props) => ({
  addToast: (payload) => dispatch(ToastrActions.add(payload)),
  addToBookmarked: (payload) => dispatch(ContentActions.addToBookmarked(payload)),
  removeFromBookmarked: (payload) => dispatch(ContentActions.removeFromBookmarked(payload)),
  readArticle: (payload) => dispatch(ContentActions.readArticle(payload)),
  search: (payload) => dispatch(ContentActions.searchBookmarks(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
