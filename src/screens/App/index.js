import React from 'react'
import { connect } from 'react-redux'
import Screen from './presentational'
import { actions as ToastrActions } from 'store/symbiotes/Toastr'
import { actions as ContentActions } from 'store/symbiotes/Content'


const mapStateToProps = (state) => ({
  theme: state.theme.current,
  userHasCheckedIn: state.initialization.userHasCheckedIn,
  toastrs: state.toastr.list,
})

const mapDispatchToProps = (dispatch, props) =>{
  return ({
    removeToast: (payload) => dispatch(ToastrActions.remove(payload)),
    load: () => dispatch(ContentActions.load()),
    errorOnLoad: () => dispatch(ContentActions.errorOnLoad()),
    setArticles: (payload) => dispatch(ContentActions.setArticles(payload)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)

