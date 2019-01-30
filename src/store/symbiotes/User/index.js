import { createSymbiote } from 'redux-symbiote'

const initialState = {
  checkedIn: false,
}

const symbiotes = {
  checkIn: (state) => ({
    ...state,
    checkedIn: true,
  }),
}

export const { actions, reducer: userReducer } = createSymbiote(initialState, symbiotes, 'app/user')
