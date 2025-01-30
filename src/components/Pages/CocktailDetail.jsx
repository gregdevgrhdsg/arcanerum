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

  const currentSection = cocktail.sections?.[activeSection] || { ingredients: [], method: [] };

  return (
    <section
      className="cocktail-page bg-cover bg-center text-white min-h-screen flex flex-col items-center justify-center relative"
      style={{ backgroundImage: "url('/assets/jungle/fond-Arcane.webp')" }}
    >
      {/* Fond transparent */}
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

      <div className="cocktail-detail-container relative flex flex-col lg:flex-row lg:items-center lg:justify-center w-full max-w-screen-xl z-10">
        {/* Image fixe */}
        <div
          ref={imageRef}
          className="hidden xl:items-center lg:flex lg:items-center lg:justify-center lg:w-1/3 h-auto"
        >
          <img
            src={cocktail.image}
            alt={cocktail.name}
            className="max-w-full max-h-[90%] object-contain"
          />
        </div>

        {/* Détails du cocktail */}
        <div
          className="w-full lg:w-1/2 px-6 py-10 overflow-y-auto max-h-[80vh] flex flex-col items-center justify-start text-center"
          ref={textRef}
        >
          <h1 className="text-4xl text-gold font-yana mb-6">{cocktail.name}</h1>

          {/* Sélecteur de section */}
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

          {/* Contenu de la section */}
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
            <Link
            to="/Les-Cocktails"
            className="btn-animated mt-16 px-4 py-2 text-sm font-medium bg-gold text-black rounded-md hover:bg-yellow-500 transition-all duration-300"
          >
            Retour à la liste
          </Link>
          </div>
        </div>
      </div>

      {/* Éléments de la jungle */}
      <div className="jungle-el-section absolute bottom-0 right-0 w-[15vw] z-[1]">
        <img src="/assets/jungle/layer-feuilledroite2.webp" alt="jungle4" className="w-full h-full object-contain" />
      </div>
      <div className="jungle-el-section absolute bottom-0 right-0 w-[15vw] z-[1]">
        <img src="/assets/jungle/layer-feuilledroite.webp" alt="jungle3" className="w-full h-full object-contain" />
      </div>
      <div className="jungle-el-section absolute bottom-[60%] left-[10%] w-[10vw] z-[10]">
        <img src="/assets/jungle/layer-Bird.webp" alt="jungle5" className="w-full h-full object-contain" />
      </div>
    </section>
  );
};

export default CocktailDetail;