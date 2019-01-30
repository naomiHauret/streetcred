import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions } from 'store/symbiotes/Initialization'

const mapStateToProps = (state) => ({
  theme: state.theme.current,
})

const mapDispatchToProps = (dispatch, props) =>{
  return ({
  componentDidMount: () => dispatch(actions.init())
})}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)

