import React, { useState, useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Navbar from "./components/Navbar";
import CanvaContainers from "./components/canvaContainers";
import Jungle from "./components/Junglebackground";
import Home from "./components/Home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isModelReady, setIsModelReady] = useState(false);
  const [selectedBottle, setSelectedBottle] = useState(0);

  useEffect(() => {
    if (!isModelReady) return;

    // Stop the 3D model when reaching the slider section
    ScrollTrigger.create({
      trigger: ".zone-4", // Trigger on the slider section
      start: "top center", // When the slider reaches the center of the viewport
      onEnter: () => {
        // Stop all animations of the model to keep it in place
        gsap.set("#smooth-wrapper", { clearProps: "all" });
      },
    });
  }, [isModelReady]);

  const handleModelReady = () => {
    setIsModelReady(true); // Passe l'état à "prêt" lorsque le modèle est chargé
  };

  const handleBottleChange = (bottleIndex) => {
    setSelectedBottle(bottleIndex);
  };

  return (
    <div className="relative w-full h-full">
      {/* Navbar toujours au-dessus */}
      <Navbar className="z-40" />

      {/* Jungle en arrière-plan */}
      <div className=" inset-0 pointer-events-none top-0 left-0 w-full h-screen z-0">
        <Jungle isModelReady={isModelReady} />
      </div>

      {/* Canvas avec modèle 3D au milieu */}
      <div id="smooth-wrapper" className="fixed inset-0 pointer-events-none top-0 left-0 w-full h-screen z-20">
        <CanvaContainers onModelReady={handleModelReady} selectedBottle={selectedBottle} />
      </div>

      {/* Sections de contenu au premier plan */}
      <div className="relative inset-0 pointer-events-auto z-30">
        <Home isModelReady={isModelReady} selectedBottle={selectedBottle} onBottleChange={handleBottleChange} />
      </div>
    </div>
  );
};

export default App;