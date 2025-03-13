import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useModel } from "../Context/ModelContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { object, section } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

const Jungle = ({ isModelLoaded, position = "background", followRock = false }) => {
  const [rockBottom, setRockBottom] = useState("-10vh");
  const [rockHeight, setRockHeight] = useState("700px");
  const [rockRight, setRockRight] = useState("0%");
  const [rockLeft, setRockLeft] = useState("2%");

  // Récupération de rockPos depuis le contexte
  const { rockPos, setRockPos } = useModel();

  // Création d'une référence pour le conteneur de Jungle
  const containerRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const staticOffset = window.innerHeight; // par exemple, 100vh
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
  
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);
  // Calcul de l'offset vertical du conteneur Jungle
  useEffect(() => {
    const updateRock = () => {
      setRockPos({ ...rockPos }); // Force la mise à jour
    };
  
    window.addEventListener("resize", updateRock);
    return () => window.removeEventListener("resize", updateRock);
  }, [rockPos]);

  const rockLayerStyle = {
    position: "absolute",
    left: `${rockPos.x}px`,
    top: `${rockPos.y}px`,
    transform: "translate(-50%, -50%)",
    width: screenWidth < 760 ? "35vw" : screenWidth < 1024 ? "35vw" : "40vw", // Taille adaptative
    height: screenHeight < 900 ? "35vh" : screenHeight < 1000 ? "35vh" : "40vh", // Ajustement en fonction de la hauteur
    zIndex: 10, // S'assurer qu'il est bien derrière la bouteille
  };

 

  useLayoutEffect(() => {
    if (!isModelLoaded) return;
    gsap.fromTo(
      ".layer-fond img",
      { y: 0 },
      {
        y: "50vh",
        ease: "none",
        scrollTrigger: {
          trigger: ".jungle-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, [isModelLoaded, position]);

  useLayoutEffect(() => {
    if (!isModelLoaded) return;
    const mm = gsap.matchMedia();
    const elementsToAnimate = position === "foreground" ? [] : [];
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
    return () => mm.revert();
  }, [isModelLoaded]);

  return (
    <section>
      <div ref={containerRef} className={`zone-1 w-full h-screen absolute ${position === "foreground" ? "z-30" : "z-5"}`}>
        {position === "background" && (
          <div
            className="layer-fond relative"
            style={{
              top: "0",
              left: "0",
              zIndex: 0,
              overflow: "hidden",
            }}
          >
            <img
              src="assets/jungle/fond-Arcane.webp"
              alt="Fond"
              className="jungle-section w-full z-0"
              style={{
                overflow: "hidden",
                objectFit: "cover",
                objectPosition: "center",
                minWidth: "1080px",
                height: "600vh",
                maxHeight: "600vh",
              }}
            />
          </div>
        )}
        {[
          ...(position === "foreground"
            ? [
                {
                  src: "assets/jungle/layer-feuilleGauche2.webp",
                  alt: "feuilleGauche2",
                  className: "layer-feuilleGauche2 xl:w-[25%] lg:w-[35%] md:w-[35%] sm:w-[55%] z-50",
                  style: { bottom: "0%", left: "0%" },
                },
                {
                  src: "assets/jungle/layer-feuilleGauche.webp",
                  alt: "feuilleGauche",
                  className: "layer-feuilleGauche xl:w-[25%] lg:w-[35%] md:w-[25%] sm:w-[55%] z-50",
                  style: { bottom: "0%", left: "0%" },
                },
                
              ]
            : [
                {
                  src: "assets/jungle/layer-blur.webp",
                  alt: "blur",
                  className: "layer-blur sm:bottom-[0%] z-10",
                  style: {
                    position: "absolute",
                    top: "90%",
                    width: "100%",
                    transform: "translateX(-50%)",
                    left: "50%",
                  },
                },
                {
                  src: "assets/jungle/layer-plantFront.webp",
                  alt: "Plante 1",
                  className: "layer-plantFront xl:w-[30%] lg:w-[50%] md:w-[65%] sm:w-[100%] z-5",
                  style: { bottom: "0", left: "0%" },
                },
                {
                  src: "assets/jungle/layer-ciel.webp",
                  alt: "Ciel",
                  className: "layer-ciel",
                  responsiveClass: "",
                  style: { width: "100%", top: "0", left: "0%", transform: "translateY(-10%)" },
                },
                {
                  src: "assets/jungle/layer-dodo.png",
                  alt: "Dodo",
                  className: "layer-dodo absolute 2xl:w-[25%] xl:w-[25%] lg:w-[35%] lg:min-w-[30%] md:w-[50%] sm:w-[70vw] xl:bottom-[15%] lg:bottom-[15%] md:bottom-[10%] left-0 sm:bottom-[35%] ",
                },
              ]),
        ].map((layer, index) => (
          <div
            key={index}
            className={`absolute ${layer.className} ${layer.responsiveClass || ""}`}
            style={{
              ...layer.style,
              maxWidth: "100vw",
            }}
          >
            <img src={layer.src} alt={layer.alt} className="w-full max-w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Jungle;