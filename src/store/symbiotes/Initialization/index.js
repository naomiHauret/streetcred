import { createSymbiote } from "redux-symbiote"

const initialState = {
  userHasCheckedIn: false,
  internetConnection: false,
}

const symbiotes = {
  // user has chosen his/her topics of interests
  checkIn: (state) => ({
    ...state,
    userHasCheckedIn: true,
  }),
  // set user connection status (connected/disconnected)
  setInternetConnectionStatus: (state, payload) => ({
    ...state,
    internetConnection: payload,
  }),
}

export const { actions, reducer: initializationReducer } = createSymbiote(initialState, symbiotes, "app/initialization")
