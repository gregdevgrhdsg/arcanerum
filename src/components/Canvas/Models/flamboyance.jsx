import React from "react";
import { useGLTF } from "@react-three/drei";

export const Flamboyance = React.forwardRef((props, ref) => {
  const { scene } = useGLTF("/models/ArcaneFlamboyance.glb");

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[8, 8, 8]}
      position={[0, -1.2, 0]}
      rotation={[0, 0.46, 0]}
    />
  );
});
