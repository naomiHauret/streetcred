import dotize from "dotize"
import fr from "translations/fr"
import en from "translations/en"

const langs = {
  en: dotize.convert(en),
  fr: dotize.convert(fr),
}

export const t = (id, translation) => Object.keys(langs).includes(translation.locale) ? langs[translation.locale][id] : langs[translation.fallback][id]
