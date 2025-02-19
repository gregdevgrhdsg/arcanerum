import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import cocktails from "../dataCocktails";

gsap.registerPlugin(ScrollTrigger);

const CocktailDetail = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split("-")[0] || "fr"; // Normalisation ("fr-FR" → "fr")
  const { id } = useParams();
  const navigate = useNavigate();
  const cocktailIndex = cocktails.findIndex((c) => c.id === Number(id));

  // Redirection si l'ID est invalide
  if (cocktailIndex === -1) {
    navigate("/Les-Cocktails");
    return null;
  }

  const cocktail = cocktails[cocktailIndex];
  const previousCocktail = cocktailIndex > 0 ? cocktails[cocktailIndex - 1] : null;
  const nextCocktail = cocktailIndex < cocktails.length - 1 ? cocktails[cocktailIndex + 1] : null;

  const textRef = useRef(null);
  const imageRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  // Animation GSAP (propre, sans conflit)
  useEffect(() => {
    if (!cocktail) return;

    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });

    tl.fromTo(textRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0 });
    tl.fromTo(imageRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, "-=0.4");

    return () => tl.kill(); // Nettoyage propre
  }, [cocktail]);

  const currentSection = cocktail.sections?.[activeSection] || { ingredients: [], method: [] };

  return (
    <section
      className="cocktail-page bg-cover bg-center text-white min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: "url('/assets/jungle/fond-Arcane.webp')",
        backgroundAttachment: "fixed", // Fix pour Chrome
      }}
    >
      {/* Fond transparent */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Flèches de navigation */}
      {previousCocktail && (
        <Link
          to={`/cocktail/${previousCocktail.id}`}
          className="lg:flex fixed left-5 sm:top-1/4 md:top-1/2 lg:top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-black z-30"
        >
          &larr;
        </Link>
      )}
      {nextCocktail && (
        <Link
          to={`/cocktail/${nextCocktail.id}`}
          className="lg:flex fixed right-5 sm:top-1/4 md:top-1/2 lg:top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-black z-30"
        >
          &rarr;
        </Link>
      )}

      <div className="cocktail-detail-container relative flex flex-col lg:flex-row lg:items-center lg:justify-center sm:justify-center w-full max-w-screen-xl z-10">
        {/* Image fixe */}
        <div ref={imageRef} className="flex items-center justify-center">
          <img
            src={cocktail.image}
            alt={cocktail.name?.[currentLang] ?? "Nom inconnu"}
            className="max-w-[80%] object-contain lg:max-w-full"
          />
        </div>

        {/* Détails du cocktail */}
        <div
          className="w-full lg:w-1/2 px-6 py-10 flex flex-col items-center justify-start text-center lg:overflow-y-auto lg:max-h-[80vh]"
          ref={textRef}
        >
          <h1 className="text-4xl text-gold font-yana mb-6">
            {cocktail.name?.[currentLang] ?? "Nom inconnu"}
          </h1>

          {/* Sélecteur de section */}
          <div className="flex justify-center space-x-4 mb-6">
            {cocktail.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`px-4 py-2 text-sm font-yana ${
                  activeSection === index ? "text-gold border-b-2 border-gold" : "text-gray-500"
                }`}
              >
                {section.title?.[currentLang] ?? "Titre inconnu"}
              </button>
            ))}
          </div>

          {/* Contenu de la section */}
          <table className="table-auto w-full text-sm mb-6">
            <thead>
              <tr className="bg-gold text-white">
                <th className="px-4 py-2">Ingredient</th>
                <th className="px-4 py-2">QTY</th>
                <th className="px-4 py-2">Unit</th>
              </tr>
            </thead>
            <tbody>
              {currentSection.ingredients.map((ingredient, index) => (
                <tr key={index} className="border-t text-white">
                  <td className="px-4 py-2">{ingredient.name?.[currentLang] ?? "Ingrédient inconnu"}</td>
                  <td className="px-4 py-2">{ingredient.qty ?? "-"}</td>
                  <td className="px-4 py-2">{ingredient.unit ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="text-2xl text-gold font-yana mb-4">Méthode</h2>
          <ul className="list-disc ml-4 space-y-2">
            {currentSection.method.map((step, index) => (
              <li key={index} className="text-sm text-left text-white">
                {step?.[currentLang] ?? "Étape inconnue"}
              </li>
            ))}
          </ul>

          <Link
            to="/Les-Cocktails"
            className="btn-animated mt-16 px-4 py-2 text-sm font-medium bg-gold text-black rounded-md hover:bg-yellow-500 transition-all duration-300"
          >
            Retour à la liste
          </Link>
        </div>
      </div>

      {/* Éléments de la jungle (corrigés) */}
      <div className="jungle-el-section absolute bottom-10 right-0 sm:w-[20vw] z-[1]">
        <img src="/assets/jungle/layer-feuilledroite2.webp" alt="jungle4" className="w-full h-full object-contain" />
      </div>
      <div className="jungle-el-section absolute bottom-10 right-0 sm:w-[20vw] z-[1]">
        <img src="/assets/jungle/layer-feuilledroite.webp" alt="jungle3" className="w-full h-full object-contain" />
      </div>
      <div className="jungle-el-section absolute sm:top-[10%] bottom-[60%] left-[10%] w-[10vw] z-[10]">
        <img src="/assets/jungle/layer-Bird.webp" alt="jungle5" className="w-full h-full object-contain" />
      </div>
    </section>
  );
};

export default CocktailDetail;