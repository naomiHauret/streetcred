import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import NativeTachyons from 'react-native-style-tachyons'
import { StyleSheet } from 'react-native'
import { configureStore } from './src/store'
import App from './src/screens/App'
import { colors } from './src/styles'
import { customStyles } from './src/styles'

// Redux store
const store = configureStore()

// Styles
NativeTachyons.build({
  rem: 18,
  clsPropName: "cls",
  colors: {
    palette: {
      ...colors,
    }
  },
  customStyles: {
    ...customStyles,
  }
}, StyleSheet)

export default wrappedApp = () => (
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
)
