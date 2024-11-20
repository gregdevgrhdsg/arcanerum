import React from "react";
import { useGLTF } from "@react-three/drei";

export const Flamboyance = React.forwardRef((props, ref) => {
  const { scene } = useGLTF("/models/ArcaneFlamboyance.glb");

  return (
    <primitive
      ref={ref} // Attache la référence ici
      object={scene}
      scale={[20, 20, 20]} // Ajustez l'échelle si nécessaire
      position={[0, -2.5, 0]} // Centrez le modèle
    />
  );
});
