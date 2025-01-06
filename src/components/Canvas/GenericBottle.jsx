// src/components/Canvas/GenericBottle.jsx
import React, { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

const BaseModel = React.forwardRef(
  ({ gltfPath, position, scale, rotation, onLoad }, ref) => {
    const { scene } = useGLTF(gltfPath, true);

    useEffect(() => {
      if (scene) {
        if (onLoad) onLoad(); // Notifie que le modèle est prêt
      }
    }, [scene, gltfPath, onLoad]);

    return (
      <primitive
        ref={ref}
        object={scene}
        position={position}
        scale={scale}
        rotation={rotation}
      />
    );
  }
);

// Précharge les modèles pour améliorer les performances
useGLTF.preload("/models/ArcaneExtraroma.glb");
useGLTF.preload("/models/ArcaneAnanas.glb");
useGLTF.preload("/models/ArcaneFlamboyance.glb");
useGLTF.preload("/models/ArcaneVanille.glb");

// Exportation des modèles spécifiques
export const RumA = React.forwardRef((props, ref) => (
  <BaseModel ref={ref} {...props} gltfPath="/models/ArcaneExtraroma.glb" />
));

export const RumB = React.forwardRef((props, ref) => (
  <BaseModel ref={ref} {...props} gltfPath="/models/ArcaneAnanas.glb" />
));

export const Flamboyance = React.forwardRef((props, ref) => (
  <BaseModel ref={ref} {...props} gltfPath="/models/ArcaneFlamboyance.glb" />
));

export const RumC = React.forwardRef((props, ref) => (
  <BaseModel ref={ref} {...props} gltfPath="/models/ArcaneVanille.glb" />
));

export const RumD = React.forwardRef((props, ref) => (
  <BaseModel ref={ref} {...props} gltfPath="/models/ArcaneBanane.glb" />
));

