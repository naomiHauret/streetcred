import React, { PureComponent } from 'react'
import { ScrollView } from 'react-native'
import { wrap, styles as s } from 'react-native-style-tachyons'

export default wrap(
  class Body extends PureComponent {
    render() {
      return (
        <ScrollView contentContainerStyle={[s.pt3, s.ph2, s.pb3, s.flx__i, ]}>
          {this.props.children}
        </ScrollView>
      )
    }
  }
)

