import { createSymbiote } from "redux-symbiote"
import { FEED } from "utils/navigation"
//
// Handle UI appearance of bottom navbar

const initialState = {
  activeBottomTab: FEED,
}

const symbiotes = {
  // change active tab on bottom bar
  changeTab: (state, payload) => ({
    ...state,
    activeBottomTab: payload,
  }),
}
export const { actions, reducer: navigatorReducer } = createSymbiote(initialState, symbiotes, "app/navigator")
