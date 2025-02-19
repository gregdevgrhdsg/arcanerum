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
  const DEFAULT_BOTTLE = 0;
  const isInsideSlider = useRef(false);
  const { rotationGroupRef } = useModel();
  

  useImperativeHandle(ref, () => ({
    startAnimation: () => {
      if (sliderContainerRef.current) {
        gsap.fromTo(
          sliderContainerRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
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
    if (!isInsideSlider.current) {
      setCurrentSlide(DEFAULT_BOTTLE);
      onBottleChange(DEFAULT_BOTTLE);
    }
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
      onMouseEnter={() => (isInsideSlider.current = true)}
      onMouseLeave={(e) => {
        if (!sliderContainerRef.current.contains(e.relatedTarget)) {
          isInsideSlider.current = false;
          setTimeout(resetToDefaultBottle, 300); // 🔥 Délai pour éviter un reset instantané
        }
      }}
      onTouchStart={() => (isInsideSlider.current = true)}
      onTouchEnd={(e) => {
        setTimeout(() => {
          if (!sliderContainerRef.current.contains(e.target)) {
            isInsideSlider.current = false;
            resetToDefaultBottle();
          }
        }, 300); // 🔥 Délai pour éviter les fausses détections sur mobile
      }}
    >
      {/* Slider Principal */}
      <div className="relative z-60 pointer-events-auto flex w-full h-full 2xl:max-w-10vw xl:max-w-6xl mx-auto">
        {/* Texte et Contenu */}
        <div
          ref={sliderContentRef}
          className="relative flex 2xl:flex-col xl:flex-col lg:flex-col md:flex-col sm:flex-row xl:text-center sm:text-center 2xl:w-1/2 xl:w-2/5 sm:w-full 2xl:top-64 xl:top-36 lg:top-36 md:top-36 sm:top-14  2xl:justify-start xl:justify-start md:justify-start md:items-end sm:items-end 2xl:pl-0 md:pl-12 sm:m-10 md:w-1/2 text-white"
        >
          <div className="slider-content ">
            <h2 className=" 2xl:text-7xl xl:text-4xl sm:text-4xl font-yana text-gold mb-4">
              {bottles[currentSlide].name}
            </h2>
            <p className="font-yana 2xl:text-4xl text-white lg:text-lg sm:text-md mb-2">
              {bottles[currentSlide].description}
            </p>
            <p className="2xl:text-4xl xl:text-2xl font-bold mb-6">{bottles[currentSlide].prix}</p>
            <a
              href={bottles[currentSlide].externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated"
            >
               {bottles[currentSlide].button}
            </a>
          </div>
        </div>
      </div>

      {/* Flèches de Navigation */}
      <button
        className="absolute sm:left-16 md:left-20 lg:left-24 top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-white z-30 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl"
        onClick={() =>
          handleSlideChange((currentSlide - 1 + bottles.length) % bottles.length)
        }
        aria-label="Précédent"
      >
        &larr;
      </button>
      <button
        className="absolute sm:right-16 md:right-20 lg:right-24 top-1/2 transform -translate-y-1/2 text-gold text-5xl hover:text-white z-30 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl"
        onClick={() => handleSlideChange((currentSlide + 1) % bottles.length)}
        aria-label="Suivant"
      >
        &rarr;
      </button>

      {/* Miniatures des Bouteilles */}
      <div
        className="absolute bottom-10 2xl:left-1/3 xl:left-1/2 lg:left-1/2 md:left-1/2 transform -translate-x-1/2 flex flex-wrap xl:justify-start lg:justify-start md:justify-start items-center xl:space-x-4 md:space-x-4 md:pl-10 md:pb-10 w-full max-w-6xl mx-auto hidden md:flex z-20"
      >
        {bottles.map((bottle, index) => (
          <div
            key={bottle.id}
            className={`relative cursor-pointer transition-transform ${currentSlide === index ? "scale-110" : "opacity-60"
              }`}
            style={{
              width: window.innerWidth >= 2500 ? "140px" : window.innerWidth >= 1920 ? "100px" : "clamp(50px, 8vw, 100px)",
              height: window.innerWidth >= 2500 ? "420px" : window.innerWidth >= 1920 ? "100px" : "clamp(100px, 20vw, 200px)",
            }}
            onClick={() => handleSlideChange(index)}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${bottle.thumbnail || ""})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Halo ajusté */}
            {currentSlide === index && (
              <div
                className="absolute inset-0 z-[-10]" // Mettre derrière la bouteille
                style={{
                  backgroundImage: "url(/assets/thumbnail/lueurBottle.webp)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "120%", // Ajustement dynamique pour s'aligner
                  height: "120%", // Agrandir légèrement pour correspondre
                  left: "-10%", // Ajuster la position selon la bouteille
                  top: "-10%",  // Ajuster verticalement
                  transform: `scale(${window.innerWidth >= 2560 ? 1.4 : window.innerWidth >= 1920 ? 1.2 : 1})`,
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