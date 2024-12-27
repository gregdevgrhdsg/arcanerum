// src/LayoutWithCanvas.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import Navbar from "./components/UI/Navbar";
import CanvaContainer from "./components/Canvas/canvaContainers.jsx";
import Home from "./components/Pages/Home";
import ModelDetail from "./components/Pages/ModelDetail";
import Jungle from "./components/UI/Junglebackground";
import KnowHow from "./components/Pages/KnowHow.jsx"; // Vérifie le chemin
import OurUniverse from "./components/Pages/OurUniverse.jsx"; // Vérifie le chemin
import LesCocktails from "./components/Pages/LesCocktails.jsx"; // Vérifie le chemin
import CocktailDetail from "./components/Pages/CocktailDetail.jsx";
import RedirectToCocktails from "./components/Pages/CocktailDetail.jsx";
import { useModel } from './components/Context/ModelContext';
import Loader from "./components/UI/Loader.jsx";
import { bottlesConfig } from "./components/bottleConfig";
import DebugContext from './utils/DebugContext.jsx'; // Import du composant de debug
import gsap from 'gsap';

const LayoutWithCanvas = () => {
  const { selectedBottle, setSelectedBottle, isModelLoaded, cameraRef } = useModel();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const [isAnimationDone, setIsAnimationDone] = useState(false); // Nouveau état pour l'animation du rideau
  const isHome = location.pathname === "/";
  const isKnowHow = location.pathname === "/Know-How"; // Vérifie si la page actuelle est KnowHow
  const isOurUniverse = location.pathname === "/Our-Universe"; // Vérifie si la page actuelle est KnowHow
  const isLesCocktails = location.pathname === "/Les-Cocktails"; // Vérifie si la page actuelle est KnowHow
  const isLesCocktailDetail = location.pathname === "/cocktail/:id"; // Vérifie si la page actuelle est KnowHow
  const isCanvasVisible = location.pathname === "/" || location.pathname.startsWith("/explore");

  useEffect(() => {
    // Vérifier si la route actuelle est une route de détail de cocktail
    const isCocktailDetail = location.pathname.startsWith("/cocktail/");
    const assetsToLoad = 10;
    let loaded = 0;

 
    const interval = setInterval(() => {
      loaded++;
      setProgress((loaded / assetsToLoad) * 100);

      if (loaded === assetsToLoad) {
          clearInterval(interval);
          setIsLoaded(true);

          // Lancez l'animation de rideau
          gsap.to(".loading-curtain", {
              y: "-100%", // Glisse vers le haut
              duration: 1, // Durée de l'animation
              ease: "power2.out",
              onComplete: () => setIsAnimationDone(true),
          });
      }
  }, 300);

    if (!isCocktailDetail) {
      // Animation d'entrée pour les pages autres que les détails de cocktail
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
    }

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

      {!isAnimationDone && (
        <div className="loading-curtain fixed top-0 left-0 w-full h-full bg-black  z-[60]"></div>
          )}
           {!isLoaded && <Loader progress={progress} />}

      {/* Barre de navigation */}
      <Navbar className="fixed z-40" />

      {/* Affichage du décor de la jungle si on est sur la Home */}
      {isHome && !isLesCocktailDetail && (
        <div  id="jungle-section" className="page-content relative left-0 z-0 w-full h-screen pointer-events-none">
          <Jungle isModelLoaded={isModelLoaded} position="background" />
        </div>
      )}
  
  {!isKnowHow && !isOurUniverse && !isLesCocktails && !isLesCocktailDetail && isCanvasVisible && (
        <div id="canvas-container" className="page-content fixed inset-0 z-10 pointer-events-none">
          <CanvaContainer isModelLoaded={isModelLoaded} selectedBottle={selectedBottle} />
        </div>
      )} 
      { !isLesCocktails && !isLesCocktailDetail && isCanvasVisible && (
        <div id="jungle-section" className="page-content absolute top-0 z-20 left-0 w-full h-screen pointer-events-none">
          <Jungle isModelLoaded={isModelLoaded} position="foreground" />
        </div>
              )}
 

      {/* Contenu de l'application */}
      <div className="page-content w-full relative z-30 pointer-events-auto">
        <Routes>
          <Route path="/" element={<Home isModelLoaded={isModelLoaded} />} />
          <Route path="/model/:id" element={<ModelDetail isModelLoaded={isModelLoaded} />} />
          <Route path="/Our-Universe" element={<OurUniverse />} />
          <Route path="/Know-How" element={<KnowHow />} />
          <Route path="/Les-Cocktails" element={<LesCocktails />} />
          <Route path="/cocktail/:id" element={<CocktailDetail />} />
          <Route path="/cocktail/" element={<RedirectToCocktails />} // Redirection ou composant d'erreur
/>        <Route path="*" element={<Navigate to="/" replace />} /> {/* Gérer les 404 */}

         </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWithCanvas;