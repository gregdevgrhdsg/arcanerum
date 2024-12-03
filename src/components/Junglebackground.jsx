import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Jungle = ({ isModelReady }) => {
  useEffect(() => {
    if (!isModelReady) {
      console.log("En attente que le modèle soit prêt...");
      return;
    }
    // Parallax effect using GSAP and ScrollTrigger
    ScrollTrigger.matchMedia({
      "(min-width: 268px)": function () {
        gsap.fromTo(
          ".layer-ciel",
          { y: 0, scale: 1 },
          {
            y: 750,
            scale: 1.2,
            transformOrigin: "bottom left",
            scrollTrigger: {
              trigger: ".jungle-section",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          ".layer-plante1",
          { y: 0, scale: 1 },
          {
            y: 1000,
            scale: 1.5,
            ease: "power1.out",
            transformOrigin: "bottom left",
            scrollTrigger: {
              trigger: ".jungle-section",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          ".layer-poisson",
          { y: 0, x: 0, scale: 1 },
          {
            x: -600,
            y: 850,
            scale: 1.5,
            ease: "power1.out",
            transformOrigin: "bottom left",
            scrollTrigger: {
              trigger: ".jungle-section",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          ".layer-dodoA",
          { y: 0, x: 0, scale: 1 },
          {
            x: -200,
            y: 1000,
            scale: 1.5,
            ease: "power1.out",
            transformOrigin: "bottom left",
            scrollTrigger: {
              trigger: ".jungle-section",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          ".layer-rocher",
          { y: 0, x: 0, scale: 1 },
          {
            x: -1000,
            y: 1000,
            scale: 1.5,
            ease: "power1.out",
            transformOrigin: "bottom left",
            scrollTrigger: {
              trigger: ".jungle-section",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      },
    });
  }, [isModelReady]);

  return (
    <div className="jungle-section absolute w-full h-screen pointer-events-none z-[0]">
      {[
        { src: "/models/fond/fondPrincipal.png", alt: "Fond Principal", className: "layer-fond-principal absolute top-0 left-0 w-full h-full z-0" },
        { src: "/models/fond/ciel.png", alt: "ciel", className: "layer-ciel absolute top-0 left-0 w-full h-full" },
        { src: "/models/fond/plante1.png", alt: "Plante 1", className: "layer-plante1 absolute top-0 left-0 w-full h-full " },
        { src: "/models/fond/plante2.png", alt: "Plante 2", className: "layer-plante2 absolute top-0 left-0 w-full h-full" },
        { src: "/models/fond/elephant.png", alt: "Éléphant", className: "layer-elephant absolute top-0 left-0 w-full h-full" },
        { src: "/models/fond/poisson.png", alt: "Poisson", className: "layer-poisson absolute top-0 left-0 w-full h-full" },
        { src: "/models/fond/poissonEau.png", alt: "Poisson dans l'eau", className: "layer-poisson-eau absolute top-0 left-0 w-full h-full" },
        { src: "/models/fond/papillon.png", alt: "Papillon", className: "layer-papillon absolute top-0 left-0 w-full h-full" },
        { src: "/models/fond/rocher.png", alt: "Rocher", className: "layer-rocher absolute top-0 left-0 w-full h-full" },
        { src: "/models/fond/dodoA.png", alt: "DodoA", className: "layer-dodoA absolute top-0 left-0 w-full h-full z-[10]" },
      ].map((layer, index) => (
        <div key={index} className={`jungle-layer ${layer.className}`}>
          <img src={layer.src} alt={layer.alt} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default Jungle;