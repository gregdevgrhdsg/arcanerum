// src/components/Pages/Home.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import BottleSlider from "../UI/BottleSlider";
import { useModel } from '../Context/ModelContext';
import { bottlesConfig } from "../bottleConfig";
import { useNavigate } from "react-router-dom";
import ModelDetail from "../Pages/ModelDetail";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateButtonsOnScroll } from "../Animations/ModelAnimations";


const Home = ({ isModelLoaded }) => {
  // Destructure toutes les propriétés nécessaires du contexte
  const { containerRef, isDetailView, setIsDetailView, selectedBottle, setSelectedBottle, setBottlePosition, setBottleScale, setScrollPosition } = useModel();
  const navigate = useNavigate();

  const handleBuyClick = (newIndex) => {
    console.log(`Bouteille sélectionnée: ${newIndex}`);
    setSelectedBottle(newIndex);
  };
  useEffect(() => {
    animateButtonsOnScroll();
  }, []);
  
  useEffect(() => {
    if (!isModelLoaded) {
      console.log("En attente que le modèle soit prêt...");
      return;
    }
  
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const sections = gsap.utils.toArray(".content-container section");
    
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        end: "bottom top",
        onEnter: () => {
          gsap.to(window, {
            scrollTo: {
              y: section,
              autoKill: false,
              ease: "power3.inOut",
              scrub: true,
            },
            duration: 0.9,
          });
        },
      });
    });

    // Animation des éléments lorsqu'ils apparaissent dans le viewport
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


  }, [isModelLoaded, navigate, setSelectedBottle, isDetailView, setIsDetailView, setBottlePosition, setBottleScale]);

  return (
    <div ref={containerRef} className="home-container absolute w-full h-full">
      {/* Sections de Contenu */}
      <div className="content-container">
        {/* Zone 2 */}
        <section className="zone-2 h-screen flex flex-col items-end justify-center pr-[5vw] bg-transparent">
          <div className="text-center max-w-[30vw]">
            <h2 className="highlight-title font-yana text-gold text-4xl mb-4">ESCAPE THE EXPECTED</h2>
            <p className="highlight-description text-gold text-xl font-yana leading-relaxed mb-6">
            Every adventure begins with the desire to explore the unknown. Today, we invite you to journey into the heart of the extraordinary – through the senses, through flavors, and through the rich stories embedded in every drop of Arcane Rum. 
            </p>
            <Link to="/Our-Universe">
            <button className="highlight-button btn-animated">
              DISCOVER MORE
            </button>
            </Link>
          </div>
        </section>

        {/* Zone 3 */}
        <section className="zone-3 h-screen flex flex-col items-start justify-center pl-[5vw] bg-transparent">
          <div className="text-center max-w-[30vw]">
            <h2 className="highlight-title font-yana text-gold text-4xl mb-4">
              KNOW HOW : <br /> FROM CANE TO GOLD
            </h2>
            <p className="highlight-description text-gold text-xl font-yana leading-relaxed mb-6">
            At Arcane Rum, our savoir-faire is a tribute to the rich heritage of Mauritius. From the cultivation of pure sugarcane to the mastery of distillation, every step is guided by a deep respect for tradition and innovation. Our master blenders transform nature’s finest ingredients into an elixir bursting with tropical aromas and smooth complexity. Explore the secrets of our craft and uncover the essence of Mauritian excellence in every sip.             </p>
            <Link to="/Know-How">
            <button className="highlight-button btn-animated">UNVEIL OUR SECRETS</button>

            </Link>
          </div>
        </section>

        {/* Zone 4 - Slider */}
        <section className="zone-4 h-screen flex items-center bg-transparent"
          style={{ padding: "0 10vw" }} // Limite la largeur à 80% de la page
        >
          <div className="w-full">
            <BottleSlider
              bottles={bottlesConfig}
              onBottleChange={handleBuyClick}
              selectedBottle={selectedBottle}
              onBuy={onclick} // Button action
            />
          </div>
        </section>

        {/* Zone 5 */}
        <section className="zone-5 h-screen flex flex-col items-end justify-center pr-[5vw] bg-transparent">
          <div className="text-right max-w-[30vw]">
            <h2 className="highlight-title font-yana text-gold text-4xl mb-4">OUR COCKTAILS</h2>
            <p className="highlight-description text-gold text-xl font-yana leading-relaxed mb-6">
            Immerse yourself in the art of cocktails with Arcane RUM. Be adventurous with our creations, bold with our signature shots, and timeless with revisited classics. From the first sip to the final flourish, each drink is a journey of flavor, aroma, and craftsmanship—an invitation to savor and explore </p>
            <button className="highlight-button btn-animated">
              UNVEIL OUR SECRETS
            </button>
          </div>
        </section>
      <div>{isDetailView && <ModelDetail />}
  </div>
      </div>
    </div>
  );
};

export default Home;