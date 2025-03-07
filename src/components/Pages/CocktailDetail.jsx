import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import cocktails from "../dataCocktails";

const CocktailDetail = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split("-")[0] || "fr"; // Normalisation ("fr-FR" → "fr")
  const { t } = useTranslation();
  const translations = {
    fr: {
      method: "MÉTHODE",
      backToList: "RETOUR AUX COCKTAILS",
      ingredients: "Ingrédients",
      quantity: "Quantité",
      unit: "Unité",
      recette: "RECETTE",
    },
    en: {
      method: "METHOD",
      backToList: "BACK TO COCKTAILS",
      ingredients: "Ingredients",
      quantity: "QTY",
      unit: "Unit",
      recette: "RECIPE",
    },
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const cocktailIndex = cocktails.findIndex((c) => c.id === parseInt(id));
  const cocktail = cocktails[cocktailIndex];

  const previousCocktail =
    cocktailIndex > 0 ? cocktails[cocktailIndex - 1] : null;
  const nextCocktail =
    cocktailIndex < cocktails.length - 1 ? cocktails[cocktailIndex + 1] : null;

  const textRef = useRef(null);
  const imageRef = useRef(null);

  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (!cocktail) {
      navigate("/Les-Cocktails");
      return;
    }

    // Animation GSAP pour les éléments de la jungle
    const jungleElements = document.querySelectorAll(".jungle-el-section");
    if (jungleElements.length > 0) {
      jungleElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 50, scale: 1 },
          {
            opacity: 1,
            y: 0,
            scale: 1.3,
            duration: 1,
            ease: "power2.inOut",
            stagger: 0.2,
            transformOrigin: "bottom right",
            scrollTrigger: {
              trigger: element,
              start: "top 100%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }

    // Animation pour le texte et l'image
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    );
  }, [cocktail, activeSection, navigate]);

  if (!cocktail) {
    return (
      <div className="text-center text-gold text-4xl font-yana">
        <p>Cocktail not found!</p>
        <Link to="/Les-Cocktails" className="text-gold underline">
          Back to Cocktails
        </Link>
      </div>
    );
  }

  const currentSection = cocktail.sections?.[activeSection] || { ingredients: [], method: [] };


  return (
    <section
      className="bg-cover bg-center text-white min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: "url('/assets/jungle/fond-ArcaneCocktails.webp')",
        backgroundAttachment: "fixed", // Fix pour Chrome
      }}
    >
      {/* Fond transparent */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Flèches de navigation */}
      {previousCocktail && (
        <Link
          to={`/cocktail/${previousCocktail.id}`}
          className="lg:flex fixed left-5 sm:top-1/3 md:top-1/2 lg:top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-black z-30"
        >
          &larr;
        </Link>
      )}
      {nextCocktail && (
        <Link
          to={`/cocktail/${nextCocktail.id}`}
          className="lg:flex fixed right-5 sm:top-1/3 md:top-1/2 lg:top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-black z-30"
        >
          &rarr;
        </Link>
      )}

      <div className="cocktail-detail-container xl:pl-24 xl:pr-24 sm:pl-0 sm:pr-0 relative flex flex-col lg:flex-row lg:items-center lg:justify-center sm:justify-center w-full max-w-screen-full md:mt-24 sm:mt-24 z-10">
        {/* Image fixe */}
        <div ref={imageRef} className="flex items-center justify-center">
          <img
            src={cocktail.image}
            alt={cocktail.name?.[currentLang] ?? "Nom inconnu"}
            className="xl:pl-0 xl:pr-0 md:pl-0 md:pr-0 sm:pl-16 sm:pr-16 px-8 max-w-[100%] object-contain xl:h-[60vh] lg:h-[60vh] lg:max-w-full"
          />
        </div>

        {/* Détails du cocktail */}
        <div
          className="w-full lg:w-1/2 px-8 py-12 flex flex-col items-center justify-start text-center lg:overflow-y-auto lg:max-h-[80vh]"
          ref={textRef}
        >
          <h1 className="2xl:text-6xl xl:text-4xl lg:text-1xl md:text-3xl sm:text-2xl text-gold font-yana mb-6">
            {cocktail.name?.[currentLang] ?? "Nom inconnu"}
          </h1>
          <h2 className="font-yana text-white 2xl:text-4xl xl:text-xl lg:text-1xl md:1xl sm:text-sm text-gold mb-4">{translations[currentLang].recette}</h2>


          {/* Sélecteur de section */}
          <div className="flex sm:justify-center space-x-4 mb-12">
          
            {cocktail.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`px-2 py-2 sm:text-xs md:text-base 2xl:text-2xl font-yana leading-none  ${activeSection === index ? "text-gold border-b-2 border-gold" : "text-gray-500"
                  }`}
              >
                {section.title?.[currentLang] ?? "Titre inconnu"}
              </button>
            ))}
          </div>

          {/* Contenu de la section */}
          <table className="table-auto w-full text-sm mb-6">
            <thead>
              <tr className="bg-gold text-left font-yana text-white 2xl:text-3xl xl:text-xl lg:text-1xl md:1xl sm:text-sm">
                <th className="px-4 py-2">{translations[currentLang].ingredients}</th>
                <th className="px-4 py-2">{translations[currentLang].quantity}</th>
                <th className="px-4 py-2">{translations[currentLang].unit}</th>
              </tr>
            </thead>
            <tbody>
              {currentSection.ingredients.map((ingredient, index) => (
                <tr key={index} className="border-t text-left  font-yana text-white 2xl:text-3xl xl:text-xl lg:text-1xl md:1xl sm:text-sm">
                  <td className="px-4 py-2">{ingredient.name?.[currentLang] ?? "Ingrédient inconnu"}</td>
                  <td className="px-4 py-2">{ingredient.qty ?? "-"}</td>
                  <td className="px-4 py-2">{ingredient.unit ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="font-yana text-white 2xl:text-4xl xl:text-xl lg:text-1xl md:1xl sm:text-sm text-gold mb-4">{translations[currentLang].method}</h2>
          <ul className="list-disc ml-4 space-y-2">
            {currentSection.method.map((step, index) => (
              <li key={index} className="text-left font-yana leading-none text-white 2xl:text-3xl xl:text-xl lg:text-1xl md:1xl sm:text-sm">
                {step?.[currentLang] ?? "Étape inconnue"}
              </li>
            ))}
          </ul>

          <Link
            to="/Les-Cocktails"
            className="btn-animated mt-16 text-sm font-medium bg-gold text-black rounded-md hover:bg-yellow-500 transition-all duration-300"
          >
            {translations[currentLang].backToList}  </Link>
        </div>
      </div>

      {/* Éléments de la jungle (corrigés) */}
      <div className="jungle-el-section absolute bottom-10 right-0 sm:w-[20vw] z-[1]">
        <img src="/assets/jungle/layer-feuilledroite2.webp" alt="jungle4" className="w-full h-full object-contain" />
      </div>
      <div className="jungle-el-section absolute bottom-10 right-0 sm:w-[20vw] z-[1]">
        <img src="/assets/jungle/layer-feuilledroite.webp" alt="jungle3" className="w-full h-full object-contain" />
      </div>
      <div className="jungle-el-section absolute sm:top-[10%] left-[10%] md:w-[10vw] sm:w-[15vw] z-[10]">
        <img src="/assets/jungle/layer-Bird.webp" alt="jungle5" className="w-full h-full object-contain" />
      </div>
    </section>
  );
};

export default CocktailDetail;
