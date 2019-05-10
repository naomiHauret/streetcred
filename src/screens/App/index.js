import React from "react"
import { connect } from "react-redux"
import Screen from "./presentational"
import { actions as ToastrActions } from "store/symbiotes/Toastr"

const mapStateToProps = (state) => ({
  theme: state.theme.current,
  userHasCheckedIn: state.initialization.userHasCheckedIn,
  toastrs: state.toastr.list,
})

const mapDispatchToProps = (dispatch, props) => {
  return {
    removeToast: (payload) => dispatch(ToastrActions.remove(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
