// src/components/UI/BottleSlider.jsx
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useModel } from "../Context/ModelContext";

gsap.registerPlugin(ScrollTrigger);

const BottleSlider = forwardRef(({ bottles, onBottleChange, selectedBottle, onBuy }, ref) => {
  const sliderContainerRef = useRef(null);
  const sliderContentRef = useRef(null);
  const isAnimating = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(selectedBottle);
  const DEFAULT_BOTTLE = 0; // ID ou index de Extraroma

  const { rotationGroupRef } = useModel();

  // Expose une méthode pour déclencher les animations
  useImperativeHandle(ref, () => ({
    startAnimation: () => {
      if (sliderContainerRef.current) {
        // Animation pour tout le slider
        gsap.fromTo(
          sliderContainerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
      }
    },
  }));

  const handleSlideChange = (newIndex) => {
    if (isAnimating.current || newIndex === currentSlide) return;
    isAnimating.current = true;

    animateTextOut(() => {
      rotateBottle(rotationGroupRef.current, () => {
        setCurrentSlide(newIndex);
        onBottleChange(newIndex);

        animateTextIn(() => {
          isAnimating.current = false;
        });
      });
    });
  };

    // Revenir à Extraroma en dehors du slider
    const resetToDefaultBottle = () => {
      onBottleChange(DEFAULT_BOTTLE);
    };  

  const rotateBottle = (rotationGroup, onComplete) => {
    if (!rotationGroup) return;
    gsap.to(rotationGroup.rotation, {
      x: rotationGroup.rotation.y + Math.PI * 2,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete,
    });
  };

  const animateTextOut = (onComplete) => {
    const elements = sliderContentRef.current?.querySelectorAll(".slider-content > *") || [];
    if (elements.length) {
      gsap.to(elements, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete,
      });
    }
  };

  const animateTextIn = (onComplete) => {
    const elements = sliderContentRef.current?.querySelectorAll(".slider-content > *") || [];
    if (elements.length) {
      gsap.fromTo(
        elements,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.inOut",
          stagger: 0.2,
          onComplete,
        }
      );
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-visible flex justify-center items-center"
      ref={sliderContainerRef}
      onMouseLeave={resetToDefaultBottle}
    >
      {/* Slider Principal avec max-w-6xl */}
      <div
        className="relative z-60 pointer-events-auto flex w-full h-full max-w-6xl mx-auto"
      >
        {/* Texte et Contenu */}
        <div
          ref={sliderContentRef}
          className="relative flex flex-col xl:text-center xl:text-left sm:text-left xl:w-2/5 sm:w-1/2 xl:top-60 sm:top-20 xl:justify-start sm:justify-start sm:pl-3 md:pl-12 w-full md:w-1/2 text-white"
        >
          <div className="slider-content">
            <h2 className="xl:text-4xl sm:text-lg font-yana text-gold mb-4">{bottles[currentSlide].name}</h2>
            <p className="font-yana text-white lg:text-lg sm:text-sm mb-2">{bottles[currentSlide].description}</p>
            <p className="text-2xl font-bold mb-6">{bottles[currentSlide].prix}</p>
            <button className="btn-animated" onClick={() => onBuy(bottles[currentSlide])}>
              ACHETER
            </button>
          </div>
        </div>
      </div>

      {/* Flèches de Navigation Positionnées Absolument Centrées Verticalement et Écartées */}
      <button
        className="absolute sm:left-16 md:left-20 lg:left-24 top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-white z-30 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl"
        onClick={() => handleSlideChange((currentSlide - 1 + bottles.length) % bottles.length)}
        aria-label="Précédent"
      >
        &larr;
      </button>
      <button
        className="absolute  sm:right-16 md:right-20 lg:right-24 top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-white z-30 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl"
        onClick={() => handleSlideChange((currentSlide + 1) % bottles.length)}
        aria-label="Suivant"
      >
        &rarr;
      </button>
      
       {/* Miniatures des Bouteilles */}
  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-wrap xl:justify-start sm:justify-center items-center xl:space-x-4 sm:space-x-4 md:space-x-28 z-10 w-full max-w-6xl mx-auto">
    {bottles.map((bottle, index) => (
      <div
        key={bottle.id}
        className={`relative cursor-pointer transition-transform ${
          currentSlide === index ? "scale-110" : "opacity-60"
        }`}
        style={{
          width: "clamp(50px, 8vw, 100px)",
          height: "clamp(100px, 20vw, 200px)",
        }}
        onClick={() => handleSlideChange(index)}
        onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.2, duration: 0.3 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
      >
        {/* Image de la bouteille */}
        <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url(${bottle.thumbnail || ""})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: 10, // La bouteille reste au-dessus
    }}
  />

  {/* Halo ajusté */}
  {currentSlide === index && (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 0, // Derrière la bouteille
        backgroundImage: "url(/assets/thumbnail/lueurBottle.webp)",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transform: `scale(${345 / 300})`, // Ratio largeur du halo / largeur du thumbnail
      }}
          />
        )}
      </div>
    ))}
  </div>
</div>
  );
});

export default BottleSlider;