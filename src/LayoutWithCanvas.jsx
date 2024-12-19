// src/LayoutWithCanvas.jsx
import React, { useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from "./components/UI/Navbar";
import CanvaContainer from "./components/Canvas/canvaContainers.jsx";
import Home from "./components/Pages/Home";
import ModelDetail from "./components/Pages/ModelDetail";
import Jungle from "./components/UI/Junglebackground";
import KnowHow from "./components/Pages/KnowHow.jsx"; // Vérifie le chemin
import OurUniverse from "./components/Pages/OurUniverse.jsx"; // Vérifie le chemin
import { useModel } from './components/Context/ModelContext';
import { bottlesConfig } from "./components/bottleConfig";
import DebugContext from './utils/DebugContext.jsx'; // Import du composant de debug
import gsap from 'gsap';

const LayoutWithCanvas = () => {
  const { selectedBottle, setSelectedBottle, isModelLoaded, cameraRef } = useModel();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isKnowHow = location.pathname === "/Know-How"; // Vérifie si la page actuelle est KnowHow
  const isOurUniverse = location.pathname === "/Our-Universe"; // Vérifie si la page actuelle est KnowHow

  useEffect(() => {
    // Animation d'entrée pour chaque page
    gsap.fromTo(
      ".page-content",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }
    );

    // Scroll en haut à chaque changement de route
    window.scrollTo(0, 0);
  }, [location]);

  // Gestion du changement de bouteille
  const handleBottleChange = (bottleIndex) => {
    console.log(`Changement vers la bouteille ID : ${bottleIndex}`);
    setSelectedBottle(bottleIndex);
  };

  return (
    <div className="relative w-full h-full">
      {/* Barre de navigation */}
      <Navbar className="z-40" />

      {/* Affichage du décor de la jungle si on est sur la Home */}
      {isHome && (
        <div  id="jungle-section" className="page-content relative left-0 z-0 w-full h-screen pointer-events-none">
          <Jungle isModelLoaded={isModelLoaded} position="background" />
        </div>
      )}
  
      {!isKnowHow && !isOurUniverse && (
        <div id="canvas-container" className="page-content fixed inset-0 z-10 pointer-events-none">
          <CanvaContainer isModelLoaded={isModelLoaded} selectedBottle={selectedBottle} />
        </div>
      )} 

        <div id="jungle-section" className="page-content absolute top-0 z-20 left-0 w-full h-screen pointer-events-none">
          <Jungle isModelLoaded={isModelLoaded} position="foreground" />
        </div>

      {/* Contenu de l'application */}
      <div className="page-content relative z-30 pointer-events-auto">
        <Routes>
          <Route path="/" element={<Home isModelLoaded={isModelLoaded} />} />
          <Route path="/model/:id" element={<ModelDetail isModelLoaded={isModelLoaded} />} />
          <Route path="/Our-Universe" element={<OurUniverse />} />
          <Route path="/Know-How" element={<KnowHow />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWithCanvas;