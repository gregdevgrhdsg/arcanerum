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
        { selector: ".layer-feuilledroite", x: 200, y: 500, scale: 1.2, zIndex: 30 },
        { selector: ".layer-feuilledroite2", x: 300, y: 400, scale: 0.7, zIndex: 30 },
      ]
     :[ 
        { selector: ".layer-dodo", x: 0, y: 1000, scale: 1.3, zIndex: 10 },
        { selector: ".layer-ciel", x: 0, y: 1000, scale: 1, zIndex: 10 },
        { selector: ".layer-plante1", x:0, y: 1000, scale: 1, zIndex: 15 },
        { selector: ".layer-poisson", x: -6, y: 100, scale: 1.5, zIndex: 15 },
        { selector: ".layer-feuilleGauche", x: -10, y: 1000, scale: 0.9, zIndex: 30 },
        { selector: ".layer-feuilleGauche2", x: -10, y: 1000, scale: 0.9, zIndex: 30 },
        { selector: ".layer-JungleRightLarge", x: 300, y: 300, scale: 0.7, zIndex: 10 },
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
          ease: "power2.in",
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
    <section>
    <div className={`zone-1 w-full h-screen absolute pointer-events-none ${position === "foreground" ? "z-30" : "z-0"}`}>
    {[
        // Background ou Foreground en fonction du props
        ...(position === "foreground"
          ? [{ 
        src: "assets/jungle/layer-feuilledroite2.webp", 
        alt: "feuilleGauche2", 
        position: "absolute", 
        className: "layer-feuilledroite2 z-30", 
        style: { bottom: "0%", right: "0%" } 
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
          width: "1920px", // Largeur adaptative à l'écran
          height: "1080px", // Garde le ratio de l'image
          pointerEvents: "none", // Pas d'interaction
        } 
      },

      { 
        src: "assets/jungle/layer-fond.webp", 
        alt: "Fond Principal", 
        className: "layer-fond", 
        style: { 
          position: "absolute", 
          top: "-17%", 
          width: "1920px", // Fixer une largeur en pixels
          height: "1080px", // Fixer une hauteur en pixels
          transform: "translateX(-50%)", // Ajustement centré
          left: "50%", 
        }
      },
   
      { 
        src: "assets/jungle/layer-elephant.webp", 
        alt: "Éléphant", 
        className: "layer-elephant", 
        style: { bottom: "40%", left: "25%" } 
      },

      { 
        src: "assets/jungle/layer-rock.webp", 
        alt: "layer-rock", 
        className: "layer-rock", 
        style: { bottom: "-10%", right: "0%", width: "800px", height: "auto", // Fixer une hauteur en pixels
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
          top: "80%", 
          width: "1920px", // Fixer une largeur en pixels
          height: "2000px", // Fixer une hauteur en pixels
          transform: "translateX(-50%)", // Ajustement centré
          left: "50%", 
        }
      },
   
      { 
        src: "assets/jungle/layer-ciel.webp", 
        alt: "Ciel", 
        className: "layer-ciel", 
        style: { top: "-50px", left: "0", transform: "translateY(-10%)" } 
      },
      { 
        src: "assets/jungle/layer-dodo.png", 
        alt: "dodo", 
        className: "layer-dodo", 
        style: { bottom: "29%", left: "0%" } 
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
      { 
        src: "/models/jungle/rocher.png", 
        alt: "Rocher", 
        className: "layer-rocher", 
        style: { bottom: "0", left: "50%" } 
      },
    ]),

    ].map((layer, index) => (
      <div key={index} className={`jungle-layer ${layer.className} absolute`} style={layer.style}>
        <img src={layer.src} alt={layer.alt} />
      </div>
    ))}
  </div>
</section>
  );
};

export default Jungle;