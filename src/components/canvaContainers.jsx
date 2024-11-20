import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { RumA } from "./extraroma";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CanvaContainer = ({ onModelReady }) => {
  const modelRef = useRef(null);
  const cameraRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    // Vérification si le modèle ou la caméra sont indisponibles
    if (!modelRef.current || !cameraRef.current) {
      if (!isModelLoaded) console.warn("Modèle ou caméra non disponible, en attente...");
      return;
    }

    console.log("Modèle et caméra prêts, initialisation des animations...");
    setIsModelLoaded(true); // Marquer le modèle comme chargé
    if (onModelReady) onModelReady();
  }, [isModelLoaded, onModelReady]);

  useEffect(() => {
    if (!isModelLoaded) return;

    // Nettoyer les anciens triggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // **Zone 1 : Animation initiale**
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".zone-1",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl1
      .to(modelRef.current.rotation, { z: 0 }, 0)
      .to(modelRef.current.rotation, { y: 1 }, 0)
      .to(cameraRef.current.position, { z: 3.8 }, 0)
      .to(modelRef.current.position, { x: -1 }, 0);

    // **Zone 2 : Ajustement de la caméra**
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".zone-2",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl2
      .to(modelRef.current.rotation, { y: -0.7 }, 0)
      .to(modelRef.current.rotation, { z: 0.5 }, 0)
      .to(modelRef.current.position, { x: 1 }, 0)
      .to(cameraRef.current.fov, { value: 50 }, 0);



    // **Zone 3 : Zoom caméra + rotation modèle**
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".zone-3",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl3
      .to(modelRef.current.rotation, { y: 0.6 }, 0)
      .to(modelRef.current.rotation, { x: 0 }, 0)
      .to(modelRef.current.rotation, { z: 0 }, 0)
      .to(modelRef.current.position, { x: -1 }, 0)
   

    cameraRef.current.updateProjectionMatrix(); // Mettre à jour la caméra pour les changements de fov

    ScrollTrigger.refresh(); // Rafraîchir GSAP
  }, [isModelLoaded]);


  return (
    <div className="relative h-[100vh]">
      {!isModelLoaded && <div className="absolute inset-0 flex items-center justify-center text-white">Chargement...</div>}
      <Canvas
        className="sticky top-0 h-screen"
        camera={{ position: [0, 0, 5], fov: 25 }}
        onCreated={({ camera }) => {
          cameraRef.current = camera;
        }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 8, 5]} intensity={3} />
        <group
          ref={modelRef}
          onUpdate={() => {
            if (!isModelLoaded) setIsModelLoaded(true);
          }}
        >
          <RumA />
        </group>
        <Environment files="/assets/environement.jpg" background={false} />
      </Canvas>
    </div>
  );
};

export default CanvaContainer;
