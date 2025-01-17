import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import cocktails from "../dataCocktails";

const CocktailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cocktailIndex = cocktails.findIndex((c) => c.id === parseInt(id));
  const cocktail = cocktails[cocktailIndex];

  const previousCocktail = cocktailIndex > 0 ? cocktails[cocktailIndex - 1] : null;
  const nextCocktail = cocktailIndex < cocktails.length - 1 ? cocktails[cocktailIndex + 1] : null;

  const textRef = useRef(null);
  const imageRef = useRef(null);

  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (!cocktail) {
      navigate("/Les-Cocktails");
      return;
    }

    // Animations GSAP
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
  }, [cocktail, activeSection]);

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

  const currentSection = cocktail.sections?.[0] || { ingredients: [], method: [] };
  const ingredients = currentSection.ingredients || [];
  
  return (
    <section
    className="cocktail-page bg-cover bg-center text-white min-h-screen flex flex-col items-center justify-center relative"
    style={{ backgroundImage: "url('/assets/jungle/fond-Arcane.webp')" }}
  >
    <div
      className="absolute inset-0 bg-black opacity-50 z-0"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
      }}
    ></div>
    
      {/* Flèches de navigation */}
      {previousCocktail && (
        <Link
          to={`/cocktail/${previousCocktail.id}`}
          className="hidden lg:flex fixed left-5 top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-black z-30"
        >
          &larr;
        </Link>
      )}
      {nextCocktail && (
        <Link
          to={`/cocktail/${nextCocktail.id}`}
          className="hidden lg:flex fixed right-5 top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-black z-30"
        >
          &rarr;
        </Link>
      )}

      <div className="cocktail-detail-container relative flex flex-col lg:flex-row lg:items-center lg:justify-center w-full max-w-screen-xl">
        {/* Image fixe en desktop */}
        <div
          ref={imageRef}
          className="hidden lg:flex lg:items-center lg:justify-center lg:w-1/2 h-auto"
        >
          <img
            src={cocktail.image}
            alt={cocktail.name}
            className="max-w-full max-h-[80%] object-contain"
          />
        </div>

        <div
  className="w-full lg:w-1/2 px-6 py-10 overflow-y-auto max-h-[80vh] flex flex-col items-center justify-center text-center"
  ref={textRef}
  style={{
    minHeight: "400px", // Définit une hauteur minimale
    maxHeight: "600px", // Définit une hauteur maximale
    overflowY: "auto", // Active le défilement si le contenu dépasse la hauteur maximale
  }}
>
  <h1 className="text-4xl text-gold font-yana mb-6">{cocktail.name}</h1>

  {/* Section Selector */}
  <div className="flex justify-center space-x-4 mb-6">
    {cocktail.sections.map((section, index) => (
      <button
        key={index}
        onClick={() => setActiveSection(index)}
        className={`px-4 py-2 text-sm font-yana ${
          activeSection === index
            ? "text-gold border-b-2 border-gold"
            : "text-gray-500"
        }`}
      >
        {section.title}
      </button>
    ))}
  </div>

  {/* Tab Content */}
  <div>
    <table className="table-auto w-full text-left text-sm mb-6">
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
            <td className="px-4 py-2">{ingredient.name}</td>
            <td className="px-4 py-2">{ingredient.qty || "-"}</td>
            <td className="px-4 py-2">{ingredient.unit || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2 className="text-2xl text-gold font-yana mb-4">Method</h2>
    <ul className="list-disc ml-4 space-y-2">
      {currentSection.method.map((step, index) => (
        <li key={index} className="text-sm text-left text-white">
          {step}
        </li>
      ))}
    </ul>
  </div>
</div>
      </div>
    </section>
  );
};

export default CocktailDetail;