import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as ThemeActions } from 'store/symbiotes/Theme'
import { actions as TranslationActions } from 'store/symbiotes/Translation'

const mapStateToProps = (state) => ({
  translation: state.translation,
  theme: state.theme.current,
})

const mapDispatchToProps = (dispatch, props) => ({
  switchTheme: () => dispatch(ThemeActions.switchTheme()),
  changeLocale: (payload) => dispatch(TranslationActions.changeLocale(payload))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
