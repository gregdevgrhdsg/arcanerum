import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useRumData from "../rumData"; // Assurez-vous que l'import est correct
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RumPage = () => {
  const rumData = useRumData(); // Récupération des données
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const sectionRefs = useRef([]);

  // Détection de la taille d'écran et mise à jour de windowHeight
  useEffect(() => {
    const detectScreenSize = () => {
      const width = window.innerWidth;
      setWindowHeight(window.innerHeight);
      if (width < 640) {
        setScreenSize("mobile");
        setIsMobile(true);
      } else if (width < 1024) {
        setScreenSize("tablet");
        setIsMobile(true);
      } else if (width < 1536) {
        setScreenSize("desktop");
        setIsMobile(false);
      } else {
        setScreenSize("4k");
        setIsMobile(false);
      }
      console.log("Taille d'écran détectée:", width, screenSize, "Hauteur:", window.innerHeight);
    };

    window.addEventListener("resize", detectScreenSize);
    detectScreenSize();

    return () => window.removeEventListener("resize", detectScreenSize);
  }, []);

  // Animation GSAP sur chaque section
  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const texts = section.querySelectorAll(".text-content");
      const image = section.querySelector(".bottle-image");

      gsap.fromTo(
        texts,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        image,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [rumData]);

  return (
    <section className="w-full ">
      {/* Première section : Extraroma et Flamboyance */}
      <div className="w-full grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        {rumData.slice(0, 2).map((rum, idx) => (
          <div
            key={rum.id}
            ref={(el) => (sectionRefs.current[idx] = el)}
            className="relative pt-20 flex flex-col items-center justify-center h-screen sm:h-screen sm:min-h-screen overflow-hidden"
            style={{ background: rum.gradient }}
          >
            {/* Pattern d'arrière-plan */}
            <div
              className="absolute mt-20 2xl:mb-80 sm:mb-44 inset-0 bg-contain bg-center xl:opacity-50 sm:opacity-50"
              style={{
                backgroundImage: `url(${rum.pattern})`,
                backgroundRepeat: "no-repeat",
                backgroundSize:
                  screenSize === "mobile"
                    ? "65%"
                    : screenSize === "tablet"
                    ? "55%"
                    : "40%",
              }}
            ></div>

            {/* Contenu principal */}
            <div className="relative z-10  flex flex-col items-center text-center 2xl:px-32 xl:px-32 sm:px-12 sm:space-y-4">
              <img
                src={rum.image}
                alt={rum.title}
                className="bottle-image object-contain drop-shadow-lg mb-4"
                style={{
                  height:
                    screenSize === "mobile" || screenSize === "tablet"
                      ? `${windowHeight * 0.5}px`
                      : `${windowHeight * 0.5}px`,
                  width: "auto",
                }}
              />
              <h2 className="text-gold 2xl:text-6xl xl:text-4xl font-bold mb-2 text-content sm:text-2xl">
                {rum.title}
              </h2>
              <p className="text-white font-yana 2xl:text-3xl xl:text-xl lg:text-xl md:1xl sm:text-sm text-content sm:text-sm ">
                {rum.description_a}
              </p>
              <Link to={`/rum/${rum.id}`}>
                <button className="highlight-button btn-animated cursor-pointer">
                {rum.buttonb}                
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Deuxième section : Arrangés */}
      <div className="w-full grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
        {rumData.slice(2).map((rum, idx) => (
          <div
            key={rum.id}
            ref={(el) => (sectionRefs.current[idx + 2] = el)}
            className="relative flex flex-col items-center justify-center h-screen sm:h-screen sm:min-h-screen overflow-hidden"
            style={{ background: rum.gradient }}
          >
            {/* Pattern d'arrière-plan */}
            <div
              className="absolute 2xl:mb-80 sm:mb-44 inset-0 bg-contain bg-center xl:opacity-50 sm:opacity-50"
              style={{
                backgroundImage: `url(${rum.pattern})`,
                backgroundRepeat: "no-repeat",
                backgroundSize:
                  screenSize === "mobile"
                    ? "65%"
                    : screenSize === "tablet"
                    ? "60%"
                    : "58%",
              }}
            ></div>

            {/* Contenu principal */}
            <div className="relative z-10 flex flex-col items-center px-12 text-center sm:px-4 sm:space-y-4">
              <img
                src={rum.image}
                alt={rum.title}
                className="bottle-image object-contain drop-shadow-lg mb-4"
                style={{
                  height:
                    screenSize === "mobile" || screenSize === "tablet"
                      ? `${windowHeight * 0.5}px`
                      : `${windowHeight * 0.5}px`,
                  width: "auto",
                }}
              />
              <h2 className="text-gold font-yana 2xl:text-6xl xl:text-4xl font-bold mb-2 text-content sm:text-xl">
                {rum.title}
              </h2>
              <p className="text-white 2xl:text-3xl xl:text-xl lg:text-xl md:1xl sm:text-sm font-yana text-content mx-2">
                {rum.description_a}
              </p>
              <Link to={`/rum/${rum.id}`}>
                <button className="highlight-button btn-animated cursor-pointer">
                {rum.buttonb}                
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RumPage;