import React, { PureComponent } from 'react'
import Navigator from 'navigator'
import { connect } from 'react-redux'
import { actions as ContentActions } from 'store/symbiotes/Content'
import { store } from 'store'
import { fetch } from 'store/services/content'

const mapStateToProps = (state) => ({
  topics: Object.values(state.topics.list).filter(topic => topic.followed === true).map(t => t.id),
})

const mapDispatchToProps = (dispatch, props) => {
  return ({
    load: () => dispatch(ContentActions.load()),
    errorOnLoad: () => dispatch(ContentActions.errorOnLoad()),
    setArticles: (payload) => dispatch(ContentActions.setArticles(payload)),
  })
}

class AppNavigator extends PureComponent {
    componentDidMount() {
      const { load, setArticles, errorOnLoad, topics } = this.props
      fetch(load, setArticles, errorOnLoad, topics)
    }

    render() {
      return (
        <Navigator />
      )
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppNavigator)

