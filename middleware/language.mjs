import i18n from "../i18n.mjs";

const defaultLanguage = i18n.en;

export default function languageMiddleware(req, res, next) {
  let languages = req.headers["accept-language"];

  if (languages) {
    languages = languages.substring(0, 2);
  }

  req.l10n = i18n[languages] || defaultLanguage;

  next();
}