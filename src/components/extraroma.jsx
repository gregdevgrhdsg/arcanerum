import React from "react";
import { useGLTF } from "@react-three/drei";

export const RumA = React.forwardRef((props, ref) => {
  const { scene } = useGLTF("/models/ArcaneExtraroma.glb");

  return (
    <primitive
      ref={ref} // Attache la référence ici
      object={scene}
      scale={[8, 8, 8]} // Ajustez l'échelle si nécessaire
      position={[0, -1.2, 0]} // Centrez le modèle
      rotation={[0, 0.46, 0]}
    />
  );
});
