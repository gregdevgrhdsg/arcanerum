import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RumA } from "./extraroma";
import { Flamboyance } from "./flamboyance";
import { RumB } from "./Ananas";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home = ({ isModelReady, onBottleChange }) => {
  const containerRef = useRef(null);
  const [selectedBottle, setSelectedBottle] = useState(0);
  const bottles = [
    { id: 1, name: "Extraroma", prix: "100€", description: "courte description", component: <RumA /> },
    { id: 2, name: "Flamboyance", prix: "150€", description: "description du Gold Rum", component: <Flamboyance /> },
    { id: 3, name: "ArcaneAnanas", prix: "150€", description: "description du Ananas", component: <RumB /> },
  ];

  useEffect(() => {
    if (!isModelReady) {
      console.log("En attente que le modèle soit prêt...");
      return;
    }
    // Préchargement des modèles
    const preloadModels = async () => {
      await Promise.all(
        bottles.map(async (bottle) => {
          if (bottle.component && bottle.component.type.preload) {
            await bottle.component.type.preload();
          }
        })
      );
    };
    preloadModels();
    // Configuration du scroll et de la navigation automatique entre les sections avec GSAP
    const sections = gsap.utils.toArray(".content-container section");

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 99%",
        end: "bottom top",
        onEnter: () => {
          gsap.to(window, {
            scrollTo: {
              y: section,
              autoKill: false,
              ease: "power5.out",
            },
            duration: 1,
            scrub: true,
          });
        },
      });
    });

    // Text appearance effect using GSAP and ScrollTrigger
    gsap.utils.toArray(".highlight-title, .highlight-description, .highlight-button").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, [isModelReady]);

  // Mise à jour du paramètre settings dans votre Home component
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    beforeChange: (oldIndex, newIndex) => {
      {
        // Animation avant changement de slide
        const oldSlide = document.querySelectorAll(
          `.slick-slide[data-index="${oldIndex}"] .slider-title, .slick-slide[data-index="${oldIndex}"] .slider-description, .slick-slide[data-index="${oldIndex}"] .slider-button`
        );
        oldSlide.forEach((element) => {
          gsap.to(element, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      }
    },
    afterChange: (current) => {
      if (onBottleChange) onBottleChange(current);

      // Animation après changement de slide
      const currentSlide = document.querySelectorAll(
        `.slick-slide[data-index="${current}"] .slider-title, .slick-slide[data-index="${current}"] .slider-description, .slick-slide[data-index="${current}"] .slider-button`
      );
      currentSlide.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      });

      setSelectedBottle(current); // Assurer le changement de bouteille après les animations
    },
  };

  return (
    <div ref={containerRef} className="home-container absolute w-full h-full">
      {/* Content Sections */}
      <div className="content-container">

        <section className="zone-2 h-screen flex flex-col items-end justify-center pr-[5vw] bg-transparent">
          <div className="text-right max-w-[30vw]">
            <h2 className="highlight-title font-yana text-gold text-4xl mb-4">ESCAPE THE EXPECTED</h2>
            <p className="highlight-description text-white text-sm font-300 leading-relaxed mb-6">Every adventure begins with the desire to explore the unknown...</p>
            <button className="highlight-button bg-gold text-black py-3 px-6 rounded-lg hover:bg-white transition-all">DISCOVER MORE</button>
          </div>
        </section>
        <section className="zone-3 h-screen flex flex-col items-start justify-center pl-[5vw] bg-transparent">
          <div className="text-left max-w-[30vw]">
            <h2 className="highlight-title font-yana text-gold text-4xl mb-4">KNOW HOW : <br /> FROM CANE TO GOLD</h2>
            <p className="highlight-description text-white text-sm font-300 leading-relaxed mb-6">At Arcane Rum, our savoir-faire is a tribute to the rich heritage of Mauritius...</p>
            <button className="highlight-button bg-gold text-black py-3 px-6 rounded-lg hover:bg-white transition-all">UNVEIL OUR SECRETS</button>
          </div>
        </section>
        <section ref={containerRef} className="zone-4 h-screen w-full flex flex-col justify-end overflow-hidden bg-transparent">
          <Slider {...settings} className="w-[50%] mx-auto">
            {bottles.map((bottle, index) => (
              <div key={bottle.id} className="text-center text-white slide-content h-100vh">
                {bottle.component}
                <div className="top-200 h-full justify-end ">
                  <h3 className="slider-title font-yana text-gold text-4xl mb-4">{bottle.name}</h3>
                  <p className="text-2xl font-bold mb-4">{bottle.prix}</p>
                  <p className="text-lg mb-4">{bottle.description}</p>
                  <button className="interactive-element bg-gold text-black py-2 px-4 rounded-lg hover:bg-white transition-all z-50">ACHETER</button>
                </div>
              </div>
            ))}
          </Slider>
        </section>
        <section className="zone-3 h-screen flex flex-col items-start justify-center pl-[5vw] bg-transparent">
          <div className="text-left max-w-[30vw]">
            <h2 className="highlight-title font-yana text-gold text-4xl mb-4">OUR COCKTAILS</h2>
            <p className="highlight-description text-white text-sm font-300 leading-relaxed mb-6">Immerse yourself in the art of cocktails with Arcane RUM. Be adventurous with our creations, bold with our signature shots, and timeless with revisited classics. From the first sip to the final flourish, each drink is a journey of flavor, aroma, and craftsmanship—an invitation to savor and explore.</p>
            <button className="highlight-button bg-gold text-black py-3 px-6 rounded-lg hover:bg-white transition-all">UNVEIL OUR SECRETS</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
