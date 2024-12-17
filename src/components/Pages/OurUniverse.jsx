import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const OurUniverse = () => {
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
            <section className="h-screen flex flex-col items-start justify-center pl-[5vw] bg-transparent">
              <div className="text-left max-w-[50vw]">
                <h2 className="highlight-title font-yana text-gold text-4xl mb-4">ESCAPE THE EXPECTED</h2>
                <p className="highlight-description text-white text-xl font-300 leading-relaxed mb-6">
                AIn a world where the ordinary prevails, Arcane Rum invites you to uncover the mystery of the everyday and taste the extraordinary. 
                Imagine a journey worthy of an odyssey on the island of Mauritius, where nature whispers its best-kept secrets into the depths of your taste buds.
                In your quest for uniqueness, dive into the heart of this opulent island, guided by the whispers of the fauna, flora, and the intoxicating scent of rum. 
                Each sip of Arcane Rum revives the senses, revealing stories buried in the sacred nectar of sugarcane. 
                Our master blenders jealously guard the secrets of a distillation that transforms lush aromas into a singular elixir. 
                Tropical flavors burst, evoking exotic fruits and wildflowers from the island. 
                Each bottle in our range is a mystery to be unraveled, emanating from the opulent and enigmatic Mauritian land. 
                This rum is not just a drink; it’s a gateway to a universe of legends and wonders, where every organoleptic detail tells an epic tale of discovery and escape. 
                Embark on this sensory adventure that becomes a true initiatory journey, where Arcane Rum is not just discovered but experienced as an awakening of the senses and the soul, defying everything you thought you knew about rum.
                </p>
              </div>
            </section>
    
            {/* Section 2 : Process */}
            <section className="h-screen flex flex-col items-end justify-center pr-[5vw] bg-transparent">
              <div className="text-right max-w-[30vw]">
                <h2 className="highlight-title font-yana text-gold text-4xl mb-4">MAURITIUS ISLAND, a land of BEAUTY AND mysteries </h2>
                <p className="highlight-description text-white text-xl font-yana leading-relaxed mb-6">
                ALocated in the heart of the Indian Ocean, Mauritius is more than just a beautiful island—it is the soul of Arcane Rum. 
                The island’s vibrant mix of African, Indian, European, and Chinese influences creates a unique cultural tapestry that inspires the brand's sense of mystery and discovery. 
                Mauritius is a land of hidden treasures, from its lush, volcanic landscapes to its rich folklore and music. Arcane Rum is deeply connected to this heritage, 
                infusing the island’s spirit into each bottle, celebrating its untold stories and exotic mysteries.
                </p>
              </div>
            </section>
    
            {/* Section 4 : Explore */}
            <section className="h-screen flex flex-col items-start justify-center pl-[5vw] bg-transparent">
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
    

export default OurUniverse;