import gsap from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Détection de la taille d'écran
const getScreenSize = () => {
  const width = window.innerWidth;
  if (width < 1024) return "mobile";
  if (width < 1440) return "tablet";
  if (width < 1700) return "medium";
    else return "desktop";
};

// Configuration centralisée pour les zones avec animations responsives
const zoneConfigurations = {
  zone1: {
    trigger: ".zone-1",
    animations: {
      desktop: {
        position: { x: -0.2, y: -1, duration: 2, ease: "power5.inOut" },
        rotation: { y: 7.2, z: 0.2, duration: 2, ease: "power5.inOut" },
        camera: { z: 3.6, duration: 2, ease: "power5.inOut" },
      },      
      medium: {
        position: { x: -0.2, y: -1, duration: 2, ease: "power5.inOut" },
        rotation: { y: 7.2, z: 0.2, duration: 2, ease: "power5.inOut" },
        camera: { z: 4.5, duration: 2, ease: "power5.inOut" },
      },
      tablet: {
        position: { x: -0.2, y: -1, duration: 2, ease: "power5.inOut" },
        rotation: { y: 7.2, z: 0.2, duration: 2, ease: "power5.inOut" },
        camera: { z: 4.5, duration: 2, ease: "power5.inOut" },
      },
      mobile: {
        position: { x: -0.4, y: -0.8, duration: 2, ease: "power5.inOut" },
        rotation: { y: 6.8, z: 0, duration: 2, ease: "power5.inOut" },
        camera: {z:7, duration: 2, ease: "power5.inOut" },
      },
    },
  },
  zone2: {
    trigger: ".zone-2",
    animations: {
      desktop: {
        position: { x: 0.2, y: -1, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: -0.2, z: -0.2, duration: 2, ease: "power5.inOut" },
        camera: { z: 3.5, duration: 2, ease: "power5.inOut" },
      },
      medium: {
        position: { x: 0.3, y: -0.9, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: -0.2, z: -0.2, duration: 2, ease: "power5.inOut" },
        camera: { z: 4.5, duration: 2, ease: "power5.inOut" },
      },
      tablet: {
        position: { x: 0.3, y: -0.9, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: -0.2, z: -0.2, duration: 2, ease: "power5.inOut" },
        camera: { z: 4.5, duration: 2, ease: "power5.inOut" },
      },
      mobile: {
        position: { x: 0.4, y: -0.8, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: 0, z: 0, duration: 2, ease: "power5.inOut" },
        camera: { z: 6, duration: 2, ease: "power5.inOut" },
      },
    },
  },
  zone3: {
    trigger: ".zone-3",
    animations: {
      desktop: {
        position: { x: 0.7, y: -0.8, z:0, duration: 1.5, ease: "power5.inOut" },
        rotation: { x:0, y:0, z:0, duration: 1.5, ease: "power5.inOut" },
        camera: {  z: 4.5, duration: 1.5, ease: "power5.inOut" },  
      },
      medium: {
        position: { x: 0.5, y: -0.9, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: -0.1, z: 0, duration: 2, ease: "power5.inOut" },
        camera: {z: 5.5, duration: 2, ease: "power5.inOut" },
      },
      tablet: {
        position: { x: 0.5, y: -0.9, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: -0.1, z: 0, duration: 2, ease: "power5.inOut" },
        camera: {z: 5.5, duration: 2, ease: "power5.inOut" },
      },
      mobile: {
        position: { x: 0, y: -0.2, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: 0, z: 0, duration: 2, ease: "power5.inOut" },
        camera: {z: 7, duration: 2, ease: "power5.inOut" },
      },
    },
  },
  zone4: {
    trigger: ".zone-4",
    animations: {
      desktop: {
        position: { x: -1, y: -0.8, z:0, duration: 1.5, ease: "power2.inOut" },
        rotation: { y: 7.2, z: 0, x:0.04, duration: 1.5, ease: "power2.inOut" },
        camera: { z: 5, duration: 1.5, ease: "power2.inOut" },
      },
      medium: {
        position: { x: -0.5, y: -0.8, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: 1, z: 0, duration: 2, ease: "power5.inOut" },
        camera: { z: 4.5, duration: 2, ease: "power5.inOut" },
      },
      tablet: {
        position: { x: -0.5, y: -0.8, z: 0, duration: 2, ease: "power5.inOut" },
        rotation: { x: 0, y: 1, z: 0, duration: 2, ease: "power5.inOut" },
        camera: { z: 4.5, duration: 2, ease: "power5.inOut" },
      },
      mobile: {
        position: { x: -0.5, y: -0.8, duration: 2, ease: "power5.inOut" },
        rotation: { y: 1, z: 0, duration: 2, ease: "power5.inOut" },
        camera: { z: 6, duration: 2, ease: "power5.inOut" },
      },
    },
  },
};

let isLocked = false;

const createZoneAnimation = (modelRef, cameraRef, animationConfig) => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: animationConfig.trigger,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onLeave: () => {
        if (animationConfig.stopAtEnd) {
          isLocked = true; // Verrouiller le modèle
          const { position, rotation, camera } = animationConfig.animations;
          gsap.set(modelRef.current.position, position);
          gsap.set(modelRef.current.rotation, rotation);
          gsap.set(cameraRef.current.position, camera);
          cameraRef.current.updateProjectionMatrix();
        }
      
      },
    },
  });

  if (!isLocked) {
    timeline.to(modelRef.current.position, animationConfig.animations.position);
    timeline.to(modelRef.current.rotation, animationConfig.animations.rotation, "<");
    timeline.to(cameraRef.current.position, animationConfig.animations.camera, "<");
  }
};

export const setupGlobalFreeze = (modelRef, cameraRef) => {
  ScrollTrigger.create({
    trigger: ".last-zone", // Classe de la dernière zone
    start: "top top",
    end: "bottom top",
    onEnter: () => {
      // Figer le modèle et la caméra
      gsap.set(modelRef.current.position, { x: 0, y: 0, z: 0 });
      gsap.set(modelRef.current.rotation, { x: 0, y: 0, z: 0 });
      gsap.set(cameraRef.current.position, { z: 5 });
    },
  });
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

export const setupModelAnimations = (modelRef, cameraRef) => {
  if (!modelRef?.current || !cameraRef?.current) {
    console.warn("⛔ Annulation de setupModelAnimations : Références manquantes.");
    return;
  }

  console.log("✅ Initialisation de setupModelAnimations avec un modèle et une caméra valides.");
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
let hasInitialAnimationPlayed = false;

export const setupInitialAnimation = (modelRef, cameraRef) => {
  if (!modelRef?.current || !cameraRef?.current) {
    console.warn("Références manquantes pour l'animation initiale.");
    return;
  }

  if (hasInitialAnimationPlayed) {
    console.log("⏩ Animation d'entrée déjà jouée, on saute.");
    return;
  }

  hasInitialAnimationPlayed = true; // ✅ Marque l'animation comme jouée

  gsap.fromTo(
    modelRef.current.position,
    { y: -5, z: 5 },
    { y: 0, z: 0, duration: 0.5, ease: "power3.out" }
  );

  gsap.fromTo(
    cameraRef.current.position,
    { z: 5 },
    { z: 5, duration: 0.5, ease: "power3.out" }
  );
};
// Gestion dynamique sur redimensionnement
export const handleResize = (modelRef, cameraRef) => {
  window.addEventListener("resize", () => {
    setupAnimationsForScreenSize(modelRef, cameraRef);
  });
};