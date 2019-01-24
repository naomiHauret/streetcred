import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as TranslationActions} from './../../store/symbiotes/Translation'
import { actions as ThemeActions } from './../../store/symbiotes/Theme'

const mapStateToProps = (state) => {
  return ({
    i18n: state.translation.i18n,
  })
}

const mapDispatchToProps = (dispatch, props) => {
  return ({
    changeLocale: (payload) => dispatch(TranslationActions.changeLocale(payload)),
    switchTheme: () => dispatch(ThemeActions.switchTheme())
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)