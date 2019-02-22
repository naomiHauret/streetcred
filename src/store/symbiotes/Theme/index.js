import { createSymbiote } from 'redux-symbiote'
import * as THEMES from 'utils/theme'

//
// Handle UI appearance

const initialState = {
  current: THEMES.LIGHT,
}

const symbiotes = {
  // Change theme
  switchTheme: (state) => ({
    ...state,
    current: state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT,
  }),
}
export const { actions, reducer: themeReducer } = createSymbiote(initialState, symbiotes, 'app/theme')
