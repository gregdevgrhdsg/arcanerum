// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importez vos fichiers de traduction
import translationFR from '../locales/fr/translation.json';
import translationEN from '../locales/en/translation.json';

// Configuration des ressources de traduction
const resources = {
  fr: {
    translation: translationFR,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(LanguageDetector) // Détection de la langue
  .use(initReactI18next) // Passer i18n à react-i18next
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut si la langue détectée n'est pas disponible
    debug: false, // Activer le débogage (à désactiver en production)

    interpolation: {
      escapeValue: false, // React se charge déjà de l'échappement
    },
  });

export default i18n;