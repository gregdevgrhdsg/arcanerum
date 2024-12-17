import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { bottlesConfig } from "../bottleConfig";
import { setupModelAnimations, rotateBottle, transitionToDetailView } from "../Animations/ModelAnimations";
import { useModel } from "../Context/ModelContext";

const CanvasContainer = ({ selectedBottle }) => {
  const {
    modelRef,
    cameraRef,
    setIsModelLoaded,
    isModelLoaded,
    isDetailView,
    setRotationGroupRef,
  } = useModel();

  const [currentBottle, setCurrentBottle] = useState(selectedBottle);
  const rotationGroupRef = useRef();

  /**
   * Fonction pour appliquer les positions et rotations initiales
   * définies dans bottlesConfig.
   */
  const applyInitialTransformations = (bottleConfig) => {
    if (rotationGroupRef.current) {
      // Appliquer la position initiale
      rotationGroupRef.current.position.set(
        bottleConfig.position.x || 0,
        bottleConfig.position.y || 0,
        bottleConfig.position.z || 0,
      );
      // Appliquer la rotation initiale
      rotationGroupRef.current.rotation.set(
        bottleConfig.rotation.x || 0,
        bottleConfig.rotation.y || 0,
        bottleConfig.rotation.z || 0,
      );
      console.log(`Position initiale appliquée :`, rotationGroupRef.current.position);
      console.log(`Rotation initiale appliquée :`, rotationGroupRef.current.rotation);
    }
  };

  /**
   * Chargement du modèle et initialisation des animations.
   */
  const handleModelLoad = () => {
    if (!isModelLoaded) {
      console.log("Modèle chargé.");
      setIsModelLoaded(true);

      // Appliquer les transformations initiales de la bouteille actuelle
      const bottle = bottlesConfig[selectedBottle];
      applyInitialTransformations(bottle);

      // Configurer les animations pour `rotationGroupRef`
      setupModelAnimations(rotationGroupRef, cameraRef);
    }
  };

  /**
   * Gérer le changement de bouteille.
   */
  useEffect(() => {
    if (selectedBottle !== currentBottle) {
      console.log(`Changement de bouteille détecté : ${selectedBottle}`);

      // Appliquer une rotation supplémentaire (si nécessaire)
      if (rotationGroupRef.current) {
        rotateBottle(rotationGroupRef);
      }
      setCurrentBottle(selectedBottle);
    }
  }, [selectedBottle, currentBottle]);

  /**
   * Gérer la transition vers la vue détaillée.
   */
  useEffect(() => {
    if (isDetailView && rotationGroupRef.current && cameraRef.current) {
      console.log("Transition vers la vue détaillée...");
      transitionToDetailView(cameraRef, rotationGroupRef, () => {
        console.log("Transition terminée.");
      });
    }
  }, [isDetailView]);

  /**
   * Rendu du modèle.
   */
  const renderModel = () => {
    const bottle = bottlesConfig[currentBottle] || { component: DefaultComponent };
    const BottleComponent = bottle.component;

    return (
      <BottleComponent
        ref={modelRef}
        scale={[bottle.scale?.x || 1, bottle.scale?.y || 1, bottle.scale?.z || 1]}
        onLoad={() => {
          if (modelRef.current) {
            handleModelLoad();
          }
        }}
      />
    );
  };

  return (
    <div className="relative h-full">
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
          camera.updateProjectionMatrix(); // Assure que la caméra est bien synchronisée
        }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 8, 5]} intensity={3} />
        <group ref={rotationGroupRef}>
          <axesHelper args={[2]} /> {/* Helper pour visualiser le pivot */}
          {renderModel()}
        </group>
      </Canvas>
    </div>
  );
};

export default CanvasContainer;