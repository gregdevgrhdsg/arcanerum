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
  
  // Vérification des données
  console.log("📦 Données `cocktails` importées :", cocktails);
  
  // Initialisation des états
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Créations");

  useEffect(() => {
    console.log("🌍 Langue actuelle :", lang);
    console.log("🔍 Catégorie sélectionnée :", activeFilter);
  
    // Correspondance entre les noms de catégories en français et en anglais
    const categoryMapping = {
      "Créations": { fr: "Créations", en: "Creations" },
      "Revisités": { fr: "Revisités", en: "Twists" }
    };
  
    // Traduire la catégorie active
    const translatedCategory = categoryMapping[activeFilter]?.[lang] || activeFilter;
  
    console.log("🔁 Traduction de la catégorie :", translatedCategory);
  
    const initialFiltered = cocktails.filter(
      (cocktail) => cocktail.category?.[lang] === translatedCategory
    );
  
    console.log("✅ Cocktails après filtrage initial :", initialFiltered);
  
    setFilteredCocktails(initialFiltered);
  }, [lang, activeFilter]);
  // Nettoyage des animations GSAP lors du montage/démontage
  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  // Animation GSAP des cocktails une fois affichés
  useEffect(() => {
    if (filteredCocktails.length > 0) {
      setTimeout(() => {
        const cards = document.querySelectorAll(".cocktail-card");
        console.log("🔎 Vérification des cartes GSAP :", cards);
        
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".cocktail-list",
                start: "top 80%",
              },
            }
          );
        }
      }, 500);
    } else {
      console.log("🚨 `filteredCocktails` est vide, GSAP ne sera pas exécuté.");
    }
  }, [filteredCocktails]);

  // Fonction de filtrage des cocktails
  const filterCocktails = (category) => {
    console.log("🛠️ Changement de filtre :", category);
    console.log("🌍 Langue actuelle :", lang);
    
    const newFilteredCocktails = cocktails.filter(
      (cocktail) => cocktail.category?.[lang] === category
    );

    console.log("✅ Cocktails après filtrage :", newFilteredCocktails);
    
    setActiveFilter(category);
    setFilteredCocktails(newFilteredCocktails);
  };

  return (
    <section
      className="cocktail-page bg-cover bg-center flex flex-col items-center justify-start text-white z-0"
      style={{
        backgroundImage: "url('/assets/jungle/fond-Arcane.webp')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Titre et description */}
      <div className="ml-10 mr-10 mt-40 items-center justify-center">
        <h1 className="2xl:text-6xl xl:text-4xl lg:text-lg md:text-3xl sm:text-2xl text-center text-gold font-yana mb-4 font-bold">
          {lang === "fr" ? "LISTE COMPLÈTE DES RECETTES" : "FULL RECIPE LIST"}
        </h1>
        <p className="2xl:text-3xl xl:text-xl lg:text-1xl md:1xl sm:text-sm font-yana text-white mb-8 max-w-3xl justify-center text-center">
          {lang === "fr"
            ? "Découvrez notre sélection de cocktails créés sur mesure, chacun conçu pour vous offrir une expérience gustative inoubliable. Choisissez votre catégorie et trouvez votre recette idéale."
            : "Discover our selection of curated cocktails, each one crafted to bring you an unforgettable taste experience. Choose your category and find your perfect recipe."}
        </p>
      </div>

      {/* Barre de filtre */}
      <div className="filter-bar w-full flex flex-col items-center mb-8">
        <div className="w-full max-w-5xl border-b border-gold pb-4">
          <div className="flex justify-center gap-6">
            {["Créations", "Revisités"].map((category) => (
              <button
                key={category}
                className={`text-lg font-yana cursor-pointer ${activeFilter === category ? "text-gold font-bold" : "text-gold-400"
                  } hover:text-gold transition`}
                onClick={() => filterCocktails(category)}
                aria-label={`Filtrer par ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des cocktails */}
      <div className="cocktail-list grid xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
        {filteredCocktails.length > 0 ? (
          filteredCocktails.map((cocktail) => (
            <Link
              to={`/cocktail/${cocktail.id}`}
              key={cocktail.id}
              aria-label={`Voir les détails de ${cocktail.name?.[lang] || cocktail.name?.["fr"]}`}
            >
              <div className="cocktail-card bg-transparent justify-center p-2 transition-transform">
                <img
                  src={cocktail.imageB}
                  alt={cocktail.name?.[lang] || "Cocktail"}
                  className="
                    object-cover mb-4
                    h-64        /* Mobile */
                    md:h-80     /* Tablettes */
                    lg:h-96     /* Ordinateurs */
                    xl:h-[28rem] /* Grand écran */
                  "
                />
                <h2 className="text-md leading-none 2xl:text-2xl xl:text-2xl lg:text-1xl md:1xl sm:text-sm text-gold font-semibold mb-1 text-center">
                  {cocktail.name?.[lang] || cocktail.name?.["fr"]}
                </h2>
                <p className="text-sm text-gold font-yana">
                  {cocktail.category?.[lang] || cocktail.category?.["fr"]}
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