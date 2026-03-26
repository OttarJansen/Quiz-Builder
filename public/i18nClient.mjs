import noLang from "./localization/no.json" assert { type: "json" };
import enLang from "./localization/en.json" assert { type: "json" };

const LANGS = {
    no: noLang,
    en: enLang
};

const browserLang = navigator.language.substring(0, 2);
const i18n = LANGS[browserLang] || enLang;

export default i18n;