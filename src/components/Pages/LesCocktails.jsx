import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cocktails from "../dataCocktails"; // Import des cocktails

gsap.registerPlugin(ScrollTrigger);

const LesCocktails = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "fr"; // Normalisation de la langue ("fr-FR" → "fr")

  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Créations");
  const [isLoaded, setIsLoaded] = useState(false);

  // 📌 Mapping des catégories FR / EN
  const categoryMapping = {
    "Créations": { fr: "Créations", en: "Creations" },
    "Revisités": { fr: "Revisités", en: "Twists" }
  };

  // 🏷️ Filtrage des cocktails par catégorie
  useEffect(() => {
    console.log("🌍 Langue actuelle :", lang);
    console.log("🔍 Catégorie sélectionnée :", activeFilter);

    const translatedCategory = categoryMapping[activeFilter]?.[lang] || activeFilter;
    console.log("🔁 Traduction de la catégorie :", translatedCategory);

    const initialFiltered = cocktails.filter(
      (cocktail) => cocktail.category?.[lang] === translatedCategory
    );

    console.log("✅ Cocktails après filtrage initial :", initialFiltered);

    setFilteredCocktails(initialFiltered);
  }, [lang, activeFilter]);

  // ✨ Animation GSAP des cartes cocktails
  useEffect(() => {
    if (filteredCocktails.length > 0) {
      setIsLoaded(true);
      gsap.fromTo(
        ".cocktail-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cocktail-list",
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, [filteredCocktails]);

  // 🛠️ Fonction de filtrage des cocktails
  const filterCocktails = (category) => {
    console.log("🛠️ Changement de filtre :", category);
    console.log("🌍 Langue actuelle :", lang);

    const translatedCategory = categoryMapping[category]?.[lang] || category;
    console.log("🔁 Traduction de la catégorie :", translatedCategory);

    const newFilteredCocktails = cocktails.filter(
      (cocktail) => cocktail.category?.[lang] === translatedCategory
    );

    console.log("✅ Cocktails après filtrage :", newFilteredCocktails);

    setActiveFilter(category);
    setFilteredCocktails(newFilteredCocktails);
  };

  return (
    <section
    className="w-full mx-auto bg-cover bg-fixed flex flex-col items-center justify-start   text-white z-0"
    style={{
        backgroundImage: "url('/assets/jungle/fond-ArcaneCocktails.webp')",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      {/* 🏷️ Titre et description */}
      <div className="ml-10 mr-10 mt-28  2xl:mt-48 items-center justify-center max-w-8xl">
        <h1 className="2xl:text-6xl xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl text-center text-gold font-yana mb-4 font-bold">
          {lang === "fr" ? "NOTRE  SÉLECTION DE COCKTAILS" : "FULL RECIPE LIST"}
        </h1>
        <p className="2xl:text-3xl xl:text-xl lg:text-lg md:text-lg sm:text-sm font-yana text-white mb-8 max-w-4xl text-center">
          {lang === "fr"
            ? "Découvrez notre sélection de cocktails créés sur mesure, conçu pour vous offrir une expérience gustative inoubliable."
            : "Discover our selection of curated cocktails, each one crafted to bring you an unforgettable taste experience."}
        </p>
      </div>

      {/* 🔎 Barre de filtre */}
      <div className="filter-bar w-full flex flex-col items-center mb-8">
    <div className="flex justify-center gap-6">
      {Object.keys(categoryMapping).map((category) => (
        <button
          key={category}
          className={`px-6 py-2 text-lg 2xl:text-3xl font-yana rounded-md border-2 transition-all duration-300
            ${
              activeFilter === category
                ? "bg-gold text-black border-gold shadow-lg scale-110" // Style actif
                : "text-gold border-gold hover:bg-gold hover:text-black hover:scale-105"
            }`}
          onClick={() => filterCocktails(category)}
          aria-label={`Filtrer par ${category}`}
        >
          {categoryMapping[category][lang] || category} {/* 🔹 Utilisation de la traduction */}
        </button>
      ))}
    </div>
</div>

      {/* 🍹 Liste des cocktails */}
      <div className="cocktail-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 2xl:max-w-[80vw] 2xl:gap-12p x-6 ">       
         {filteredCocktails.length > 0 ? (
          filteredCocktails.map((cocktail) => (
            <Link
              to={`/cocktail/${cocktail.id}`}
              key={cocktail.id}
              aria-label={`Voir les détails de ${cocktail.name?.[lang] || cocktail.name?.["fr"]}`}
            >
              <div className={`cocktail-card bg-transparent justify-center p-0 transition-opacity ${isLoaded ? "" : "opacity-0"}`}>
                <img
                  src={cocktail.imageB}
                  alt={cocktail.name?.[lang] || "Cocktail"}
                  className="object-contain mb-4 2xl:w-[25vw]  xl:w-[20vw] md:w-80 lg:w-96"
                />
                <h2 className="text-md leading-none 2xl:text-4xl xl:text-2xl lg:text-xl md:text-lg sm:text-sm text-gold font-semibold mb-1 text-center">
                  {cocktail.name?.[lang] ?? "Nom inconnu"}
                </h2>
                <p className="2xl:text-2xl xl:text-xl lg:text-xl md:text-lg sm:text-sm text-gold font-yana">
                  {cocktail.category?.[lang] ?? "Catégorie inconnue"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-lg text-center text-white">Aucun cocktail trouvé.</p>
        )}
      </div>
    </section>
  );
};

export default LesCocktails;