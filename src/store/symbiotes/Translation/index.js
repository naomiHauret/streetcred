import { Localization } from "expo-localization"
import { createSymbiote } from "redux-symbiote"

//
// Handle UI translation
const locale = Localization.locale.substring(0, 2)
const fallback = "en"

const initialState = {
  locale,
  fallback,
  available: ["fr", "en"],
}

const symbiotes = {
  changeLocale: (state, payload) => {
    return {
      ...state,
      locale: payload,
    }
  },
}
export const { actions, reducer: translationReducer } = createSymbiote(initialState, symbiotes, "app/translation")
