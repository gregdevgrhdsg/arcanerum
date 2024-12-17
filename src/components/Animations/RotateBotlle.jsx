// src/components/Animations/rotateBottle.js
import gsap from "gsap";

const rotateBottle = (modelRef) => {
  console.log("rotateBottle fonction appelée");
  if (!modelRef?.current) {
    console.warn("Référence au modèle manquante pour la rotation.");
    return;
  }

  // Rotation continue sur l'axe Y
  gsap.to(modelRef.current.rotation, {
    y: "+=6.28319", // 2π radians = 360 degrés
    duration: 20,
    repeat: -1, // Répète indéfiniment
    ease: "none",
  });
};

