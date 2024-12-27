import React, { useEffect, useState } from "react";
import gsap from "gsap";

const Loader = ({ progress }) => {
  useEffect(() => {
    if (progress === 100) {
      gsap.to(".loader-container", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.querySelector(".loader-container").style.display = "none";
        },
      });
    }
  }, [progress]);

  return (
    <div className="loader-container fixed top-0 left-0 w-full h-full bg-black flex flex-col justify-center items-center z-[70]">
      <div className="text-white mb-4">Chargement...</div>
      <div className="w-1/2 h-2 bg-gray-700">
        <div
          className="bg-gold h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;