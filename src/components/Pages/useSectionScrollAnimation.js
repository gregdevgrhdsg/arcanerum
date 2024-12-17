import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useSectionScrollAnimation = (containerSelector, sectionSelector) => {
  useEffect(() => {
    // Sélection des sections
    const container = document.querySelector(containerSelector);
    const sections = gsap.utils.toArray(`${containerSelector} ${sectionSelector}`);

    if (!container || sections.length === 0) {
      console.warn("Aucune section trouvée pour l'animation.");
      return;
    }

    // Créer des ScrollTriggers pour chaque section
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 99%",
        end: "bottom top",
        onEnter: () => {
          gsap.to(window, {
            scrollTo: {
              y: section,
              autoKill: false,
              ease: "power8.inOut",
            },
            duration: 1,
            scrub: true,
          });
        },
      });
    });

    // Nettoyage des triggers
    return () => {
    };
  }, [containerSelector, sectionSelector]);
};

export default useSectionScrollAnimation;