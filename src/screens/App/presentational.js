import React, { PureComponent } from 'react'
import Navigator from './../../navigator'

export default class App extends PureComponent {
    componentDidMount() {
      this.props.componentDidMount()
    }

    render() {
      return (
        <Navigator />
      )
    }
  }

