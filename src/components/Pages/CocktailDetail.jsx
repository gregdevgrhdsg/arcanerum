import React, { useEffect, useRef } from "react";
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

  // Refs for animations
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!cocktail) {
      navigate("/Les-Cocktails");
      return;
    }

    // Animate only the text and image
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    );
  }, [cocktail]);

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

  return (
    <div
    className="h-screen w-full relative flex items-center justify-center"
    style={{
      backgroundImage: "url('/assets/environement 2.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Overlay */}
    <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>
  
    {/* Arrows */}
    {previousCocktail && (
      <Link
        to={`/cocktail/${previousCocktail.id}`}
        className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-white z-30"
      >
        &larr;
      </Link>
    )}
    {nextCocktail && (
      <Link
        to={`/cocktail/${nextCocktail.id}`}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-white z-30"
      >
        &rarr;
      </Link>
    )}
  
    {/* Content */}
    <div className="relative z-20 w-full max-w-7xl px-10 flex items-center justify-between">
      {/* Text Section */}
      <div className="w-1/2 text-gold space-y-6 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/path-to-your-logo.webp"
            alt="Cocktail Logo"
            className="w-[120px] h-auto"
          />
        </div>
  
        <div ref={textRef} className="text-shadow-lg">
          <h1 className="text-4xl font-yana text-gold mb-4">{cocktail.name}</h1>
          <ul className="text-xl font-yana mb-10 space-y-2">
            {cocktail.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p className="text-lg font-yana italic text-gold/80">{cocktail.description}</p>
          <Link to="/Les-Cocktails" className="btn-animated">
            BACK
          </Link>
        </div>
      </div>
  
      {/* Cocktail Image */}
      <div
        ref={imageRef}
        className="w-1/2 flex justify-center items-center relative"
        style={{ left: "-100px", top: "90px" }}
              >
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className="w-[400px] h-auto shadow-lg rounded-md"
        />
      </div>
    </div>
  </div>
  );
};

export default CocktailDetail;