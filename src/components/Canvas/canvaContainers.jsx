import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei"; // Import du composant Environment
import { bottlesConfig } from "../bottleConfig";
import { setupModelAnimations, rotateBottle } from "../Animations/ModelAnimations";
import { useModel } from "../Context/ModelContext";

const CanvasContainer = ({ selectedBottle }) => {
  const {
    modelRef,
    cameraRef,
    setIsModelLoaded,
    isModelLoaded,
    setRotationGroupRef,
  } = useModel();

  const [currentBottle, setCurrentBottle] = useState(selectedBottle || 0);
  const rotationGroupRef = useRef();
  const [screenSize, setScreenSize] = useState("desktop");

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

  // Récupérer la configuration actuelle de la bouteille
  const getBottleConfig = () => {
    const bottleConfig = bottlesConfig[currentBottle];
    if (!bottleConfig) {
      console.error(`Bouteille introuvable pour l'ID : ${currentBottle}`);
      return null;
    }

    // Gestion des positions responsives
    const position = bottleConfig.responsivePositions?.[screenSize] || {
      x: 0,
      y: 0,
      z: 0,
    };

    return {
      ...bottleConfig,
      position,
    };
  };

  // Appliquer les transformations initiales
  const applyInitialTransformations = (bottleConfig) => {
    if (!bottleConfig || !rotationGroupRef.current) return;

    const { position, rotation, scale } = bottleConfig;

    // Mettre à jour la position
    rotationGroupRef.current.position.set(
      position.x || 0,
      position.y || 0,
      position.z || 0
    );

    // Mettre à jour la rotation
    rotationGroupRef.current.rotation.set(
      rotation?.x || 0,
      rotation?.y || 0,
      rotation?.z || 0
    );

    // Mettre à jour l'échelle
    if (modelRef.current) {
      modelRef.current.scale.set(
        scale?.x || 1,
        scale?.y || 1,
        scale?.z || 1
      );
      console.log("Échelle appliquée :", scale); // Trace l'échelle
    }
  };

  // Charger le modèle et initialiser les animations
  const handleModelLoad = () => {
    if (!isModelLoaded) {
      console.log("Modèle chargé.");
      setIsModelLoaded(true);

      const bottleConfig = getBottleConfig();
      if (bottleConfig) {
        applyInitialTransformations(bottleConfig);
        setupModelAnimations(rotationGroupRef, cameraRef);
      }
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

      // Forcer une mise à jour
      if (rotationGroupRef.current) {
        rotationGroupRef.current.updateMatrixWorld(true);
      }
    }
  }, [screenSize]);

  // Ajuster la caméra en fonction de l'écran


  // Rendre le modèle
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
    <div className="relative w-full h-full">
      {!isModelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Chargement...
        </div>
      )}
      <Canvas
        className="sticky inset-0 top-0 h-screen"
        camera={{ position: [0, 0, 5], fov: 25 }}
        onCreated={({ camera, scene }) => {
          cameraRef.current = camera;

          if (!rotationGroupRef.current) {
            const group = new THREE.Group();
            scene.add(group);
            rotationGroupRef.current = group;
            setRotationGroupRef(group);
          }
        }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 8, 5]} intensity={3} />
        <Environment preset="forest" background={false} />        <group ref={rotationGroupRef}>{renderModel()}</group>
      </Canvas>
    </div>
  );
};

export default CanvasContainer;