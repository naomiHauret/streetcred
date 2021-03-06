import React from "react"
import { connect } from "react-redux"
import Screen from "./presentational"
import { actions as TranslationActions } from "store/symbiotes/Translation"
import { actions as ThemeActions } from "store/symbiotes/Theme"
import { actions as TopicsActions } from "store/symbiotes/Topics"
import { actions as InitializationActions } from "store/symbiotes/Initialization"

const mapStateToProps = (state) => {
  return {
    translation: state.translation,
    topics: state.topics.list,
    theme: state.theme.current,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    changeLocale: (payload) => dispatch(TranslationActions.changeLocale(payload)),
    switchTheme: () => dispatch(ThemeActions.switchTheme()),
    toggleTopicState: (payload) => dispatch(TopicsActions.toggleTopicState(payload)),
    handleSubmit: () => dispatch(InitializationActions.checkIn()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
