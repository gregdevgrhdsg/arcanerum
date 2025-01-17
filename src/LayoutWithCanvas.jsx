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
import RedirectToCocktails from "./components/Pages/ RedirectToCocktails.jsx";
import OurRums from "./components/Pages/OurRum.jsx"
import RumDetailPage from "./components/Pages/RumDetailPage.jsx";
import Contact from "./components/Pages/Contact.jsx";
import { useModel } from './components/Context/ModelContext';
import Loader from "./components/UI/Loader.jsx";
import Footer from "./components/UI/Footer.jsx"; // Importez le Footer
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
    const isHomePage = location.pathname === "/"; // Vérifie si c'est la page d'accueil
    const assetsToLoad = 10;
    let loaded = 0;
    
    if (isHomePage) {
      setIsLoaded(false); // Réinitialise le loader
    
      const startTime = Date.now();

const interval = setInterval(() => {
  loaded++;
  setProgress((loaded / assetsToLoad) * 100);

  if (loaded === assetsToLoad) {
    clearInterval(interval);
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 2000 - elapsedTime); // Minimum 2s de chargement

    setTimeout(() => {
      setIsLoaded(true);

      // Animation de rideau
      gsap.to(".loading-curtain", {
        y: "-100%",
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          setIsAnimationDone(true);
        },
      });
    }, remainingTime);
  }
}, 500);
    }

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
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Position actuelle du scroll
      const elements = document.querySelectorAll('.text-gold-scroll');
  
      elements.forEach(el => {
        const offset = scrollPosition * 0.2; // Ajustez ce facteur pour modifier la vitesse
        el.style.setProperty('--scroll-offset', `${offset}px`);
      });
    };
  
    // Ajouter l'écouteur d'événement scroll
    window.addEventListener('scroll', handleScroll);
  
    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Animation de rideau */}
      {!isAnimationDone && (
        <div className="loading-curtain fixed top-0 left-0 w-full h-full bg-black z-[60]"></div>
      )}
      {!isLoaded && <Loader progress={progress} />}

      {/* Contenu principal */}
      <div className="flex-grow">
        {isHome && (
          <div id="jungle-section" className="relative z-0 w-full h-screen">
            <Jungle isModelLoaded={isModelLoaded} position="background" />
          </div>
        )}
        {isCanvasVisible && (
          <div id="canvas-container" className="fixed inset-0 z-10 pointer-events-none">
            <CanvaContainer isModelLoaded={isModelLoaded} selectedBottle={selectedBottle} />
            </div>
        )}
   {!isLesCocktails && !isLesCocktailDetail && isCanvasVisible && (
        <div id="jungle-section" className="page-content absolute top-0 z-20 left-0 w-full h-screen">
          <Jungle isModelLoaded={isModelLoaded} position="foreground" />
        </div>
      )}

        <div className="w-full relative z-30">
          <Routes>
            <Route path="/" element={<Home isModelLoaded={isModelLoaded} />} />
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