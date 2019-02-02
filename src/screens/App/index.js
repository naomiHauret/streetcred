import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'

const mapStateToProps = (state) => ({
  theme: state.theme.current,
  userHasCheckedIn: state.initialization.userHasCheckedIn,
})

const mapDispatchToProps = (dispatch, props) =>{
  return ({ })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)

