import React, { useEffect, useState } from "react";
import gsap from "gsap";

const Loader = ({ progress }) => {
  useEffect(() => {
    if (progress === 100) {
      gsap.to(".loader-container", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          const loaderElement = document.querySelector(".loader-container");
          if (loaderElement) {
            loaderElement.style.display = "none";
          }
        },
      });
    }
  }, [progress]);

  return (
    <div className="loader-container fixed top-0 left-0 w-full h-full bg-black flex flex-col justify-center items-center z-[70]">
      {/* Ajout du logo */}
      <img
        src="/assets/monogramArcane.png" // Remplace par le chemin de ton logo
        alt="Logo"
        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-4 object-contain"
        />

      <div className="text-white mb-4">Chargement...</div>
      <div className="w-3/4 md:w-1/2 lg:w-1/3 h-3 bg-gray-700 rounded">
        <div
          className="bg-gold-linear h-full transition-all duration-1000 ease-in-out rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;