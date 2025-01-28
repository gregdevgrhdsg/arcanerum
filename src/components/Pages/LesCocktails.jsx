import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cocktails from "../dataCocktails"; // Import des cocktails depuis un fichier

gsap.registerPlugin(ScrollTrigger);

const LesCocktails = () => {
  const [filteredCocktails, setFilteredCocktails] = useState(
    cocktails.filter((cocktail) => cocktail.category === "Créations")
  ); // Affiche uniquement les "Créations" par défaut
  const [activeFilter, setActiveFilter] = useState("Créations");

  // Nettoyer les anciens triggers
  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  // Animation GSAP sur les cocktails
  useEffect(() => {
    gsap.fromTo(
      ".cocktail-card",
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
  }, [filteredCocktails]);

  // Fonction de filtre
  const filterCocktails = (category) => {
    setActiveFilter(category); // Définit la catégorie active
    setFilteredCocktails(
      cocktails.filter((cocktail) => cocktail.category === category)
    ); // Filtre les cocktails selon la catégorie
  };

  return (
    <section
      className="cocktail-page bg-cover bg-center flex flex-col items-center justify-start text-white"
      style={{
        backgroundImage: "url('/assets/jungle/fond-Arcane.webp')",
        backgroundAttachment: "fixed", // Le fond reste fixe lors du scroll
      }}
    >
      {/* Titre Principal */}
      <div className="ml-10 mr-10 mt-40 items-center justify-center">
        <h1 className="text-4xl text-center text-gold font-yana mb-4 font-bold">
          FULL RECIPE LIST
        </h1>
        <p className="text-2xl font-yana text-gray-300 mb-8 max-w-3xl text-center">
          Discover our selection of curated cocktails, each one crafted to bring
          you an unforgettable taste experience. Choose your category and find
          your perfect recipe.
        </p>
      </div>

      {/* Barre de filtres */}
      <div className="filter-bar w-full flex flex-col items-center mb-8">
        <div className="w-full max-w-5xl border-b border-gray-600 pb-4 ">
          <div className="flex justify-center gap-6">
            {["Créations", "Revisités"].map((category) => (
              <button
                key={category}
                className={`text-lg font-yana cursor-pointer ${
                  activeFilter === category
                    ? "text-gold font-bold"
                    : "text-gold-400"
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
      <div className="cocktail-list grid xl:grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl px-2">
        {filteredCocktails.map((cocktail) => (
          <Link
            to={`/cocktail/${cocktail.id}`}
            key={cocktail.id}
            aria-label={`Voir les détails de ${cocktail.name}`}
          >
            <div className="cocktail-card bg-transparent justify-center p-2 transition-transform">
              <img
                src={cocktail.imageB}
                alt={cocktail.name}
                className="h-102 object-cover mb-4"
              />
              <h2 className="text-2xl text-gold font-semibold mb-1 text-center">
                {cocktail.name}
              </h2>
              <p className="text-sm text-gold font-yana">{cocktail.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LesCocktails;