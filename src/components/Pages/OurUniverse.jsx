import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const OurUniverse = () => {
    useEffect(() => {
        // Nettoie les anciens triggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
        // Animation des sections
        gsap.utils.toArray(".highlight-title, .highlight-description, .highlight-button").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, x: 50, },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power2.out",
              stagger: 0.2,
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
      }, []);
    

      return (
        <div className="know-how-container absolute w-full h-full">
          {/* Conteneur principal */}
          <div className="content-container">
            
            {/* Section 1 : Intro */}
            <section className="w-full h-screen flex flex-col items-center justify-center bg-transparent">
            <div
              className="h-screen w-full relative flex items-center justify-center"
              style={{
                backgroundImage: "url('/assets/sections/volcanic.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
          <div className="text-center xl:max-w-[40vw] md:max-w-[40vw] sm:max-w-[60vw] xl:pr-0 md:pr-0 sm:pr-0 z-10">
          <p className="highlight-description font-yana text-gold xl:text-2xl lg:text-1xl md:1xl sm:text-sm mb-6">Arcane Rum</p>
            <h2 className="highlight-title font-yana text-gold mb-5 xl:text-4xl lg:text-lg md:text-3xl sm:text-2xl">ESCAPE THE EXPECTED</h2>
            <p className="highlight-description font-yana text-white xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-6">
            Toute aventure commence par le désir d’explorer l’inconnu. Avec Arcane, nous vous invitons à voyager au cœur de l’extraordinaire – A travers, les sens, les saveurs et les riches histoires contenues dans chaque goutte de rhum Arcane.   Notre Rhum n’est pas simplement une boisson ; c’est un portail vers un univers de légendes et de prodiges, ou chaque détail organoleptique conte une épopée de découverte et d’évasion.   De la complexité luxuriante de l’Extraroma à la finition audacieuse et raffinée de la Flamboyance, en passant par les notes tropicales enjouées des arrangés, chaque bouteille est une invitation à découvrir quelque chose d’extraordinaire.    Embarquez dans cette aventure sensorielle qui devient un véritable voyage initiatique, où Arcane Rum n’est pas seulement découvert, mais vécu comme une extase des sens et de l’âme, défiant tout ce que vous pensiez connaître du rhum.</p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0"></div>

          </div>
        </section>
    
            {/* Section 2 : Process */}
            <section className="h-screen flex flex-col items-center justify-center bg-transparent">
              <div className="text-center ht xl:max-w-[40vw] md:max-w-[40vw] sm:max-w-[60vw] xl:pr-0 md:pr-20 sm:pr-5">
                <h2 className="highlight-title font-yana text-gold mb-5 xl:text-4xl lg:text-lg md:text-3xl sm:text-2xl">MAURITIUS ISLAND, A LAND OF BEAUTY AND MYSTERIES </h2>
                <p className="highlight-description font-yana text-white xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-6">
                Located in the heart of the Indian Ocean, Mauritius is more than just a beautiful island—it is the soul of Arcane Rum. The island’s vibrant mix of African, Indian, European, and Chinese influences creates a unique cultural tapestry that inspires the brand's sense of mystery and discovery. Mauritius is a land of hidden treasures, from its lush, volcanic landscapes to its rich folklore and music. Arcane Rum is deeply connected to this heritage, infusing the island’s spirit into each bottle, celebrating its untold stories and exotic mysteries.</p>
              </div>
            </section>
            <section className="h-screen flex flex-col items-center justify-center bg-transparent">
              <div className="text-center ht xl:max-w-[40vw] md:max-w-[40vw] sm:max-w-[60vw] xl:pr-0 md:pr-20 sm:pr-5">
                <h2 className="highlight-title font-yana text-gold mb-5 xl:text-4xl lg:text-lg md:text-3xl sm:text-2xl">A TERROIR SHAPED BY VOLCANIC RICHNESS</h2>
                <p className="highlight-description font-yana text-white xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-6">
                Located in the heart of the Indian Ocean, Mauritius is more than just a beautiful island—it is the soul of Arcane Rum. The island’s vibrant mix of African, Indian, European, and Chinese influences creates a unique cultural tapestry that inspires the brand's sense of mystery and discovery. Mauritius is a land of hidden treasures, from its lush, volcanic landscapes to its rich folklore and music. Arcane Rum is deeply connected to this heritage, infusing the island’s spirit into each bottle, celebrating its untold stories and exotic mysteries.</p>
              </div>
            </section>
          </div>
        </div>
      );
    };
    

export default OurUniverse;