// src/components/UI/Junglebackground.jsx
import React, { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import {useModel} from "../Context/ModelContext"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { section } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

const Jungle = ({ isModelLoaded, position = "background" }) => {



  // Animation parallax avec GSAP et ScrollTrigger
  useLayoutEffect(() => {
    if (!isModelLoaded) return;

    const elementsToAnimate = position === "foreground"
    ? [
        { selector: ".layer-feuilledroite", x: 0, y: 350, scale: 0.7, zIndex: 30 },
        { selector: ".layer-feuilledroite2", x: 0, y: 300, scale: 0.7, zIndex: 30 },
      ]
     :[ 
        { selector: ".layer-dodo", x: 0, y: 1000, scale: 0.8, zIndex: 10 },
        { selector: ".layer-ciel", x: 0, y: 900, scale: 1, zIndex: 30 },
        { selector: ".layer-plante1", x:0, y: 1000, scale: 1, zIndex: 15 },
        { selector: ".layer-poisson", x: 0, y: 100, scale: 1.5, zIndex: 15 },
        { selector: ".layer-feuilleGauche", x: -10, y: 1000, scale: 0.9, zIndex: 30 },
        { selector: ".layer-feuilleGauche2", x: -10, y: 1000, scale: 0.9, zIndex: 30 },
      ];
    elementsToAnimate.forEach(({ selector, x = 0, y = 0, scale = 1, zIndex = 0, }) => {
      const element = document.querySelector(selector);
      if (!element) {
        console.warn(`Élément non trouvé pour le sélecteur: ${selector}`);
        return;
      }

      gsap.fromTo(
        element,
        { x: 0, y: 0, scale: 1 },
        {
          x,
          y,
          scale,
          ease: "power4.in",
          transformOrigin: "bottom left",
          scrollTrigger: {
            
            trigger: ".jungle-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }, [isModelLoaded]);
  
  return (
    <section >
    <div className={`zone-1 jungle-section w-full h-screen absolute ${position === "foreground" ? "z-30" : "z-0"}`}>
    {[
        // Background ou Foreground en fonction du props
        ...(position === "foreground"
          ? [{ 
        src: "assets/jungle/layer-feuilledroite2.webp", 
        alt: "feuilleGauche2", 
        position: "absolute", 
        className: "layer-feuilledroite2", 
        
        style: { bottom: "0vw", right: "0vw", transformOrigin: "top left",

        }
      },
      { 
        src: "assets/jungle/layer-feuilledroite.webp", 
        alt: "feuilleGauche",
        position: "absolute",  
        className: "layer-feuilledroite z-30", 
        style: { bottom: "0%", right: "0%" } 
      },
    ]
    : [    
      { 
        src: "assets/jungle/layer-eau.webp", 
        alt: "Layer Eau", 
        className: "layer-eau", 
        style: { 
          position: "absolute", 
          top: "56%", // Position en bas de la section
          left: "50%", // Centré horizontalement
          transform: "translateX(-50%)", // Ajustement centré
          width: "100%", // Largeur adaptative à l'écran
          maxHeight: "1080px",
          pointerEvents: "none", // Pas d'interaction
        } 
      },
      { 
        src: "assets/jungle/layer-fond.webp", 
        alt: "Fond Principal", 
        className: "layer-fond sm:bottom-100 md:bottom-100 lg:bottom-30", 
        style: { 
          position: "absolute", 
          top: "0%", 
          width: "100%", // Fixer une largeur en pixels
          maxHeight: "1080px",
          transform: "translateX(-50%)", // Ajustement centré
          left: "50%", 
        }
      },
   
      { 
        src: "assets/jungle/layer-elephant.webp", 
        alt: "Éléphant", 
        className: "layer-elephant", 
        style: { bottom: "40%", left: "25%", width: "20%", // Fixer une largeur en pixels
        } 
      },
      { 
        src: "assets/jungle/layer-plantFront.webp", 
        alt: "Plante 1", 
        className: "layer-plante1", 
        style: { bottom: "0", left: "0%" } 
      },
      { 
        src: "assets/jungle/layer-blur.webp", 
        alt: "blur", 
        className: "layer-blur", 
        style: { 
          position: "absolute", 
          top: "70%", 
          width: "100vw", // Fixer une largeur en pixels
          transform: "translateX(-50%)", // Ajustement centré
          left: "50%", 
        }
      },
      { 
        src: "assets/jungle/layer-ciel.webp", 
        alt: "Ciel", 
        className: "layer-ciel", 
        style: {  width:"100vw", top: "0", left: "0%", transform: "translateY(-10%)" } 
      },
   
      { 
        src: "assets/jungle/layer-dodo.png", 
        alt: "dodo", 
        className: "layer-dodo", 
        style: { bottom: "20%", left: "0%", // Ajuste sur mobile
        } 
        
      },
      { 
        src: "assets/jungle/layer-feuilleGauche2.webp", 
        alt: "feuilleGauche2", 
        className: "layer-feuilleGauche2", 
        style: { bottom: "0%", left: "0%" } 
      },
      { 
        src: "assets/jungle/layer-feuilleGauche.webp", 
        alt: "feuilleGauche", 
        className: "layer-feuilleGauche", 
        style: { bottom: "0%", left: "0%" } 
      },     

    ]),

    ].map((layer, index) => (
      <div key={index} className={`absolute ${layer.className} ${layer.responsiveClass} 
      sm:w-[40%] md:w-[40%] lg:w-[30%] xl:w-[30%]`}
      style={{
        ...layer.style,
        maxWidth: "100vw", // Limite la largeur du conteneur au viewport
      }}>
  <img src={layer.src} alt={layer.alt} className="w-full max-w-full object-contain" />
  </div>
    ))}
  </div>
</section>
  );
};

export default Jungle;