// src/components/Canvas/canvaContainers.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { bottlesConfig } from "../bottleConfig";
import { setupModelAnimations, rotateBottle } from "../Animations/ModelAnimations";
import { useModel } from "../Context/ModelContext";
import { useTranslation } from "react-i18next";
import { OrthographicCamera, OrbitControls } from '@react-three/drei';


const ModelUpdater = ({ modelRef, setModelTransform }) => {
  useFrame(() => {
    if (modelRef.current) {
      setModelTransform({
        position: { x: modelRef.current.position.x, y: modelRef.current.position.y },
        scale: { x: modelRef.current.scale.x, y: modelRef.current.scale.y },
      });
    }
  });

  return null; // ✅ Ce composant ne rend rien, il sert juste à mettre à jour l'état
};
// Fonction pour suivre la position du modèle et la projeter en coordonnées écran
function TrackModelPosition() {
  const { modelRef, cameraRef, setRockPos } = useModel();

  useFrame(({ gl, camera }) => {
    if (!modelRef.current) return;
    const { width, height } = gl.domElement;
    
    // Copiez la position actuelle du modèle
    const pos = modelRef.current.position.clone();
    // Soustrayez un offset pour atteindre la base de la bouteille
    const offsety = 1.03; // Essayez avec 2.8, puis ajustez
    const offsetx = 0.45; // Essayez avec 2.8, puis ajustez
    pos.y -= offsety;
    pos.x -= offsetx;
    
    // Projection en coordonnées écran
    pos.project(camera);
    const x = (pos.x * 0.5 + 0.5) * width;
    const y = (pos.y * -0.5 + 0.5) * height;
    setRockPos({ x, y });
    console.log("rockPos ajusté:", { x, y });
  });

  return null;
}


const CanvasContainer = ({ selectedBottle, setModelTransform }) => {
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
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
const [isInZone5, setIsInZone5] = useState(false); // Permet d'afficher uniquement en zone 5


  // Détection de la taille d'écran
  const detectScreenSize = () => {
    const width = window.innerWidth;
    if (width < 760) {
      setScreenSize("mobile");
    } else if (width < 1024) {
      setScreenSize("tablet");
    } else if (width < 1440) {
      setScreenSize("medium");
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

  // Appliquer les transformations initiales
  const applyInitialTransformations = (bottleConfig) => {
    if (!bottleConfig || !rotationGroupRef.current) return;

    const { position, rotation, scale } = bottleConfig;

    rotationGroupRef.current.position.set(
      position.x || 0,
      position.y || 0,
      position.z || 0
    );

    rotationGroupRef.current.rotation.set(
      rotation?.x || 0,
      rotation?.y || 0,
      rotation?.z || 0
    );

    if (modelRef.current) {
      modelRef.current.scale.set(
        scale?.x || 1,
        scale?.y || 1,
        scale?.z || 1
      );
      console.log("Échelle appliquée :", scale); // Log de débogage
    }
  };

  // Charger le modèle et initialiser les animations
  const handleModelLoad = () => {
    if (!isModelLoaded) {
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
        style={{ aspectRatio: "3/9" }} // ou un wrapper .someClass { aspect-ratio: 16/9; }
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
        <ModelUpdater modelRef={modelRef} setModelTransform={setModelTransform} />
        <TrackModelPosition />
      </Canvas>
    </div>
  );
};

export default CanvasContainer;

