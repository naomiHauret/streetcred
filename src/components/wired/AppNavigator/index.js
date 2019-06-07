import React, { PureComponent } from "react"
import Navigator from "navigator"
import { connect } from "react-redux"
import { actions as ContentActions } from "store/symbiotes/Content"
import { actions as QuestionsActions } from "store/symbiotes/Questions"
import { store } from "store"
import { fetch as fetchContent } from "store/services/content"
import { getQuestions } from "store/services/questions"

const mapStateToProps = (state) => ({
  topics: Object.values(state.topics.list)
    .filter((topic) => topic.followed === true)
    .map((t) => t.id),
})

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadContent: () => dispatch(ContentActions.load()),
    errorOnLoadContent: () => dispatch(ContentActions.errorOnLoad()),
    setArticles: (payload) => dispatch(ContentActions.setArticles(payload)),
    loadQuestions: () => dispatch(QuestionsActions.load()),
    errorOnLoadQuestions: () => dispatch(QuestionsActions.errorOnLoad()),
    setQuestions: (payload) => dispatch(QuestionsActions.setQuestions(payload)),
  }
}

class AppNavigator extends PureComponent {
  componentDidMount() {
    const {
      loadContent,
      setArticles,
      errorOnLoadContent,
      topics,
      loadQuestions,
      errorOnLoadQuestions,
      setQuestions,
    } = this.props
    fetchContent(loadContent, setArticles, errorOnLoadContent, topics)
    getQuestions(loadQuestions, setQuestions, errorOnLoadQuestions)
  }

  render() {
    return <Navigator />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppNavigator)
