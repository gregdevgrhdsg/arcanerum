// src/components/UI/Junglebackground.jsx
import React, { useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { useModel } from "../Context/ModelContext"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { object, section } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

const Jungle = ({ isModelLoaded, position = "background" }) => {
  const [rockBottom, setRockBottom] = useState("-10vh");
  const [rockHeight, setRockHeight] = useState("700px");
  const [rockRight, setRockRight] = useState("0%");
  const [rockLeft, setRockLeft] = useState("2%");

  useEffect(() => {
    const updateRockPosition = () => {
      const screenHeight = window.innerHeight;
  
      if (screenHeight < 600) {
        setRockBottom("-22vh");
        setRockHeight("45vw");
        setRockRight("5%");
        setRockLeft("auto");
      } else if (screenHeight < 800) {
        setRockBottom("-12vh");
        setRockRight("7%");
        setRockHeight("45vw");
        setRockLeft("auto");
      } else if (screenHeight < 1000) {
        setRockBottom("-10vh");
        setRockHeight("700px");
        setRockRight("0%");
        setRockLeft("auto");
      } else if (screenHeight < 1600) {
        setRockBottom("-13vh");
        setRockRight("8%");
        setRockLeft("auto");
      } else if (screenHeight < 1900) {
        setRockBottom("-7vh");
        setRockHeight("1200px");
        setRockRight("0%");
        setRockLeft("auto");
      } else {
        setRockBottom("-5vh");
        setRockHeight("700px");
        setRockRight("0%");
        setRockLeft("auto");
      }
    };
  
    updateRockPosition();
    window.addEventListener("resize", updateRockPosition);
  
    return () => window.removeEventListener("resize", updateRockPosition);
  }, []);

  useLayoutEffect(() => {
    if (!isModelLoaded) return;
    gsap.fromTo(
      ".layer-fond img",
      { y: 0 },
      {
        y: "50vh", // Ajustez cette valeur pour obtenir l'effet souhaité
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



    const elementsToAnimate = position === "foreground"
      ? [

      ]
      : [

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
      <div className={`zone-1 w-full h-screen absolute ${position === "foreground" ? "z-30" : "z-0"}`}>
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
              src="assets/jungle/fond-Arcane.webp"
              alt="Fond"
              className="jungle-section w-full z-0 "
              style={{
                overflow: "hidden",
                objectFit: "cover", // Permet de voir l'image entière
                objectPosition: "center", // Centre l'image
                minWidth: "1080px",
                height: "600vh", // Fixé pour couvrir 5 sections de 100vh
                maxHeight: "600vh", // Ne jamais dépasser cette hauteur
              }}
            />
          </div>
        )}
        {[
          // Background ou Foreground en fonction du props
          ...(position === "foreground"
            ? [
              {
                src: "assets/jungle/layer-feuilleGauche2.webp",
                alt: "feuilleGauche2",
                className: "layer-feuilleGauche2 xl:w-[25%] md:w-[25%] sm:w-[45%] z-50",
                style: { bottom: "0%", left: "0%" }
              },
              {
                src: "assets/jungle/layer-feuilleGauche.webp",
                alt: "feuilleGauche",
                className: "layer-feuilleGauche xl:w-[25%] lg:w-[25%] md:w-[25%] sm:w-[45%] z-50",
                style: { bottom: "0%", left: "0%" }
              },

            ]
            : [

              {
                src: "assets/jungle/layer-rock.webp",
                alt: "rock",
                className: "layer-rock sm:hidden md:block absolute xl:right-[0%] sm:w-[70vw]",
                style: {
                  bottom: rockBottom, // ✅ Position verticale dynamique
                  right: rockRight,   // ✅ Position horizontale dynamique
                  left: rockLeft,     // ✅ Position horizontale dynamique
                  width: rockHeight,
                }
              },
              {
                src: "assets/jungle/layer-blur.webp",
                alt: "blur",
                className: "layer-blur sm:bottom-[0%] z-20",
                style: {
                  position: "absolute",
                  top: "90%",
                  width: "100%", // Fixer une largeur en pixels
                  transform: "translateX(-50%)", // Ajustement centré
                  left: "50%",
                }
              },
              {
                src: "assets/jungle/layer-plantFront.webp",
                alt: "Plante 1",
                className: "layer-plante1 xl:w-[30%] lg:w-[30%] md:w-[45%] sm:w-[80%] z-10",
                style: { bottom: "0", left: "0%" }
              },

              {
                src: "assets/jungle/layer-ciel.webp",
                alt: "Ciel",
                className: "layer-ciel",
                responsiveClass: "",
                style: { width: "100%", top: "0", left: "0%", transform: "translateY(-10%)" }
              },

              {
                src: "assets/jungle/layer-dodo.png",
                alt: "Dodo",
                className: "layer-dodo absolutexl: xl:w-[25%] lg:w-[25%] md:w-[40%] sm:w-[70vw] xl:bottom-[15%] lg:bottom-[15%] md:bottom-[10%] left-0 sm:bottom-[40%] xl:w-[25%] ",
                responsiveClass: " md:translate-y-[-5%] lg:translate-y-[-10%]",
              },

            ]),

        ].map((layer, index) => (
          <div key={index} className={`absolute ${layer.className} ${layer.responsiveClass} 
     `}
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