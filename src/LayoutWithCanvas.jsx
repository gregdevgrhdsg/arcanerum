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
import PrivacyPolicy from "./components/Pages/PrivacyPolicy.jsx";
import Contact from "./components/Pages/Contact.jsx";
import { useModel } from "./components/Context/ModelContext";
import Loader from "./components/UI/Loader.jsx";
import Footer from "./components/UI/Footer.jsx";
import RockCanvas from "./components/Canvas/Rockcanav.jsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const LayoutWithCanvas = () => {
  const { selectedBottle, setSelectedBottle, isModelLoaded, cameraRef, modelRef } = useModel();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [modelPositionBeforeAbsolute, setModelPositionBeforeAbsolute] = useState(null);
  const [modelTransform, setModelTransform] = useState({ position: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });
  const [shouldFixModel, setShouldFixModel] = useState(true);
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

  useEffect(() => {
    const handleScroll = () => {
      const cocktailsSection = document.getElementById("cocktails-section");

      if (cocktailsSection) {
        const rect = cocktailsSection.getBoundingClientRect();

        if (rect.top <= 1) {
          if (shouldFixModel) {
            console.log("🚀 Transition vers `absolute` !");
            setShouldFixModel(false);
          }
        } else {
          if (!shouldFixModel) {
            console.log("🔄 Reste en `fixed`");
            setShouldFixModel(true);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldFixModel]);



  return (
    <div className="flex flex-col min-h-screen">
      {/* Animation de rideau */}
      {!isAnimationDone && (
        <div className="loading-curtain fixed top-0 left-0 w-full h-full bg-black z-[60]"></div>
      )}
      {!isLoaded && <Loader progress={progress} />}

      {/* Contenu principal */}
      <div className="flex-grow min-h-full">
        {isHome && isCanvasVisible && (
          <div
            id="jungle-section"
            className="absolute top-0 left-0 w-full"
            style={{
              height: "500vh",
              overflow: "hidden", // 🔥 Empêche tout débordement
            }}
          >
            <Jungle isModelLoaded={isModelLoaded} position="background" followRock={true} />
          </div>
        )}
        {isCanvasVisible && (
          <div
            id="canvas-container"
            style={{
              position: shouldFixModel ? "fixed" : "absolute",
              top: shouldFixModel
                ? "0"
                : `${document.getElementById("cocktails-section")?.offsetTop || 0}px`, // 🔥 Évite un top incorrect si `cocktails-section` n'existe pas encore
              left: "0",
              width: "100%",
              height: "100vh",
              transition: "none", // 🔥 Désactive les animations inutiles ici
              zIndex: "10",
            }}
          >
            <CanvaContainer
              isModelLoaded={isModelLoaded}
              selectedBottle={selectedBottle}
              isAnimationDone={isAnimationDone}
              setModelTransform={setModelTransform}
            />
          </div>
        )}
        {isCanvasVisible && (
        <div className="  inset-0 left-0 z-5">
          <RockCanvas />
        </div>
        )}


        {!isLesCocktails && !isLesCocktailDetail && isCanvasVisible && (
          <div id="jungle-section" className="page-content absolute top-0 z-50 left-0 w-full h-screen">
            <Jungle isModelLoaded={isModelLoaded} position="foreground" />
          </div>
        )}

        <div className="w-full h-400vmax relative z-30 page-content">
          <Routes>
            <Route path="/" element={<Home isModelLoaded={isModelLoaded} isAnimationDone={isAnimationDone} />} />
            <Route path="/model/:id" element={<ModelDetail isModelLoaded={isModelLoaded} />} />
            <Route path="/Our-Universe" element={<OurUniverse />} />
            <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
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

      {/* Footer toujours en bas */}
      <Footer className="absolute w-full" />
    </div>
  );
};

export default LayoutWithCanvas;