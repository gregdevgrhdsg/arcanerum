import React, { useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import HighlightsB from "./components/HighlightsB";
import HighlightsC from "./components/HighlightsC";
import CanvaContainers from "./components/canvaContainers";
import Junglebackground from "./components/Junglebackground";

const App = () => {
  const [isModelReady, setIsModelReady] = useState(false);

  const handleModelReady = () => {
    setIsModelReady(true); // Passe l'état à "prêt" lorsque le modèle est chargé
  };

  return (
    <div className="bg-black">
      {/* Canvas avec modèle 3D */}
      <div id="smooth-wrapper" className="fixed top-0 left-0 w-full h-screen z-10">
        <Navbar />
        <CanvaContainers onModelReady={handleModelReady} />
      </div>

      {/* Jungle */}
      <Junglebackground />

      {/* Sections de contenu */}
      <div id="smooth-content" className="relative z-0">
        <Hero section="zone-1" isModelReady={isModelReady} />
        <Highlights section="zone-2" isModelReady={isModelReady} />
        <HighlightsB section="zone-3" isModelReady={isModelReady} />
        <HighlightsC section="zone-4" isModelReady={isModelReady} />
      </div>
    </div>
  );
};

export default App;
