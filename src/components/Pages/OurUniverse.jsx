// src/components/Pages/OurUniverse.jsx

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

// Enregistrer le plugin GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * Composant SliderSection
 * Représente une section avec un slider animé
 */
const SliderSection = ({ slider }) => {
  const slidesRef = useRef([]);
  const bulletsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = slider.slides;

  useEffect(() => {
    if (!slidesRef.current || slidesRef.current.length === 0) {
      console.warn('Aucun slide trouvé pour GSAP.');
      return;
    }

    // Initialisation des animations pour le slide actif
    gsap.set(slidesRef.current, { opacity: 0, y: 20 });
    gsap.to(slidesRef.current[currentIndex], {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut',
    });

    return () => {
      gsap.killTweensOf(slidesRef.current[currentIndex]);
    };
  }, [currentIndex, slides]);

  const handleSlideChange = (index) => {
    if (index !== currentIndex) {
      gsap.to(slidesRef.current[currentIndex], {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power2.inOut',
      });

      setTimeout(() => {
        setCurrentIndex(index);
      }, 500); // Correspond à la durée de l'animation de sortie
    }
  };

  const handleArrowClick = (direction) => {
    const newIndex = (currentIndex + direction + slides.length) % slides.length;
    handleSlideChange(newIndex);
  };

  return (
    <section
      className={`h-screen flex flex-col items-star bg-transparent slide-${slider.id}`}
    >
      <div
        className={`h-full w-full relative flex ${slider.flexClasses}`}
        style={{
          backgroundImage: `url('${slider.backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={`text-center z-10 ${slider.containerClass}`}>
          <h2 className="highlight-title font-yana font-bold text-gold xl:text-4xl sm:text-3xl lg:text-3xl md:text-3xl sm:text-sm mb-3">
            {slider.title}
          </h2>
          <div className="slider-container relative w-[100%] mx-auto">
            <div className="slides font-yana relative xl:min-h-[18vw] sm:min-h-[30vw] flex items-center justify-center">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  ref={(el) => (slidesRef.current[index] = el)}
                  className={`slide-item absolute top-0 left-0 w-full transition-opacity duration-200 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  <p className="highlight-description pl-20 pr-20 font-yana text-white xl:text-xl lg:text-1xl md:1xl sm:text-sm"
                    style={{ whiteSpace: "pre-line" }} // Permet d’interpréter les \n
                  >
                    {slide}
                  </p>
                </div>
              ))}
            </div>

            {/* Flèches de navigation */}
            {slides.length > 1 && (
            <div className="flex justify-center items-end relative">
              <button
                className="text-gold text-6xl hover:text-white mx-4 transform rotate-90"
                onClick={() => handleArrowClick(-1)}
                aria-label="Previous slide"
              >
                &#8249; {/* Chevron orienté vers le haut */}
              </button>
              <button
                className="text-gold text-6xl hover:text-white mx-4 -rotate-90"
                onClick={() => handleArrowClick(1)}
                aria-label="Next slide"
              >
                &#8249; {/* Chevron orienté vers le bas */}
              </button>
            </div>
              )}
          </div>
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
  const { t } = useTranslation(); // Initialisation du hook

  // Utiliser useMemo pour mémoriser slidersData et éviter les ré-rendus infinis
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
      flexClasses: 'xl:justify-start sm:justify-center xl:items-center sm:items-center', // Alignement spécifique
      containerClass: 'xl:w-[50vw] md:max-w-[60vw] sm:w-[80vw] xl:pl-40', // Disposition spécifique
    },
    {
      id: 2,
      title: t('ourUniverse.slide2Title'),
      slides: [
        t('ourUniverse.slide2Content1'),
      ],
      backgroundImage: '/assets/sections/volcanicShape.webp',
      buttonText: t('button_discover_more'),
      flexClasses: 'xl:justify-end sm:justify-center xl:items-center sm:items-center', // Alignement spécifique pour la section 2
      containerClass: 'xl:w-[50vw] md:max-w-[50vw] sm:w-[80vw] xl:pr-40', // Disposition spécifique
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
      flexClasses: 'xl:justify-start sm:justify-center xl:items-center sm:items-center', // Alignement spécifique
      containerClass: 'xl:w-[50vw] md:max-w-[50vw] sm:w-[80vw] xl:pl-40', // Disposition spécifique
    },
    // Ajoutez plus de sliders si nécessaire
  ], [t]);

  useEffect(() => {
    // Nettoie les anciens triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    // Animation globale des éléments spécifiques hors sliders si nécessaire
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

    // Nettoie les triggers lors du démontage
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [slidersData]);

  return (
    <div className="know-how-container absolute w-full h-full whitespace-pre-line">
      {/* Conteneur principal */}
      <div className="content-container">
        {/* Sections : Intro, Process, Territory */}
        {slidersData.map((slider) => (
          <SliderSection key={slider.id} slider={slider} />
        ))}
      </div>
    </div>
  );
};

export default OurUniverse;