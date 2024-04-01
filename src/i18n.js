import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector"
import translationEN from "./Languages/en.json"
import translationAR from "./Languages/ar.json"
const resources = {

    ar: {
        translation: translationAR
    },
    en: {
        translation: translationEN
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",

        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

export default i18n;