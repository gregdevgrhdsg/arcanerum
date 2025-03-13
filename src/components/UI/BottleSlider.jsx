// src/components/UI/BottleSlider.jsx
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaArrowLeft, FaLongArrowAltRight, FaLongArrowAltLeft, FaChevronRight, FaChevronLeft, FaAngleRight, FaAngleLeft } from "react-icons/fa"; import { useModel } from "../Context/ModelContext";

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
      y: rotationGroup.rotation.y + Math.PI * 2,
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
      className="relative w-full h-[100vh] overflow-visible flex justify-center items-center"
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
      <div className="relative z-60 pointer-events-auto flex w-full h-screen md:pb-0 sm:pb-20 mx-auto">
        {/* Texte et Contenu */}
        <div
          ref={sliderContentRef}
          className="relative flex 2xl:flex-col xl:flex-col lg:flex-col md:flex-col sm:flex-row xl:text-center sm:text-center sm:w-full sm:top-14 md:top-0 xl:top-0 lg:top-0 2xl:top-0 2xl:justify-center xl:justify-center md:justify-center md:items-center sm:items-end 2xl:pl-44 md:pl-24 2xl:m-0 sm:m-10 md:w-1/2 text-white"
        >
          <div className="slider-content ">
            <h2 className=" 2xl:text-7xl xl:text-4xl sm:text-4xl font-yana text-gold mb-4">
              {bottles[currentSlide].name}
            </h2>
            <p className="font-yana 2xl:text-3xl xl:text-2xl lg:text-xl md:1xl sm:text-sm mb-2">
              {bottles[currentSlide].description}
            </p>
            <p className="2xl:text-4xl xl:text-xl font-bold mb-6">{bottles[currentSlide].prix}</p>
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
        className="absolute sm:left-5 md:left-5 lg:left-10 top-1/2 transform-translate-y-1/2 bg-black text-gold rounded-[300px] 2xl:text-8xl text-6xl hover:text-white z-30 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl"
        onClick={() => handleSlideChange((currentSlide - 1 + bottles.length) % bottles.length)}
        aria-label="Précédent">
          &larr;
      </button>

      <button
        className="absolute sm:right-5 md:right-5 lg:right-10 top-1/2 transform-translate-y-1/2 text-gold rounded-[300px] 2xl:text-8xl text-6xl hover:text-white z-30 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl"
        onClick={() => handleSlideChange((currentSlide + 1) % bottles.length)}
        aria-label="Suivant">               
        &rarr;
      </button>

      {/* Miniatures des Bouteilles */}
      <div
  className="relative top-0 right-0 h-full flex flex-col justify-center pr-20 space-y-8 z-20 hidden md:flex"
  style={{ width: "auto", height:"auto"}}
>
  {bottles.map((bottle, index) => (
    <div
      key={bottle.id}
      className={`relative cursor-pointer transition-transform ${
        currentSlide === index ? "scale-125" : "opacity-30"
      }`}
      style={{
        width:
          window.innerWidth >= 2500
            ? "140px"
            : window.innerWidth >= 1920
            ? "90px"
            : "clamp(70px, 8vw, 140px)",
        height:
          window.innerWidth >= 2500
            ? "220px"
            : window.innerWidth >= 1920
            ? "100px"
            : "clamp(90px, 10vw, 100px)",
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
    </div>
  ))}
</div>
    </div>
  );
});

export default BottleSlider;