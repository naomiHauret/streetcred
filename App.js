import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import NativeTachyons from 'react-native-style-tachyons'
import { StyleSheet } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor }  from 'store'
import App from 'screens/App'
import { colors } from 'styles'
import { customStyles } from 'styles'

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
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </ReduxProvider>
)
