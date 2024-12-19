import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useModel } from "../Context/ModelContext";

const BottleSlider = ({ bottles, onBottleChange, selectedBottle, onBuy }) => {
  const sliderContainerRef = useRef(null);
  const isAnimating = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(selectedBottle);

  const { rotationGroupRef } = useModel();

  // Fonction pour changer de slide
  const handleSlideChange = (newIndex) => {
    if (isAnimating.current || newIndex === currentSlide) return;
    isAnimating.current = true;

    // Faire disparaître le texte
    animateTextOut(() => {
      // Faire tourner la bouteille
      rotateBottle(rotationGroupRef.current, () => {
        // Une fois la rotation terminée, mettre à jour la slide
        setCurrentSlide(newIndex);
        onBottleChange(newIndex);

        // Faire apparaître le texte de la nouvelle slide
        animateTextIn(() => {
          isAnimating.current = false; // Fin de l'animation
        });
      });
    });
  };

  // Fonction pour faire tourner la bouteille
  const rotateBottle = (rotationGroup, onComplete) => {
    if (!rotationGroup) return;
    gsap.to(rotationGroup.rotation, {
      y: rotationGroup.rotation.y + Math.PI * 2, // Une rotation complète
      duration: 0.5,
      ease: "power3.inOut",
      onComplete,
    });
  };

  // Animation pour faire disparaître le texte
  const animateTextOut = (onComplete) => {
    const elements = sliderContainerRef.current.querySelectorAll(".slider-content");
    gsap.to(elements, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete,
    });
  };

  // Animation pour faire apparaître le texte
  const animateTextIn = (onComplete) => {
    const elements = sliderContainerRef.current.querySelectorAll(".slider-content");
    gsap.fromTo(
      elements,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.inOut", onComplete }
    );
  };

  return (
    <div className="relative flex w-full h-screen" ref={sliderContainerRef}>
      {/* Texte et Flèches */}
      <div className="relative z-10 flex flex-col text-center justify-center pl-4 sm:pl-6 md:pl-12 w-full md:w-1/2 text-white">
      {/* Contenu du slide actif */}
        <div className="slider-content">
          <h2 className="lg:text-5xl sm:text-1xl font-yana text-gold mb-4">{bottles[currentSlide].name}</h2>
          <p className="lg:text-1xl sm:text-1xl mb-2">{bottles[currentSlide].description}</p>
          <p className="text-2xl font-bold mb-6">{bottles[currentSlide].prix}</p>
          <button
            className="btn-animated"
            onClick={() => onBuy(bottles[currentSlide])}
          >
            ACHETER
          </button>
        </div>

    {/* Flèches côte à côte */}
    <div className="flex space-x-6 mt-8">
          <button
            className="text-gold hover:text-white transition-transform transform hover:scale-125 hover:-translate-x-2"
            onClick={() => handleSlideChange((currentSlide - 1 + bottles.length) % bottles.length)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            className="text-gold hover:text-white transition-transform transform hover:scale-125 hover:translate-x-2"
            onClick={() => handleSlideChange((currentSlide + 1) % bottles.length)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5L15.75 12l-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>


      {/* Thumbnails */}
      <div className="absolute bottom-10 left-0 flex flex-wrap justify-start items-center space-x-4 sm:space-x-2 md:space-x-4 z-10 w-full">
  {bottles.map((bottle, index) => (
    <div
      key={bottle.id}
      className={`cursor-pointer transition-transform rounded-lg ${
        currentSlide === index ? "border-2 border-gold scale-110" : "opacity-50"
      }`}
      style={{
        backgroundImage: `url(${bottle.thumbnail || ""})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "clamp(50px, 8vw, 100px)", // Ajuste automatiquement la taille
        height: "clamp(100px, 12vw, 200px)", // Ajuste automatiquement la hauteur
      }}
      onClick={() => handleSlideChange(index)}
      onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.2, duration: 0.3 })}
      onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
    />
  ))}
</div>
    </div>
  );
};

export default BottleSlider;