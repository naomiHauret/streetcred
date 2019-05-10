import { createSymbiote } from "redux-symbiote"

const initialState = {
  list: [],
}

const symbiotes = {
  // Add a toastr
  add: (state, payload) => ({
    ...state,
    list: [payload, ...state.list],
  }),
  // Remove a toastr
  remove: (state, payload) => ({
    ...state,
    list: state.list.filter((toast) => toast.id !== payload),
  }),
}
export const { actions, reducer: toastrReducer } = createSymbiote(initialState, symbiotes, "app/toastr")
