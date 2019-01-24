import { createSymbiote } from 'redux-symbiote'

const initialState = {
  ready: false,
}

const symbiotes = {
  init: state => ({
    ...state,
    ready: true,
  }),
}
export const { actions, reducer: initializationReducer } = createSymbiote(initialState, symbiotes, 'app/initialization')
