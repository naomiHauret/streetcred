import { combineReducers } from 'redux'
import { translationReducer as translation } from './Translation'
import { initializationReducer as initialization } from './Initialization'
import { navigatorReducer as navigator } from './Navigator'
import { themeReducer as theme } from './Theme'

export const rootReducer = combineReducers({
  initialization,
  navigator,
  translation,
  theme,
})

