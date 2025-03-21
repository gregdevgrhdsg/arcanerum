// src/components/Canvas/CocktailCanva.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useModel } from "../Context/ModelContext";
import gsap from "gsap";

const CocktailSprite = () => {
  const spriteRef = useRef();
  const { modelRef } = useModel();
  const texture = useLoader(THREE.TextureLoader, "/assets/cocktails/cocktailTest.webp");

  useEffect(() => {
    if (spriteRef.current) {
      gsap.fromTo(
        spriteRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 3, y: 3, z: 3, duration: 1.5, ease: "power2.out" }
      );

      gsap.fromTo(
        spriteRef.current.material,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    }
  }, []);

  useFrame(() => {
    if (!modelRef.current || !spriteRef.current) return;

    // ✅ Ajustement de la position pour bien aligner le verre de cocktail
    const offset = new THREE.Vector3(0, -1.2, 1.5); // Décalé devant et en bas
    const newPos = new THREE.Vector3().copy(modelRef.current.position).add(offset);
    
    spriteRef.current.position.copy(newPos);
  });

  return (
    <sprite ref={spriteRef} scale={[10, 10, 3]}>
      <spriteMaterial map={texture} transparent opacity={1} />
    </sprite>
  );
};

const CocktailCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 80 }} // Caméra plus reculée
      gl={{ logarithmicDepthBuffer: true }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 5, // On s'assure qu'il est bien devant
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <CocktailSprite />
    </Canvas>
  );
};

export default CocktailCanvas;