import { createSymbiote } from 'redux-symbiote'

const initialState = {
  list: [],
}

const symbiotes = {
  add: (state, payload) => ({
    ...state,
    list: [
      payload,
      ...state.list,
    ],
  }),
  remove: (state, payload) => ({
    ...state,
    list: state.list.filter(toast => toast.id !== payload)
  }),
}
export const { actions, reducer: toastrReducer } = createSymbiote(initialState, symbiotes, 'app/toastr')
