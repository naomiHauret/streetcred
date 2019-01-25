import { combineReducers } from 'redux'
import { translationReducer as translation } from 'store/symbiotes/Translation'
import { initializationReducer as initialization } from 'store/symbiotes/Initialization'
import { navigatorReducer as navigator } from 'store/symbiotes/Navigator'
import { themeReducer as theme } from 'store/symbiotes/Theme'
import { topicsReducer as topics } from 'store/symbiotes/Topics'

export const rootReducer = combineReducers({
  initialization,
  navigator,
  translation,
  theme,
  topics,
})

