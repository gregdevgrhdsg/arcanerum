// src/components/Canvas/canvaContainers.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import gsap from "gsap"
import { bottlesConfig } from "../bottleConfig";
import { setupModelAnimations, rotateBottle, setupInitialAnimation } from "../Animations/ModelAnimations";
import { useModel } from "../Context/ModelContext";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CanvasContainer = ({ selectedBottle, isAnimationDone }) => {
  const {
    modelRef,
    cameraRef,
    setIsModelLoaded,
    isModelLoaded,
    setRotationGroupRef,
  } = useModel();

  const DEFAULT_BOTTLE = 0; // ID de la bouteille par défaut
  const { t } = useTranslation(); // Fonction de traduction
  const bottles = bottlesConfig(t); // Charge la configuration des bouteilles en fonction des traductions

  const [currentBottle, setCurrentBottle] = useState(selectedBottle || DEFAULT_BOTTLE);
  const rotationGroupRef = useRef();
  const [screenSize, setScreenSize] = useState("desktop");
  const [isIntroPlayed, setIsIntroPlayed] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // Détection de la taille d'écran
  const detectScreenSize = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setScreenSize("mobile");
    } else if (width < 1024) {
      setScreenSize("tablet");
    } else {
      setScreenSize("desktop");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", detectScreenSize);
    detectScreenSize(); // Initialisation au chargement
    return () => window.removeEventListener("resize", detectScreenSize);
  }, []);

  // Charger la bouteille par défaut si `selectedBottle` est null ou undefined
  useEffect(() => {
    if (selectedBottle === null || selectedBottle === undefined) {
      setCurrentBottle(DEFAULT_BOTTLE);
    } else {
      setCurrentBottle(selectedBottle);
    }
  }, [selectedBottle]);

  // Récupérer la configuration de la bouteille actuelle
  const getBottleConfig = () => {
    const bottleConfig = bottles[currentBottle];
    if (!bottleConfig) {
      console.error(`Bouteille introuvable pour l'ID : ${currentBottle}`);
      return null;
    }
    const position =
      bottleConfig.responsivePositions?.[screenSize] || { x: 0, y: 0, z: 0 };
    const rotation =
      bottleConfig.responsiveRotations?.[screenSize] || { x: 0, y: 0, z: 0 };
    const scale =
      bottleConfig.responsiveScales?.[screenSize] || { x: 1, y: 1, z: 1 };

    return { ...bottleConfig, position, rotation, scale };
  };


 // Appliquer la transformation initiale
 const applyInitialTransformations = (bottleConfig) => {
  if (!bottleConfig || !rotationGroupRef.current) return;

  // Position de départ hors écran
  rotationGroupRef.current.position.set(0, 10, -20);
  rotationGroupRef.current.rotation.set(0, 0, 0);

  if (modelRef.current) {
    modelRef.current.scale.set(bottleConfig.scale.x, bottleConfig.scale.y, bottleConfig.scale.z);
  }
};

useEffect(() => {
    if (isAnimationDone && rotationGroupRef.current && cameraRef.current && !isIntroPlayed) {
      setIsIntroPlayed(true);
      setIsReset(false);
  
      const bottleConfig = getBottleConfig();
      if (!bottleConfig) return;
  
      const { position, rotation, scale } = bottleConfig;
  
      if (modelRef.current) {
        gsap.set(modelRef.current.scale, {
          x: scale.x,
          y: scale.y,
          z: scale.z,
        });
      }
  
      // 🔥 Animation d'entrée fluide et propre
      const timeline = gsap.timeline({
        onComplete: () => {
          console.log("✅ Animation du modèle terminée !");
          setupModelAnimations(rotationGroupRef, cameraRef);
  
          // 🔥 ScrollTrigger ne se rafraîchit que **après** l'animation du modèle
          setTimeout(() => {
            ScrollTrigger.refresh();
            console.log("🎯 ScrollTrigger rafraîchi !");
          }, 300);
        },
      });
  
      timeline.to(rotationGroupRef.current.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: 2,
        ease: "power3.out",
      });
  
      timeline.to(rotationGroupRef.current.rotation, {
        y: `+=${2 * Math.PI}`,
        duration: 2,
        ease: "power3.out",
      }, "<");
  
      timeline.to(cameraRef.current.position, {
        z: 5,
        duration: 1.5,
        ease: "power3.out",
      }, "<");
    }
  }, [isAnimationDone]);

useEffect(() => {
  if (!isAnimationDone && !isReset) {
    setIsIntroPlayed(false);
    setIsReset(true);
  }
}, [isAnimationDone]);

const handleModelLoad = () => {
  if (!isModelLoaded) {
    console.log("🎯 Modèle chargé !");
    setIsModelLoaded(true);
    
    const bottleConfig = getBottleConfig();
    if (bottleConfig) {
      applyInitialTransformations(bottleConfig);
      setupModelAnimations(rotationGroupRef, cameraRef);
    }

    // ✅ Forcer un rafraîchissement de ScrollTrigger après 500ms
    setTimeout(() => {
      ScrollTrigger.refresh();
      console.log("🔄 ScrollTrigger rafraîchi après chargement du modèle !");
    }, 500);
  }
};
  // Gérer les changements de bouteille
  useEffect(() => {
    if (selectedBottle !== currentBottle) {
      setCurrentBottle(selectedBottle);

      if (rotationGroupRef.current) {
        rotateBottle(rotationGroupRef);
      }
    }
  }, [selectedBottle]);

  // Appliquer les transformations lors du changement de taille d'écran
  useEffect(() => {
    const bottleConfig = getBottleConfig();
    if (bottleConfig) {
      applyInitialTransformations(bottleConfig);
      if (rotationGroupRef.current) {
        rotationGroupRef.current.updateMatrixWorld(true);
      }
    }
  }, [screenSize]);

  // Réinitialiser le modèle lors du montage
  useEffect(() => {
    const bottleConfig = getBottleConfig();
    if (bottleConfig && rotationGroupRef.current && modelRef.current) {
      applyInitialTransformations(bottleConfig);
      setupModelAnimations(rotationGroupRef, cameraRef);
      setupInitialAnimation(modelRef, cameraRef);

    }
  }, []);

  // Nettoyage des ressources lors du démontage
  useEffect(() => {
    return () => {
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }

      if (rotationGroupRef.current) {
        rotationGroupRef.current.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }

      setIsModelLoaded(false);
    };
  }, []);

  // Rendu du modèle
  const renderModel = () => {
    const bottleConfig = getBottleConfig();
    if (!bottleConfig) return null;

    const BottleComponent = bottleConfig.component;

    return (
      <BottleComponent
        ref={modelRef}
        scale={[
          bottleConfig.scale?.x || 1,
          bottleConfig.scale?.y || 1,
          bottleConfig.scale?.z || 1,
        ]}
        onLoad={handleModelLoad}
      />
    );
  };

  return (
    <div className="relative w-full h-screen">
      {!isModelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Chargement...
        </div>
      )}
      <Canvas
        className="sticky inset-0 top-0 h-screen"
        camera={{ position: [0, 0, 5], fov: 25 }}
        onCreated={({ camera, scene, gl }) => {
          cameraRef.current = camera;

          if (!rotationGroupRef.current) {
            const group = new THREE.Group();
            scene.add(group);
            rotationGroupRef.current = group;
            setRotationGroupRef(group);
          }

          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            gl.domElement.style.display = "none";
          });

          gl.domElement.addEventListener("webglcontextrestored", () => {
            gl.domElement.style.display = "block";
            if (rotationGroupRef.current && isModelLoaded) {
              setupModelAnimations(rotationGroupRef, cameraRef);
            }
          });
        }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 8, 5]} intensity={3} />
        <Environment preset="forest" background={false} />
        <group ref={rotationGroupRef}>{renderModel()}</group>
      </Canvas>
    </div>
  );
};

export default CanvasContainer;