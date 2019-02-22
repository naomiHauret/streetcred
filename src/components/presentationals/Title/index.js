import React, { PureComponent } from 'react'
import { wrap } from 'react-native-style-tachyons'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

const themeSystem= {
  colors: {
    dark: 'white-0',
    light: 'black-1'
  },
  align: {
    left: 'tal',
    center: 'tac'
  }
}

class Title extends PureComponent {
  render() {
    const { theme, align, margin, children } = this.props
    return <Text cls={`fs-xl b ${margin ? margin : ''} ${themeSystem.colors[theme]} ${themeSystem.align[align]}`}>
      {children}
    </Text>
  }
}

Title.defaultProps = {
  align: 'left'
}

Title.propTypes = {
  align: PropTypes.oneOf(['left', 'center']).isRequired,
  margin: PropTypes.string,
}

export default wrap(Title)
