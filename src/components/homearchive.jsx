import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useModel } from './Context/ModelContext';
import Section from "./UI/Section";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ isModelLoaded }) => {
  const containerRef = useRef(null);
  const { setSelectedBottle } = useModel();

  useEffect(() => {
    if (!isModelLoaded) {
      console.log("En attente que le modèle soit prêt...");
      return;
    }

    console.log("Initialisation des animations GSAP dans Home.");

    // Animation globale pour les sections
    gsap.utils.toArray(".highlight-title, .highlight-description, .highlight-button").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, [isModelLoaded]);

  return (
    <div ref={containerRef} className="home-container absolute w-full h-full">
      <div className="content-container">
        {/* Section 1 */}
        <Section
          className="zone-2"  
          title="ESCAPE THE EXPECTED"
          description="Every adventure begins with the desire to explore the unknown..."
          buttonText="DISCOVER MORE"
          alignment="end"
        />
        {/* Section 2 */}
        <Section
          className="zone-3"  
          title="KNOW HOW : FROM CANE TO GOLD"
          description="At Arcane Rum, our savoir-faire is a tribute to the rich heritage of Mauritius..."
          buttonText="UNVEIL OUR SECRETS"
          alignment="start"
        />
        {/* Slider Section */}
        <section className="zone-4 h-screen w-full flex justify-center bg-transparent" style={{ padding: "0 10vw" }}>
          <div className="w-full max-w-4xl">
            <BottleSlider
              bottles={bottlesConfig}
              onBottleChange={(id) => setSelectedBottle(id)}
            />
          </div>
        </section>
        {/* Section 3 */}
        <Section
        className="zone-5"  
          title="OUR COCKTAILS"
          description="Immerse yourself in the art of cocktails with Arcane RUM. Be adventurous with our creations..."
          buttonText="UNVEIL OUR SECRETS"
          alignment="end"
        />
      </div>
    </div>
  );
};

export default Home;