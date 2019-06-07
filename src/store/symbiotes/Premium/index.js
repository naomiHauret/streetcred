import { createSymbiote } from "redux-symbiote"

const initialState = {
  isPremium: false, // sorry guys
}

const symbiotes = {}

export const { actions, reducer: premiumReducer } = createSymbiote(initialState, symbiotes, "app/premium")
