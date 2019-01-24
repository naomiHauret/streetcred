import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as TranslationActions } from './../../store/symbiotes/Translation'

const mapStateToProps = (state) => ({
  i18n: state.translation.i18n,
})

const mapDispatchToProps = (dispatch, props) => ({
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
