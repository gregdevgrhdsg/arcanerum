import gsap from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Configuration centralisée pour les zones
const zoneConfigurations = {
  zone1: {
    trigger: ".zone-1",
    animations: {
      position: { x: -0.1, y:-1, duration: 2, ease: "power5.inOut" },
      rotation: { y: 0.8, z: 0.2, duration: 2, ease: "power5.inOut" },
      camera: { z: 3.6, duration: 2, ease: "power5.inOut" },
    },
  },
  zone2: {
    trigger: ".zone-2",
    animations: {
      position: { x: 0, y:-1, z:0, duration: 2, ease: "power5.inOut" },
      rotation: { x: 0, y: -0.2, z:-0.2, duration: 2, ease: "power5.inOut" },
      camera: { z: 3.5, duration: 2, ease: "power5.inOut" },
    },
  },
  zone3: {
    trigger: ".zone-3",
    animations: {
      position: { x: 0.8, y: -0.9, z:0, duration: 1.5, ease: "power2.inOut" },
      rotation: { x:0, y:0, z: 0, duration: 1.5, ease: "power2.inOut" },
      camera: { z: 4.8, duration: 1.5, ease: "power2.inOut" },
    },
  },
  zone4: {
    trigger: ".zone-4",
    animations: {
      position: { x: 0, y: -0.8, z:0, duration: 1.5, ease: "power2.inOut" },
      rotation: { y: 0, z: 0, duration: 1.5, ease: "power2.inOut" },
      camera: { z: 5, duration: 1.5, ease: "power2.inOut" },
    },
  },
};

// Fonction pour créer une animation pour une zone
const createZoneAnimation = (modelRef, cameraRef, zoneConfig) => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: zoneConfig.trigger,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  if (zoneConfig.animations.position) {
    timeline.to(modelRef.current.position, zoneConfig.animations.position);
  }

  if (zoneConfig.animations.rotation) {
    timeline.to(modelRef.current.rotation, zoneConfig.animations.rotation, "<");
  }

  if (zoneConfig.animations.camera) {
    timeline.to(cameraRef.current.position, zoneConfig.animations.camera, "<");
  }

  cameraRef.current.updateProjectionMatrix();
};

// Configure toutes les animations des zones
export const setupModelAnimations = (modelRef, cameraRef) => {
  if (!modelRef?.current || !cameraRef?.current) {
    console.warn("Références manquantes pour le modèle ou la caméra.");
    return;
  }

  // Supprime les triggers existants

  // Crée les animations pour chaque zone
  Object.values(zoneConfigurations).forEach(zoneConfig => {
    createZoneAnimation(modelRef, cameraRef, zoneConfig);
  });

  ScrollTrigger.refresh();
};

// Transition vers la vue détaillée
// Transition vers la vue détaillée
export const transitionToDetailView = (cameraRef, rotationGroupRef, onComplete) => {
  if (!cameraRef?.current || !rotationGroupRef?.current) {
    console.warn("Transition annulée : caméra ou groupe de rotation non disponible.");
    return;
  }

  const targetPosition = new THREE.Vector3(0, 0, 2); // Position cible pour zoomer sur la bouteille
  const timeline = gsap.timeline({
    onComplete: () => {
      console.log("Transition terminée.");
      if (onComplete) onComplete();
    },
  });

  // Animation de la position de la caméra
  timeline.to(cameraRef.current.position, {
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: () => {
      cameraRef.current.updateProjectionMatrix(); // Assurez-vous que la matrice est mise à jour
    },
  });

  // Animation de la rotation pour viser le modèle
  timeline.to(
    cameraRef.current.rotation,
    {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
      ease: "power2.inOut",
    },
    "<" // En parallèle
  );
};

export const rotateBottle = (rotationGroupRef, rotationIncrement = Math.PI * 2) => {
  if (rotationGroupRef.current) {
    console.log("Rotation actuelle avant modification :", rotationGroupRef.current.rotation);

    // Normaliser la rotation actuelle Y dans la plage [0, 2π]
    rotationGroupRef.current.rotation.y = rotationGroupRef.current.rotation.y % (Math.PI * 2);

    // Ajouter la rotation relative (increment)
    const newRotationY = rotationGroupRef.current.rotation.y + rotationIncrement;

    // Appliquer la nouvelle rotation avec GSAP
    gsap.to(rotationGroupRef.current.rotation, {
      y: newRotationY, // Nouvelle rotation Y
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => {
        console.log("Rotation en cours :", rotationGroupRef.current.rotation.y);
      },
      onComplete: () => {
        console.log("Rotation terminée :", rotationGroupRef.current.rotation.y);
      },
    });
  } else {
    console.warn("Impossible de modifier la rotation, rotationGroupRef est null.");
  }
};
// Supprime tous les triggers
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  ScrollTrigger.refresh();
};

// Animation pour les boutons
// Animation pour les boutons sans défilement
export const animateButtonsOnScroll = () => {
  gsap.utils.toArray(".btn-animated").forEach((button) => {
    // Effet de reflet / brillance
    const shine = gsap.fromTo(
      button.querySelector("::before"),
      { x: "-200%" },
      {
        x: "200%",
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1, // Répète continuellement
      }
    );
    shine.play(); // L'effet de brillance démarre immédiatement
  });
};

// Animation d'entrée initiale
export const setupInitialAnimation = (modelRef, cameraRef) => {
  if (!modelRef?.current || !cameraRef?.current) {
    console.warn("Références manquantes pour l'animation initiale.");
    return;
  }

  gsap.fromTo(
    modelRef.current.position,
    { y: -5, z: 10 },
    { y: 0, z: 0, duration: 1.5, ease: "power3.out" }
  );

  gsap.fromTo(
    cameraRef.current.position,
    { z: 15 },
    { z: 5, duration: 1.5, ease: "power3.out" }
  );
};
