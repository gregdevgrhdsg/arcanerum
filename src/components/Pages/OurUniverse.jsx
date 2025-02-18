// src/components/Pages/OurUniverse.jsx

import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

/**
 * Composant SliderSection (identique à Know How) avec dots de navigation
 */
const SliderSection = ({ slider }) => {
  const slidesRef = useRef([]);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = slider.slides;

  useEffect(() => {
    if (!textRef.current) return;
  
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }, [currentIndex]); // Animation déclenchée lors du changement de slide

  const handleSlideChange = (direction) => {
    const newIndex = (currentIndex + direction + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  return (
    <section className={`h-screen flex flex-col bg-transparent slide-${slider.id}`}>
      <div
        className={`h-full w-full relative flex ${slider.flexClasses}`}
        style={{
          backgroundImage: `url('${slider.backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={`text-center z-10 ${slider.containerClass}`}>
          <h2
            ref={titleRef}
            className="highlight-title font-yana font-bold text-gold leading-none 2xl:text-6xl xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl mb-3"
          >
            {slider.title}
          </h2>
          <p
            ref={textRef}
            className="highlight-description font-yana text-white 2xl:text-3xl xl:text-xl lg:text-lg md:text-md sm:text-sm"
          >
            {slides[currentIndex]}
          </p>

          {/* Dots de navigation */}
          {slides.length > 1 && (
            <div className="flex justify-center items-center mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Aller à la diapositive ${index + 1}`}
                  className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
                    currentIndex === index ? "bg-gold" : "bg-gray-500"
                  }`}
                ></button>
              ))}
            </div>
          )}

          {/* Flèches de navigation */}
          {slides.length > 1 && (
            <div className="flex justify-center items-end relative mt-0">
              <button
                className="text-gold text-6xl hover:text-white mx-4 transform rotate-90"
                onClick={() => handleSlideChange(-1)}
                aria-label="Diapositive précédente"
              >
                &#8249;
              </button>
              <button
                className="text-gold text-6xl hover:text-white mx-4 -rotate-90"
                onClick={() => handleSlideChange(1)}
                aria-label="Diapositive suivante"
              >
                &#8249;
              </button>
            </div>
          )}
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      </div>
    </section>
  );
};

/**
 * Composant Principal OurUniverse
 */
const OurUniverse = () => {
  const { t } = useTranslation();

  // Utiliser useMemo pour mémoriser les données et éviter les ré-rendus infinis
  const slidersData = useMemo(() => [
    {
      id: 1,
      title: t('ourUniverse.slide1Title'),
      slides: [
        t('ourUniverse.slide1Content1'),
        t('ourUniverse.slide1Content2'),
        t('ourUniverse.slide1Content3'),
      ],
      backgroundImage: '/assets/sections/volcanic.webp',
      buttonText: t('button_discover_more'),
      flexClasses: 'xl:justify-start sm:justify-center xl:items-center sm:items-center',
      containerClass: 'xl:w-[50vw] md:max-w-[60vw] sm:w-[80vw] xl:pl-40',
    },
    {
      id: 2,
      title: t('ourUniverse.slide2Title'),
      slides: [
        t('ourUniverse.slide2Content1'),
      ],
      backgroundImage: '/assets/sections/volcanicShape.webp',
      buttonText: t('button_discover_more'),
      flexClasses: 'xl:justify-end sm:justify-center xl:items-center sm:items-center',
      containerClass: 'xl:w-[50vw] md:max-w-[50vw] sm:w-[80vw] xl:pr-40',
      whiteSpace: "pre-line",
    },
    {
      id: 3,
      title: t('ourUniverse.slide3Title'),
      slides: [
        t('ourUniverse.slide3Content1'),
        t('ourUniverse.slide3Content2'),
        t('ourUniverse.slide3Content3'),
      ],
      backgroundImage: '/assets/sections/territory.webp',
      buttonText: t('button_discover_more'),
      flexClasses: 'xl:justify-start sm:justify-center xl:items-center sm:items-center',
      containerClass: 'xl:w-[50vw] md:max-w-[50vw] sm:w-[80vw] xl:pl-40',
    },
    // Ajoutez d'autres sliders si nécessaire
  ], [t]);

  useEffect(() => {
    // Nettoyage des anciens triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.utils.toArray(".highlight-title, .highlight-description, .highlight-button").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.4,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [slidersData]);

  return (
    <div className="know-how-container absolute w-full h-full whitespace-pre-line">
      <div className="content-container">
        {slidersData.map((slider) => (
          <SliderSection key={slider.id} slider={slider} />
        ))}
      </div>
    </div>
  );
};

export default OurUniverse;