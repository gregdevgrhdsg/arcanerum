import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HighlightsB = ({ section, isModelReady }) => {
  useEffect(() => {
    if (!isModelReady) {
      console.log(`En attente que le modèle soit prêt pour ${section}...`);
      return;
    }

    console.log(`Initialisation des animations pour ${section}...`);

    // Animation pour le titre
    gsap.fromTo(
      `.${section} .highlight-title`,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${section}`,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animation pour le paragraphe
    gsap.fromTo(
      `.${section} .highlight-description`,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${section}`,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animation pour le bouton
    gsap.fromTo(
      `.${section} .highlight-button`,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${section}`,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [section, isModelReady]);

  return (
    <section
      className={`${section} h-screen flex flex-col items-start justify-center pl-[5vw]`}
    >
      <div className="text-left max-w-[30vw]">
        <h2 className="highlight-title font-yana text-gold text-4xl mb-4">
        KNOW HOW : <br/> FROM CANE TO GOLD
        </h2>
        <p className="highlight-description text-white text-sm font-300 leading-relaxed mb-6">
          At Arcane Rum, our savoir-faire is a tribute to the rich heritage of Mauritius. 
          From the cultivation of pure sugarcane to the mastery of distillation, every step is guided by a deep 
          respect for tradition and innovation. Our master blenders transform nature’s finest ingredients into an elixir 
          bursting with tropical aromas and smooth complexity. Explore the secrets of our craft and uncover the essence 
          of Mauritian excellence in every sip. 
        </p>
        <button className="highlight-button bg-gold text-black py-3 px-6 rounded-lg hover:bg-white transition-all">
          UNVEIL OUR SECRETS
        </button>
      </div>
    </section>
  );
};

export default HighlightsB;
