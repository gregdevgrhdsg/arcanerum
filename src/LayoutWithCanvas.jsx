// src/LayoutWithCanvas.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import CanvaContainer from "./components/Canvas/canvaContainers.jsx";
import Home from "./components/Pages/Home";
import ModelDetail from "./components/Pages/ModelDetail";
import Jungle from "./components/UI/Junglebackground";
import KnowHow from "./components/Pages/KnowHow.jsx";
import OurUniverse from "./components/Pages/OurUniverse.jsx";
import LesCocktails from "./components/Pages/LesCocktails.jsx";
import CocktailDetail from "./components/Pages/CocktailDetail.jsx";
import RedirectToCocktails from "./components/Pages/RedirectToCocktails.jsx";
import OurRums from "./components/Pages/OurRum.jsx";
import RumDetailPage from "./components/Pages/RumDetailPage.jsx";
import Contact from "./components/Pages/Contact.jsx";
import { useModel } from "./components/Context/ModelContext";
import Loader from "./components/UI/Loader.jsx";
import Footer from "./components/UI/Footer.jsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const LayoutWithCanvas = () => {
  const { selectedBottle, setSelectedBottle, isModelLoaded, cameraRef } = useModel();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
    if (isHome) {
      setIsLoaded(false);
      setIsAnimationDone(false);
      setProgress(0);

      const assetsToLoad = 10;
      let loaded = 0;

      const interval = setInterval(() => {
        loaded++;
        setProgress((loaded / assetsToLoad) * 100);

        if (loaded === assetsToLoad) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            gsap.to(".loading-curtain", {
              y: "-100%",
              duration: 1.5,
              ease: "power2.out",
              onComplete: () => {
                setIsAnimationDone(true); // ✅ Déclenche l'animation du modèle ici !
              },
            });
          });
        }
      }, 500);
    } else {
      setIsLoaded(true);
      setIsAnimationDone(true);
    }

    window.scrollTo(0, 0);
  }, [location]);


  return (
    <div className="relative flex flex-col min-h-full">
      {/* Animation de rideau */}
      {!isAnimationDone && (
        <div className="loading-curtain fixed top-0 left-0 w-full h-full bg-black z-[60]"></div>
      )}
      {!isLoaded && <Loader progress={progress} />}

      {/* Contenu principal */}
      <div className="flex-grow min-h-full">
        {isHome && (
          <div id="jungle-section" className="relative z-0 w-full h-screen">
            <Jungle isModelLoaded={isModelLoaded} position="background" />
          </div>
        )}
        {isCanvasVisible && (
          <div
            id="canvas-container"
            className={`${location.pathname === "/last-section" ? "absolute" : "fixed"
              } inset-0 z-10 pointer-events-none`}
          >
            <CanvaContainer
              isModelLoaded={isModelLoaded}
              selectedBottle={selectedBottle}
              isAnimationDone={isAnimationDone} // 🔥 Passe l'état ici
            />
          </div>
        )}
        {!isLesCocktails && !isLesCocktailDetail && isCanvasVisible && (
          <div id="jungle-section" className="page-content absolute top-0 z-20 left-0 w-full h-screen">
            <Jungle isModelLoaded={isModelLoaded} position="foreground" />
          </div>
        )}

        <div className="w-full h-400vmax relative z-30 page-content">
          <Routes>
            <Route path="/" element={<Home isModelLoaded={isModelLoaded}  isAnimationDone={isAnimationDone} />} />
            <Route path="/model/:id" element={<ModelDetail isModelLoaded={isModelLoaded} />} />
            <Route path="/Our-Universe" element={<OurUniverse />} />
            <Route path="/Know-How" element={<KnowHow />} />
            <Route path="/Les-Cocktails" element={<LesCocktails />} />
            <Route path="/cocktail/:id" element={<CocktailDetail />} />
            <Route path="/cocktail/" element={<RedirectToCocktails />} />
            <Route path="/Our-Rums/" element={<OurRums />} />
            <Route path="/rum/:id" element={<RumDetailPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutWithCanvas;