import React from "react"
import { connect } from "react-redux"
import Screen from "./presentational"
import { actions as ContentActions } from "store/symbiotes/Content"
import { actions as ToastrActions } from "store/symbiotes/Toastr"
import { actions as ThemeActions } from "store/symbiotes/Theme"
import { actions as AnswersActions } from "store/symbiotes/Answers"
import { actions as TrackingActions } from "store/symbiotes/Theme"

const mapStateToProps = (state) => ({
  translation: state.translation,
  theme: state.theme.current,
  articles: state.content.articles,
  questions: state.questions.list,
  answers: state.answers.list,
  currentlyReadingList: state.content.currentlyReadingList,
  doneReadingList: state.content.doneReadingList,
  bookmarkedList: state.content.bookmarkedList,
  preferredFontSize: state.content.preferredFontSize,
})

const mapDispatchToProps = (dispatch, props) => ({
  switchTheme: () => dispatch(ThemeActions.switchTheme()),
  decreaseFontSize: () => dispatch(ContentActions.decreaseFontSize()),
  increaseFontSize: () => dispatch(ContentActions.increaseFontSize()),
  addToast: (payload) => dispatch(ToastrActions.add(payload)),
  addToBookmarked: (payload) => dispatch(ContentActions.addToBookmarked(payload)),
  removeFromBookmarked: (payload) => dispatch(ContentActions.removeFromBookmarked(payload)),
  completeArticle: (payload) => dispatch(ContentActions.completeArticle(payload)),
  setProgression: (payload) => dispatch(ContentActions.setProgression(payload)),
  answerToQuestion: (payload) => dispatch(AnswersActions.answerToQuestion(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
