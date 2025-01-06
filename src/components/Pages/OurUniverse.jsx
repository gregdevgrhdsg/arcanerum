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

  const slides = slider.slides; // Tableau des contenus des slides

  useEffect(() => {
    console.log('Slides:', slides); // Pour déboguer

    if (!slidesRef.current || slidesRef.current.length === 0) {
      console.warn('Aucun slide trouvé pour GSAP.');
      return;
    }

    // Initialisation des animations GSAP pour les slides
    gsap.set(slidesRef.current, { opacity: 0, y: 20 });
    gsap.to(slidesRef.current[currentIndex], {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    });

    // Nettoyage des animations au démontage
    return () => {
      gsap.killTweensOf(slidesRef.current[currentIndex]);
    };
  }, [currentIndex, slides]);

  const handleBulletClick = (index) => {
    if (index !== currentIndex) {
      // Animer la slide actuelle en sortie
      gsap.to(slidesRef.current[currentIndex], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.in',
        stagger: 0.3,
      });

      // Mettre à jour l'index après l'animation
      setTimeout(() => {
        setCurrentIndex(index);
      }, 500); // Correspond à la durée de l'animation de sortie
    }
  };

  return (
    <section className={`h-screen flex flex-col items-center bg-transparent slide-${slider.id}`}>
      <div
        className={`h-full w-full relative flex ${slider.flexClasses}`}
        style={{
          backgroundImage: `url('${slider.backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Conteneur Principal avec largeur ajustée */}
        <div className={`text-center z-10 ${slider.containerClass}`}>
          <p className="highlight-title font-yana text-gold xl:text-5xl lg:text-1xl md:text-xl sm:text-sm mb-3">
            {slider.title}
          </p>
          <div className="slider-container relative w-[80%] mx-auto py-10 px-4">
            {/* Slides */}
            <div className="slides font-yana relative h-80 flex items-center justify-center">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  ref={(el) => (slidesRef.current[index] = el)}
                  className={`slide-item absolute top-0 left-0 w-full transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <p className="highlight-description text-center font-yana text-lg text-white">
                    {slide}
                  </p>
                </div>
              ))}
            </div>

            {/* Bullets */}
            <div className="bullets flex justify-center cursor-pointer mt-4 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  ref={(el) => (bulletsRef.current[index] = el)}
                  onClick={() => handleBulletClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-gold scale-125' : 'bg-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-gold`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
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
      flexClasses: 'xl:justify-end sm:justify-center xl:items-center sm:items-center', // Alignement spécifique
      containerClass: 'xl:w-[50vw] md:max-w-[60vw] sm:w-[80vw] xl:pr-40', // Disposition spécifique
    },
    {
      id: 2,
      title: t('ourUniverse.slide2Title'),
      slides: [
        t('ourUniverse.slide2Content1'),
        t('ourUniverse.slide2Content2'),
        t('ourUniverse.slide2Content3'),
      ],
      backgroundImage: '/assets/sections/volcanicShape.webp',
      buttonText: t('button_discover_more'),
      flexClasses: 'xl:justify-left sm:justify-start xl:items-center sm:items-center', // Alignement spécifique pour la section 2
      containerClass: 'xl:w-[50vw] md:max-w-[50vw] sm:w-[80vw] xl:pl-40', // Disposition spécifique
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
      flexClasses: 'xl:justify-end sm:justify-left xl:items-center sm:items-center', // Alignement spécifique
      containerClass: 'xl:w-[50vw] md:max-w-[50vw] sm:w-[80vw] xl:pr-40', // Disposition spécifique
    },
    // Ajoutez plus de sliders si nécessaire
  ], [t]);

  useEffect(() => {
    // Nettoie les anciens triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Animation des éléments traduisibles dans chaque SliderSection
    slidersData.forEach((slider) => {
      gsap.fromTo(
        `.slide-${slider.id} > div > .highlight-description, .slide-${slider.id} > div > .highlight-title, .slide-${slider.id} > div > button`,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: `.slide-${slider.id}`,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

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
    <div className="know-how-container absolute w-full h-full">
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