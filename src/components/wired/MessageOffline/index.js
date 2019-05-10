import React, { PureComponent, Fragment } from "react"
import { connect } from "react-redux"
import { NetInfo } from "react-native"
import { actions as InitializationActions } from "store/symbiotes/Initialization"
import { wrap } from "react-native-style-tachyons"
import Message from "components/presentationals/Message"
import { t } from "utils/translation"

const mapStateToProps = (state) => ({
  translation: state.translation,
})

const mapDispatchToProps = (dispatch, props) => {
  return {
    setConnectionStatus: (payload) => dispatch(InitializationActions.setInternetConnectionStatus(payload)),
  }
}

class MessageOffline extends PureComponent {
  state = {
    isConnected: true,
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener("connectionChange", this.handleConnectionChange)

    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({ isConnected }, () => this.props.setConnectionStatus(isConnected))
    })
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener("connectionChange", this.handleConnectionChange)
  }

  handleConnectionChange = (isConnected) => {
    this.setState({ isConnected }, () => this.props.setConnectionStatus(isConnected))
  }
  render() {
    const { translation } = this.props
    const { isConnected } = this.state
    if (!isConnected) {
      return (
        <Message theme="alert" closable={false}>
          {t("messages.noInternetConnection", translation)}
        </Message>
      )
    }
    return <Fragment />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrap(MessageOffline))
