import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cocktails from "../dataCocktails"; // Importez les cocktails depuis le fichier de données

gsap.registerPlugin(ScrollTrigger);

const LesCocktails = () => {
  const [filteredCocktails, setFilteredCocktails] = useState(cocktails);
  const [activeFilter, setActiveFilter] = useState("Tous");

  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".cocktail-card",
      { opacity: 0, y: 0 },
      {
        opacity: 1,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power2.Out",
        scrollTrigger: {
          trigger: ".cocktail-list",
          start: "top 100%",
        },
      }
      
    );
  }, [filteredCocktails]);

  const filterCocktails = (category) => {
    setActiveFilter(category);
    if (category === "Tous") {
      setFilteredCocktails(cocktails);
    } else {
      setFilteredCocktails(cocktails.filter((cocktail) => cocktail.category === category));
    }
  };

  return (
    <section className="cocktail-page bg-transparent min-h-screen flex flex-col items-center justify-start text-white">
      <h1 className="text-4xl font-yana mt-20 mb-8"></h1>
      <div className="bar-filter top-0 bg-black z-50 w-full flex flex-wrap gap-2 sm:gap-4 py-2 sm:py-4 justify-center">
      {["Tous", "Créations", "Revisités", "Signatures"].map((category) => (
          <button
            key={category}
            className={`btn-filter px-4 py-2 rounded-md transition ${
              activeFilter === category ? "bg-gold text-black" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => filterCocktails(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="cocktail-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl px-4 mt-8">
        {filteredCocktails.map((cocktail) => (
          <Link to={`/cocktail/${cocktail.id}`} key={cocktail.id}>
            <div className="cocktail-card bg-transparent p-4 rounded-lg shadow-lg transition-transform hover:scale-105">
              <img
                src={cocktail.image}
                alt={cocktail.name}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">{cocktail.name}</h2>
              <p className="text-sm text-gray-400">{cocktail.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LesCocktails;