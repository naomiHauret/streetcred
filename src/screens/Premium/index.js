import React from "react"
import { connect } from "react-redux"
import Screen from "./presentational"

const mapStateToProps = (state) => ({
  translation: state.translation,
  theme: state.theme.current,
})

const mapDispatchToProps = (dispatch, props) => ({ })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
