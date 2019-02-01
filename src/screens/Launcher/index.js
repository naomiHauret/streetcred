import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as TranslationActions} from 'store/symbiotes/Translation'
import { actions as ThemeActions } from 'store/symbiotes/Theme'
import { actions as TopicsActions } from 'store/symbiotes/Topics'
import { actions as UserActions } from 'store/symbiotes/User'

const mapStateToProps = (state) => {
  return ({
    translation: state.translation,
    topics: state.topics.list,
    theme: state.theme
  })
}

const mapDispatchToProps = (dispatch, props) => {
  return ({
    changeLocale: (payload) => dispatch(TranslationActions.changeLocale(payload)),
    switchTheme: () => dispatch(ThemeActions.switchTheme()),
    toggleTopicState: (payload) => dispatch(TopicsActions.toggleTopicState(payload)),
    handleSubmit: () => dispatch(UserActions.checkIn()),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)