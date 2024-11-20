import React, { useEffect } from "react";
import gsap from "gsap";

const Junglebackground = () => {
  useEffect(() => {
    const animateJungleLayers = () => {
      gsap.fromTo(
        ".jungle-layer",
        {
          opacity: 0,
          scale: 0.8,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.3, // Décalage progressif entre les calques
        }
      );
    };

    animateJungleLayers();
  }, []);

  // Liste des calques à afficher
  const jungleLayers = [
    { src: "/models/fond/fondPrincipal.png", alt: "Fond Principal", className: "" },
    { src: "/models/fond/ciel.png", alt: "ciel", className: "layer-ciel" },
    { src: "/models/fond/plante1.png", alt: "Plante 1", className: "layer-plante1 z-10" },
    { src: "/models/fond/plante2.png", alt: "Plante 2", className: "layer-plante2" },
    { src: "/models/fond/elephant.png", alt: "Éléphant", className: "layer-elephant" },
    { src: "/models/fond/poisson.png", alt: "Poisson", className: "layer-poisson" },
    { src: "/models/fond/poissonEau.png", alt: "Poisson dans l'eau", className: "layer-poisson-eau" },
    { src: "/models/fond/papillon.png", alt: "Papillon", className: "layer-papillon" },
    { src: "/models/fond/rocher.png", alt: "Rocher", className: "layer-rocher" },
    { src: "/models/fond/dodoA.png", alt: "DodoA", className: "layer-dodoA z-10" },
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {jungleLayers.map((layer, index) => (
        <div
          key={index}
          className={`jungle-layer absolute w-full h-full ${layer.className}`}
        >
          <img
            src={layer.src}
            alt={layer.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Junglebackground;
