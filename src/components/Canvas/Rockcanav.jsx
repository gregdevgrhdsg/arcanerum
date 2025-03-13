// src/components/Canvas/RockCanvas.jsx
import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useModel } from "../Context/ModelContext";

const RockSprite = () => {
  const rockRef = useRef();
  const { modelRef } = useModel();
  const texture = useLoader(THREE.TextureLoader, "/assets/jungle/layer-rock.webp");

  useFrame(() => {
    if (!modelRef.current || !rockRef.current) return;
    // On définit ici l'offset en coordonnées monde,
    // ce qui garantit que le rocher est placé dans la scène par rapport au modèle.
    const offset = new THREE.Vector3(2.2, -2.2, -7);
    const newPos = new THREE.Vector3().copy(modelRef.current.position).add(offset);
    rockRef.current.position.copy(newPos);
  });

  return (
    <sprite ref={rockRef} scale={[3.9, 1.5, 3.9]}>
      <spriteMaterial map={texture} />
    </sprite>
  );
};

const RockCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 25 }}
      gl={{ logarithmicDepthBuffer: true }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none", // pour laisser passer les interactions
      }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={1} />
      <RockSprite />
    </Canvas>
  );
};

export default RockCanvas;