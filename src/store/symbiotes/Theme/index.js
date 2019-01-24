import { createSymbiote } from 'redux-symbiote'
import * as THEMES from './../../../utils/theme'

//
// Handle UI appearance of bottom navbar

const initialState = {
  current: THEMES.LIGHT,
}

const symbiotes = {
  switchTheme: (state) => ({
    ...state,
    current: state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT,
  }),
}
export const { actions, reducer: themeReducer } = createSymbiote(initialState, symbiotes, 'app/theme')
