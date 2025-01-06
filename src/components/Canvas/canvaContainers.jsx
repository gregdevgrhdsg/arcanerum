// src/components/Canvas/canvaContainers.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { bottlesConfig } from "../bottleConfig";
import { setupModelAnimations, rotateBottle } from "../Animations/ModelAnimations";
import { useModel } from "../Context/ModelContext";
import { RumA, RumB, Flamboyance, RumC, RumD } from './GenericBottle'; // Assurez-vous d'importer correctement vos composants

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

    // Gestion des propriétés responsives
    const position =
      bottleConfig.responsivePositions?.[screenSize] || { x: 0, y: 0, z: 0 };
    const rotation =
      bottleConfig.responsiveRotations?.[screenSize] || { x: 0, y: 0, z: 0 };
    const scale =
      bottleConfig.responsiveScales?.[screenSize] || { x: 1, y: 1, z: 1 };

    return {
      ...bottleConfig,
      position,
      rotation,
      scale,
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

  // Réinitialiser le modèle lors du montage
  useEffect(() => {
    const bottleConfig = getBottleConfig();
    if (bottleConfig && rotationGroupRef.current && modelRef.current) {
      applyInitialTransformations(bottleConfig);
      setupModelAnimations(rotationGroupRef, cameraRef);
    }
  }, []);

  // Nettoyage des ressources lors du démontage du composant
  useEffect(() => {
    return () => {
      // Dispose des géométries, matériaux, textures, etc.
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child.isMesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material?.isMaterial) {
              cleanMaterial(child.material);
            } else if (Array.isArray(child.material)) {
              child.material.forEach((material) => cleanMaterial(material));
            }
          }
        });
      }

      // Dispose du rotation group
      if (rotationGroupRef.current) {
        rotationGroupRef.current.traverse((child) => {
          if (child.isMesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material?.isMaterial) {
              cleanMaterial(child.material);
            } else if (Array.isArray(child.material)) {
              child.material.forEach((material) => cleanMaterial(material));
            }
          }
        });
      }

      // Réinitialiser l'état de chargement du modèle
      setIsModelLoaded(false);
    };
  }, []);

  // Fonction pour nettoyer les matériaux
  const cleanMaterial = (material) => {
    material.dispose();

    // Dispose des textures si elles existent
    for (const key in material) {
      const value = material[key];
      if (value && typeof value === "object" && value.isTexture) {
        value.dispose();
      }
    }
  };

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
        onCreated={({ camera, scene, gl }) => {
          cameraRef.current = camera;

          if (!rotationGroupRef.current) {
            const group = new THREE.Group();
            scene.add(group);
            rotationGroupRef.current = group;
            setRotationGroupRef(group);
          }

          // Gestion de la perte et de la restauration du contexte WebGL
          const handleContextLost = (event) => {
            event.preventDefault();
            console.warn("WebGL Context Lost");
            gl.domElement.style.display = "none";
          };

          const handleContextRestored = () => {
            console.info("WebGL Context Restored");
            gl.domElement.style.display = "block";
            // Re-initialiser les animations ou tout autre état nécessaire
            if (rotationGroupRef.current && isModelLoaded) {
              setupModelAnimations(rotationGroupRef, cameraRef);
            }
          };

          gl.domElement.addEventListener("webglcontextlost", handleContextLost, false);
          gl.domElement.addEventListener("webglcontextrestored", handleContextRestored, false);

          // Nettoyage des écouteurs d'événements lors du démontage
          return () => {
            gl.domElement.removeEventListener("webglcontextlost", handleContextLost);
            gl.domElement.removeEventListener("webglcontextrestored", handleContextRestored);
          };
        }}
        style={{ width: "100vw", height: "100vh" }}
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