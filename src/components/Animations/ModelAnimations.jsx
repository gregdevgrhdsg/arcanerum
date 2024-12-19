import gsap from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Détection de la taille d'écran
const getScreenSize = () => {
  const width = window.innerWidth;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

// Configuration centralisée pour les zones avec animations responsives
const zoneConfigurations = {
  zone1: {
    trigger: ".zone-1",
    animations: {
      desktop: {
        position: { x: -0.1, y: -1, duration: 2, ease: "power5.inOut" },
        rotation: { y: 0.8, z: 0.2, duration: 2, ease: "power5.inOut" },
        camera: { fov: 25, z: 3.6, duration: 2, ease: "power5.inOut" },
      },
      tablet: {
        position: { x: 0, y: 0, duration: 2, ease: "power5.inOut" },
        rotation: { y: 0.6, z: 0.1, duration: 2, ease: "power5.inOut" },
        camera: { fov: 25, z: 4.5, duration: 2, ease: "power5.inOut" },
      },
      mobile: {
        position: { x: 0, y: -0.5, duration: 2, ease: "power5.inOut" },
        rotation: { y: 0.4, z: 0, duration: 2, ease: "power5.inOut" },
        camera: {fov: 25, z: 5.5, duration: 2, ease: "power5.inOut" },
      },
    },
  },
  zone2: {
    trigger: ".zone-2",
    animations: {
      desktop: {
        position: { x: 0, y: -1, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: -0.2, z: -0.2, duration: 2, ease: "power5.inOut" },
        camera: { z: 3.5, duration: 2, ease: "power5.inOut" },
      },
      tablet: {
        position: { x: 0, y: -0.8, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: -0.1, z: -0.1, duration: 2, ease: "power5.inOut" },
        camera: { z: 4.5, duration: 2, ease: "power5.inOut" },
      },
      mobile: {
        position: { x: 0.1, y: -0.5, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: 0, z: 0, duration: 2, ease: "power5.inOut" },
        camera: {fov: 75, z: 5.5, duration: 2, ease: "power5.inOut" },
      },
    },
  },
  zone3: {
    trigger: ".zone-3",
    animations: {
      desktop: {
        position: { x: 0.8, y: -0.9, z:0, duration: 1.5, ease: "power2.inOut" },
        rotation: { x:0, y:0, z: 0, duration: 1.5, ease: "power2.inOut" },
        camera: {  fov: 25, z: 4.8, duration: 1.5, ease: "power2.inOut" },  
      },
      tablet: {
        position: { x: 0, y: -0.8, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: -0.1, z: -0.1, duration: 2, ease: "power5.inOut" },
        camera: { fov: 35, z: 4.5, duration: 2, ease: "power5.inOut" },
      },
      mobile: {
        position: { x: 0.1, y: -0.5, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: 0, z: 0, duration: 2, ease: "power5.inOut" },
        camera: { fov: 45, z: 5.5, duration: 2, ease: "power5.inOut" },
      },
    },
  },
  zone4: {
    trigger: ".zone-4",
    animations: {
      desktop: {
        position: { x: 0, y: -0.8, z:0, duration: 1.5, ease: "power2.inOut" },
        rotation: { y: 0, z: 0, duration: 1.5, ease: "power2.inOut" },
        camera: { z: 5, duration: 1.5, ease: "power2.inOut" },
      },
      tablet: {
        position: { x: 0, y: -0.8, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: -0.1, z: -0.1, duration: 2, ease: "power5.inOut" },
        camera: { z: 4.5, duration: 2, ease: "power5.inOut" },
      },
      mobile: {
        position: { x: 0.1, y: -0.5, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: 0, z: 0, duration: 2, ease: "power5.inOut" },
        camera: { z: 5.5, duration: 2, ease: "power5.inOut" },
      },
    },
  },
};

// Fonction pour créer une animation pour une zone
// Crée une animation pour une zone
// Fonction pour créer une animation pour une zone
const createZoneAnimation = (modelRef, cameraRef, animationConfig) => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: animationConfig.trigger,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  if (animationConfig.animations.position) {
    timeline.to(modelRef.current.position, animationConfig.animations.position);
  }

  if (animationConfig.animations.rotation) {
    timeline.to(modelRef.current.rotation, animationConfig.animations.rotation, "<");
  }

  if (animationConfig.animations.camera) {
    timeline.to(cameraRef.current.position, animationConfig.animations.camera, "<");
    cameraRef.current.updateProjectionMatrix();
  }
};

// Configure les animations pour une taille d'écran donnée
const setupAnimationsForScreenSize = (modelRef, cameraRef) => {
  if (!modelRef?.current || !cameraRef?.current) {
    console.warn("Références manquantes pour le modèle ou la caméra.");
    return;
  }

  const screenSize = getScreenSize();

  // Supprime tous les triggers existants
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Applique les configurations pour chaque zone
  Object.values(zoneConfigurations).forEach((zoneConfig) => {
    const animationConfig = zoneConfig.animations[screenSize];
    if (animationConfig) {
      createZoneAnimation(modelRef, cameraRef, { ...zoneConfig, animations: animationConfig });
    } else {
      console.warn(`Pas de configuration pour la taille d'écran ${screenSize} dans la zone ${zoneConfig.trigger}`);
    }
  });

  ScrollTrigger.refresh();
};

// Fonction principale pour configurer toutes les animations des zones
export const setupModelAnimations = (modelRef, cameraRef) => {
  if (!modelRef?.current || !cameraRef?.current) {
    console.warn("Références manquantes pour le modèle ou la caméra.");
    return;
  }

  setupAnimationsForScreenSize(modelRef, cameraRef);
};
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

// Animation pour les boutons sans défilement
export const animateButtonsOnScroll = () => {
  gsap.utils.toArray(".btn-animated").forEach((button) => {
    gsap.fromTo(
      button,
      { backgroundPosition: "200% 0" },
      {
        backgroundPosition: "-200% 0",
        duration: 2,
        ease: "linear",
        repeat: -1, // Répète continuellement
      }
    );
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

// Gestion dynamique sur redimensionnement
export const handleResize = (modelRef, cameraRef) => {
  window.addEventListener("resize", () => {
    setupAnimationsForScreenSize(modelRef, cameraRef);
  });
};