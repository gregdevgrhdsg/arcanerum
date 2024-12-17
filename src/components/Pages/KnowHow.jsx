import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


const KnowHow = () => {
  useEffect(() => {
    // Nettoie les anciens triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Animation des sections
    gsap.utils.toArray(".highlight-title, .highlight-description, .highlight-button").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Nettoie les triggers lors du démontage
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="know-how-container absolute w-full h-full">
      {/* Conteneur principal */}
      <div className="content-container">
        
        {/* Section 1 : Intro */}
        <section className="zone-1 h-screen flex flex-col items-start justify-center pl-[5vw] bg-transparent">
          <div className="text-left max-w-[30vw]">
            <h2 className="highlight-title font-yana text-gold text-4xl mb-4">THE ALCHEMY OF DISTILLATION</h2>
            <p className="highlight-description text-white text-sm font-300 leading-relaxed mb-6">
            Arcane distills pure, freshly pressed sugarcane juice close to cutting time to preserve its vibrant flavors. 
            This ensures that the rum captures the full aromatic essence of the cane.
            </p>
          </div>
        </section>

        {/* Section 2 : Process */}
        <section className="zone-2 h-screen flex flex-col items-end justify-center pr-[5vw] bg-transparent">
          <div className="text-right max-w-[30vw]">
            <h2 className="highlight-title font-yana text-gold text-4xl mb-4">A DYNAMIC MATURATION</h2>
            <p className="highlight-description text-white text-sm font-300 leading-relaxed mb-6">
            Aged in French and American oak barrels, Arcane rums benefit from Mauritius’ tropical climate. 
            Dynamic temperature variations speed up maturation, creating complex, opulent flavors in a shorter period.
            </p>
          </div>
        </section>

        {/* Section 4 : Explore */}
        <section className="zone-4 h-screen flex flex-col items-start justify-center pl-[5vw] bg-transparent">
          <div className="text-left max-w-[30vw]">
            <h2 className="highlight-title font-yana text-gold text-4xl mb-4">THe Arrangés: Crafted with Natural Flavors</h2>
            <p className="highlight-description text-white text-sm font-300 leading-relaxed mb-6">
              Want to learn more about our journey and products? Let us guide you through our world of rum.
            </p>
            <Link to="/Contact">
              <button className="highlight-button bg-gold text-black py-3 px-6 rounded-lg hover:bg-white transition-all">
                CONTACT US
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default KnowHow;