import React, { useEffect } from "react";
import gsap from "gsap";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// Configuration inline d'i18next avec les ressources de traduction
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      fr: {
        translation: {
          loader: {
            loading: "Chargement..."
          }
        }
      },
      en: {
        translation: {
          loader: {
            loading: "Loading..."
          }
        }
      }
    },
    lang: "fr", // Langue par défaut (peut être changée dynamiquement)
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });
}

const Loader = ({ progress }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (progress === 100) {
      gsap.to(".loader-container", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          const loaderElement = document.querySelector(".loader-container");
          if (loaderElement) {
            loaderElement.style.display = "none";
          }
        },
      });
    }
  }, [progress]);

  return (
    <div className="loader-container fixed top-0 left-0 w-full h-full bg-black flex flex-col justify-center items-center z-[70]">
      {/* Logo */}
      <img
        src="/assets/monogramArcane.png"
        alt="Logo"
        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-4 object-contain"
      />

      {/* Texte traduit */}
      <div className="text-white mb-4">{t("loader.loading")}</div>

      <div className="w-3/4 md:w-1/2 lg:w-1/3 h-3 bg-gray-700 rounded">
        <div
          className="bg-gold-linear h-full transition-all duration-1000 ease-in-out rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;