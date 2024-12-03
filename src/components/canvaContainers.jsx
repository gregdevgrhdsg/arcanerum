import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { createPortal } from "react-dom";
import { RumA } from "./extraroma";
import { Flamboyance } from "./flamboyance";
import { RumB } from "./Ananas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CanvaContainer = ({ selectedBottle, onModelReady }) => {
  const modelRef = useRef(null);
  const cameraRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Track if the user is on mobile
  const [currentBottle, setCurrentBottle] = useState(selectedBottle);
  const portalTarget = document.getElementById('canvas-root'); // Assurez-vous que ce div existe dans le HTML


  const bottleComponents = [<RumA />, <Flamboyance />, <RumB />];

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900); // Adjust the threshold as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initially

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Model loading check
  useEffect(() => {
    if (!modelRef.current || !cameraRef.current) {
      if (!isModelLoaded) console.warn("Modèle ou caméra non disponible, en attente...");
      return;
    }

    setIsModelLoaded(true); // Mark model as ready
    if (onModelReady) onModelReady(); // Notify parent that the model is ready
  }, [isModelLoaded, onModelReady]);

  // Synchronize bottle change with animation
  useEffect(() => {
    if (selectedBottle !== currentBottle) {
      gsap.to(modelRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentBottle(selectedBottle);
          gsap.to(modelRef.current.rotation, { x: 0, y: -6.32, z: 0.2, duration: 0.5 });
        },
      });
    }
  }, [selectedBottle, currentBottle]);

  const renderModel = () => {
    return bottleComponents[currentBottle] || <RumA />;
  };

  // Main animations when the model is loaded
  useEffect(() => {
    if (!isModelLoaded) return;

    // Clear previous scroll triggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // ** Animation for desktop **: Adjust rotation and position
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".zone-1",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl1.to(modelRef.current.rotation, { z: 0.2 }, 0)
      .to(modelRef.current.rotation, { y: 1 }, 0)
      .to(cameraRef.current.position, { z: 3.8 }, 0)
      .to(modelRef.current.position, { x: -0.3 }, 0);

    // Adjustments for mobile
    if (isMobile) {
      gsap.to(cameraRef.current, {
        fov: 75, // Change field of view for mobile
        scrollTrigger: {
          trigger: ".zone-1",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(modelRef.current.position, {
        x: 0, // Adjust model position for mobile
        y: 0, // Elevate model on mobile
        z: 0, // Bring model closer on mobile
        duration: 1,
      });
      tl1.to(modelRef.current.rotation, { z: 0 }, 0)
        .to(modelRef.current.rotation, { y: 5 }, 0)
        .to(cameraRef.current.position, { z: 7 }, 0);
    }

    // ** Desktop-only animation **
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".zone-2",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl2.to(modelRef.current.rotation, { y: -0.7 }, 0)
      .to(modelRef.current.rotation, { z: -0.5 }, 0)
      .to(modelRef.current.position, { x: 1 }, 0)
      .to(cameraRef.current.fov, { value: 50 }, 0);

    // ** Zoom & rotation (for desktop) **
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".zone-3",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl3.to(modelRef.current.rotation, { y: 0 }, 0)
      .to(cameraRef.current.position, { z: 6.8 }, 0)
      .to(modelRef.current.position, { y: 0.4}, 0)
      .to(modelRef.current.rotation, { z: 0 }, 0)
      .to(modelRef.current.position, { x: 0 }, 0);

    cameraRef.current.updateProjectionMatrix(); // Update camera for changes in fov

    ScrollTrigger.refresh(); // Refresh GSAP triggers
  }, [isModelLoaded, isMobile]);

  return (
    <div className="relative h-[100vh]">
      {!isModelLoaded && <div className="absolute inset-0 flex items-center justify-center text-white">Chargement...</div>}
      <Canvas
        className="sticky inset-0 top-0 h-screen"
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
          {renderModel()}
        </group>
        <Environment files="/assets/environement.jpg" background={false} />
      </Canvas>
    </div>
  );
};

export default CanvaContainer;
