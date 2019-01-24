import { Localization } from 'expo-localization'
import { createSymbiote } from 'redux-symbiote'
import dotize from "dotize"
import fr  from './../../../translations/fr'
import en from './../../../translations/en'

//
// Handle UI translation
const locale = Localization.locale.substring(0, 2)
const fallback= 'en'
const i18n = {
  translations: {
    fr: dotize.convert(fr),
    en: dotize.convert(en),
  },
  fallback,
  locale,
  t: (id) => i18n.translations[i18n.locale][id],
}

const initialState = {
 i18n
}

const symbiotes = {
  changeLocale: (state, payload) => {
    return ({
      ...state,
      i18n: {
        ...state.i18n,
        locale: payload,
        t: (id) => i18n.translations[payload][id],
      }
    })
  }
}
export const { actions, reducer: translationReducer } = createSymbiote(initialState, symbiotes, 'app/translation')
