// src/components/UI/Junglebackground.jsx
import React, { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import {useModel} from "../Context/ModelContext"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { object, section } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

const Jungle = ({ isModelLoaded, position = "background" }) => {
    useLayoutEffect(() => {
      if (!isModelLoaded) return;
  
      const mm = gsap.matchMedia();
  
      const elementsToAnimate = position === "foreground"
        ? [
            { selector: ".layer-feuilledroite", positions: { mobile: { x: 0, y: 0 }, tablet: { x: 0, y: 250 }, desktop: { x: 0, y: 350 } }, scale: 1, zIndex: 30 },
            { selector: ".layer-feuilledroite2", positions: { mobile: { x: 0, y: 0 }, tablet: { x: 0, y: 200 }, desktop: { x: 0, y: 300 } }, scale: 1, zIndex: 30 },
            { selector: ".layer-feuilleGauche", positions: { mobile: { x: 0, y: 600 }, tablet: { x: 0, y: 800 }, desktop: { x: 0, y: 1000 } }, scale: 1, zIndex: 30 },
            { selector: ".layer-feuilleGauche2", positions: { mobile: { x: 0, y: 600 }, tablet: { x: 0, y: 700 }, desktop: { x: 0, y: 1000 } }, scale: 1, zIndex: 30 },
          ]
        : [
            { selector: ".layer-dodo", positions: { mobile: { x: 0, y: 600 }, tablet: { x: 0, y: 800 }, desktop: { x: 0, y: 1000 } }, scale: 0.8, zIndex: 10 },
            { selector: ".layer-ciel", positions: { mobile: { x: 0, y: 400 }, tablet: { x: 0, y: 600 }, desktop: { x: 0, y: 900 } }, scale: 1, zIndex: 30 },
            { selector: ".layer-plante1", positions: { mobile: { x: 0, y: 0 }, tablet: { x: 0, y: 700 }, desktop: { x: 0, y: 1000 } }, scale: 1, zIndex: 15 },
          ];
  
      elementsToAnimate.forEach(({ selector, positions, scale }) => {
        const element = document.querySelector(selector);
        if (!element) {
          console.warn(`Élément non trouvé pour le sélecteur: ${selector}`);
          return;
        }
  
        mm.add("(max-width: 767px)", () => {
          gsap.fromTo(
            element,
            { x: 0, y: 0, scale: 1 },
            {
              x: positions.mobile.x,
              y: positions.mobile.y,
              scale,
              ease: "power4.in",
              transformOrigin: "bottom center",
              scrollTrigger: {
                trigger: ".jungle-section",
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
  
        mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
          gsap.fromTo(
            element,
            { x: 0, y: 0, scale: 1 },
            {
              x: positions.tablet.x,
              y: positions.tablet.y,
              scale,
              ease: "power4.in",
              transformOrigin: "bottom center",
              scrollTrigger: {
                trigger: ".jungle-section",
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
  
        mm.add("(min-width: 1024px)", () => {
          gsap.fromTo(
            element,
            { x: 0, y: 0, scale: 1 },
            {
              x: positions.desktop.x,
              y: positions.desktop.y,
              scale,
              ease: "power4.in",
              transformOrigin: "bottom center",
              scrollTrigger: {
                trigger: ".jungle-section",
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      });
  
      return () => mm.revert(); // Nettoyage
    }, [isModelLoaded]);

  return (
    <section >
    <div className={`zone-1 jungle-section w-full h-screen absolute ${position === "foreground" ? "z-30" : "z-0"}`}>
    {position === "background" && (
       <div
       className="layer-fond relative"
       style={{
         top: "0",
         left: "0",
    
         zIndex: 0,
         overflow: "hidden", // Empêche tout débordement
       }}
     >
       <img
         src="assets/jungle/layer-fond.webp"
         alt="Fond"
         className="w-full "
         style={{
           objectFit: "cover", // Permet de voir l'image entière
           objectPosition: "center", // Centre l'image
         }}
       />
     </div>
        )}
    {[
        // Background ou Foreground en fonction du props
        ...(position === "foreground"
          ? [{ 
        src: "assets/jungle/layer-feuilledroite2.webp", 
        alt: "feuilleGauche2", 
        position: "absolute", 
        className: "layer-feuilledroite2 xl:bottom-[0%] sm:bottom-[40%] sm:w-[45%]", 
        style: { bottom: "0vw", right: "0vw", transformOrigin: "top left",

        }
      },
      { 
        src: "assets/jungle/layer-feuilledroite.webp", 
        alt: "feuilleGauche",
        position: "absolute",  
        className: "layer-feuilledroite sm:w-[45%]", 
        style: { bottom: "0%", right: "0%" } 
      },
      { 
        src: "assets/jungle/layer-feuilleGauche2.webp", 
        alt: "feuilleGauche2", 
        className: "layer-feuilleGauche2 sm:w-[45%]", 
        style: { bottom: "0%", left: "0%" } 
      },
      { 
        src: "assets/jungle/layer-feuilleGauche.webp", 
        alt: "feuilleGauche", 
        className: "layer-feuilleGauche sm:w-[45%]", 
        style: { bottom: "0%", left: "0%" } 
      },   
    ]
    : [     
 
  
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
          top: "60%", 
          width: "100%", // Fixer une largeur en pixels
          transform: "translateX(-50%)", // Ajustement centré
          left: "50%", 
        }
      },
      { 
        src: "assets/jungle/layer-ciel.webp", 
        alt: "Ciel", 
        className: "layer-ciel", 
        style: {  width:"100%", top: "0", left: "0%", transform: "translateY(-10%)" } 
      },
   
      { 
        src: "assets/jungle/layer-dodo.png",
        alt: "Dodo",
        className: "layer-dodo absolute xl:bottom-[20%] left-0 sm:bottom-[40%] w-[30%]",
        responsiveClass: "sm:translate-y-[-20% md:translate-y-[-5%] lg:translate-y-[-10%]",
      }, 

    ]),

    ].map((layer, index) => (
      <div key={index} className={`absolute ${layer.className} ${layer.responsiveClass} 
      sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[30%]`}
      style={{
        ...layer.style,
        maxWidth: "100vw", // Limite la largeur du conteneur au viewport
      }}>
  <img src={layer.src} alt={layer.alt} className="w-full max-w-full object-cover" />
  </div>
    ))}
  </div>
</section>
  );
};

export default Jungle;