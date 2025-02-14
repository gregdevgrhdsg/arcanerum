import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useRumData from "../rumData"; // Assurez-vous que l'import est correct
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RumPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const rumData = useRumData(); // Appel de la fonction pour obtenir les données
  const [screenSize, setScreenSize] = useState("desktop");
  const sectionRefs = useRef([]);

  useEffect(() => {
    const detectScreenSize = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else if (width < 1536) {
        setScreenSize("desktop");
      } else {
        setScreenSize("4k");
      }
      
      console.log("Taille d'écran détectée:", width, screenSize);
    };
  
    window.addEventListener("resize", detectScreenSize);
    detectScreenSize();
  
    return () => window.removeEventListener("resize", detectScreenSize);
  }, []);

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
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
    <section className="w-full">
      {/* Première section : Extraroma et Flamboyance */}
      <div className="w-full grid xl:grid-cols-2 sm:grid-cols-1">
        {rumData.slice(0, 2).map((rum, idx) => (
          <div
            key={rum.id}
            ref={(el) => (sectionRefs.current[idx] = el)}
            className="relative flex flex-col items-center justify-center h-screen sm:h-screen sm:min-h-screen overflow-hidden"
            style={{ background: rum.gradient }}
          >
            {/* Pattern d'arrière-plan */}
            <div
              className="absolute 2xl:mb-80 sm:mb-44 inset-0 bg-contain bg-center xl:opacity-80 sm:opacity-50"
              style={{
                backgroundImage: `url(${rum.pattern})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: isMobile ? "55%" : "40%",
              }}
            ></div>

            {/* Contenu principal */}
            <div className="relative z-10 flex flex-col items-center text-center 2xl:px-32 xl:px-32 sm:px-12 sm:space-y-4">
              <img
                src={rum.image}
                alt={rum.title}
                className="bottle-image object-contain drop-shadow-lg mb-4"
                style={{
                  width: screenSize === "mobile" ? "150px" :
                         screenSize === "tablet" ? "150px" :
                         screenSize === "desktop" ? "150px" : "300px",
                  height: "auto",
                }}
              />
              <h2 className="text-gold 2xl:text-6xl xl:text-4xl font-bold mb-2 text-content sm:text-2xl">
                {rum.title}
              </h2>
              <p className="text-white font-yana 2xl:text-3xl xl:text-1xl text-content sm:text-sm">
                {rum.description_a}
              </p>
              <Link to={`/rum/${rum.id}`}>
                <button className="highlight-button btn-animated cursor-pointer">
                  EN SAVOIR PLUS
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Deuxième section : Arrangés */}
      <div className="w-full grid xl:grid-cols-3 sm:grid-cols-1">
        {rumData.slice(2).map((rum, idx) => (
          <div
            key={rum.id}
            ref={(el) => (sectionRefs.current[idx + 2] = el)}
            className="relative flex flex-col items-center justify-center h-screen sm:h-screen sm:min-h-screen overflow-hidden"
            style={{ background: rum.gradient }}
          >
            {/* Pattern d'arrière-plan */}
            <div
              className="absolute 2xl:mb-80 sm:mb-44 inset-0 bg-contain bg-center xl:opacity-80 sm:opacity-50"
              style={{
                backgroundImage: `url(${rum.pattern})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "55%",
              }}
            ></div>

            {/* Contenu principal */}
            <div className="relative z-10 flex flex-col items-center px-12 text-center px-4 sm:space-y-4">
              <img
                src={rum.image}
                alt={rum.title}
                className="bottle-image object-contain drop-shadow-lg mb-4"
                style={{
                  width: screenSize === "mobile" ? "150px" :
                         screenSize === "tablet" ? "150px" :
                         screenSize === "desktop" ? "150px" : "300px",
                  height: "auto",
                }}
              />
              <h2 className="text-gold font-yana 2xl:text-6xl xl:text-3xl font-bold mb-2 text-content sm:text-xl">
                {rum.title}
              </h2>
              <p className="text-white 2xl:text-3xl font-yana text-md text-content sm:text-sm">
                {rum.description_a}
              </p>
              <Link to={`/rum/${rum.id}`}>
                <button className="highlight-button btn-animated cursor-pointer">
                  EN SAVOIR PLUS
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