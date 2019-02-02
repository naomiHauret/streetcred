import { createSymbiote } from 'redux-symbiote'

const initialState = {
  userHasCheckedIn: false,
  internetConnection: false,
}

const symbiotes = {
  setInternetConnectionStatus: (state, payload) => ({
    ...state,
    internetConnection: payload,
  }),
  checkIn: (state) => ({
    ...state,
    userHasCheckedIn: true,
  }),
  changeConnectionStatus: (state, payload) => ({
    ...state,
    internetConnection: payload,
  }),
}

export const { actions, reducer: initializationReducer } = createSymbiote(initialState, symbiotes, 'app/initialization')
