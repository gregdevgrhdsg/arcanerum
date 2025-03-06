// src/components/Context/ModelContext.jsx
import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const modelRef = useRef(null);
  const cameraRef = useRef(null);
  const rotationGroupRef = useRef(null);

  // États globaux
  const [selectedBottle, setSelectedBottle] = useState(0); // Par défaut, bouteille 0
  const [isDetailView, setIsDetailView] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isTransitionReady, setIsTransitionReady] = useState(false);
  const [modelPosition, setModelPosition] = useState({ x: 0, y: 0, z: 0 });
  const [rockPos, setRockPos] = useState({ x: 0, y: 0 });


  const [modelState, setModelState] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0.46, z: 0 },
  });

  const [modelTransform, setModelTransform] = useState({
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
  });

  const setModelRef = (ref) => {
    console.log("Model ref updated:", ref);
    modelRef.current = ref;
  };

  const setRotationGroupRef = (rotationGroup) => {
    if (!rotationGroupRef.current) {
      console.log("RotationGroup défini :", rotationGroup);
      rotationGroupRef.current = rotationGroup;
    }
  };

  const setCameraRef = (ref) => {
    console.log("Camera ref updated:", ref);
    cameraRef.current = ref;
  };

  useEffect(() => {
    if (modelRef.current == selectedBottle  )
    console.log("Model ref:", modelRef.current);
    console.log("Rotation group ref:", rotationGroupRef.current);
    console.log("Camera ref:", cameraRef.current);
  }, [modelRef.current, rotationGroupRef.current, cameraRef.current]);

  // Restaurer l'état depuis localStorage au chargement
  useEffect(() => {
    const savedBottle = localStorage.getItem("selectedBottle");
    const savedDetailView = localStorage.getItem("isDetailView");

    if (savedBottle !== null) setSelectedBottle(Number(savedBottle));
    if (savedDetailView !== null) setIsDetailView(JSON.parse(savedDetailView));
  }, []);

  // Sauvegarder l'état lorsque les valeurs changent
  useEffect(() => {
    localStorage.setItem("selectedBottle", selectedBottle);
  }, [selectedBottle]);

  useEffect(() => {
    localStorage.setItem("isDetailView", JSON.stringify(isDetailView));
  }, [isDetailView]);

  return (
    <ModelContext.Provider
      value={{
        modelRef,
        cameraRef,
        rotationGroupRef,
        selectedBottle,
        setSelectedBottle,
        isDetailView,
        setIsDetailView,
        isModelLoaded,
        setIsModelLoaded,
        modelState,
        setModelState,
        isTransitionReady,
        setIsTransitionReady,
        setRotationGroupRef,
        modelTransform,
        setModelTransform,
        modelPosition,
        setModelPosition,
        rockPos,
        setRockPos,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => useContext(ModelContext);