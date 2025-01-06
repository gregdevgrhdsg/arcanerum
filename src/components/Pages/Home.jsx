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
  import { useTranslation } from 'react-i18next';

  gsap.registerPlugin(ScrollTrigger);

  const Home = ({ isModelLoaded }) => {
    // Destructure toutes les propriétés nécessaires du contexte
    const { t } = useTranslation(); // Initialisation du hook
    const { containerRef, isDetailView, setIsDetailView, selectedBottle, setSelectedBottle, setBottlePosition, setBottleScale, setScrollPosition } = useModel();
    const navigate = useNavigate();

    const handleBuyClick = (newIndex) => {
      console.log(`Bouteille sélectionnée: ${newIndex}`);
      setSelectedBottle(newIndex);
    };
    useEffect(() => {
      animateButtonsOnScroll();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      // Recharge les triggers pour cette page
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
          { opacity: 0, x: 10, },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

  // Animation d'entrée et effet parallaxe pour les éléments de jungle
  gsap.utils.toArray(".jungle-el-section").forEach((element) => {
    // Animation d'apparition (ne modifie pas top/left)
    gsap.fromTo(
      element,
      { opacity: 0, y: 20, scale:1, }, // Part visible, mais légèrement en bas
      {
        opacity: 1,
        y: 0, // Retour à sa position originale
        scale:1.1,
        duration: 1,
        ease: "power2.inOut",
        transformOrigin: "bottom right",
        scrollTrigger: {
          trigger: element,
          start: "top 100%", // L'élément entre dans le viewport
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Effet parallaxe (déplace uniquement y)
    gsap.to(element, {
      y: -50, // Déplacement vertical lent
      duration: 3, // Durée longue
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom", // L'élément entre dans le viewport
        end: "bottom top", // L'élément sort du viewport
        scrub: true, // Mouvement fluide
      },
    });
  });

    // Animation d'entrée et effet parallaxe pour les éléments de jungle
    gsap.utils.toArray(".slider-section").forEach((element) => {
      // Animation d'apparition (ne modifie pas top/left)
      gsap.fromTo(
        element,
        { opacity: 0, y: 50,  }, // Part visible, mais légèrement en bas
        {
          opacity: 1,
          y: 0, // Retour à sa position originale
          duration: 1,
          ease: "power2.inOut",
          transformOrigin: "bottom right",
          scrollTrigger: {
            trigger: element,
            start: "top 90%", // L'élément entre dans le viewport
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

  // Nettoyage des animations au démontage du composant
  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.killTweensOf(".jungle-el-section, .content-container section");
  };
}, [isModelLoaded]);

    return (
      <div ref={containerRef} className="home-container absolute xl:w-full h-full sm:w-full">
        {/* Sections de Contenu */}
        <div className="content-container">
          {/* Zone 2 */}
          <section className="zone-2 relative w-full h-screen flex flex-col items-end justify-center bg-transparent">
            <div className="text-center sm:mt-0 xl:max-w-[40vw] md:max-w-[40vw] sm:max-w-[60vw] xl:pr-40 md:pr-20 sm:pr-5">
            <p className="highlight-description font-yana font-regular text-gold xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-3">Mauritus Island</p>
              <h2 className="highlight-title font-yana text-gold mb-5 xl:text-4xl lg:text-lg md:text-3xl sm:text-2xl">{t('welcome')}</h2>
              <p className="highlight-description font-yana text-white xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-10">{t('discover_more')}</p>
              <Link to="/Our-Universe">
                <button className="highlight-button btn-animated cursor-pointer">{t('button_discover_more')}</button>
              </Link>
            </div>
            <div className="jungle-el-section absolute xl:bottom-[0%] sm:bottom-[16%] xl:left-[0%] md:left-[0%] sm:left-[0%] xl:w-[20vw] md:w-[20vw] sm:w-[40vw] z-0">
              <img src="assets/jungle/layer-feuilleGauche2.webp" alt="cocktail" className="w-full h-full object-contain z-0" />
            </div>
            <div className="jungle-el-section absolute xl:bottom-[0%] sm:bottom-[16%] xl:left-[0%] md:left-[0%] sm:left-[0%] xl:w-[20vw] md:w-[20vw] sm:w-[40vw] z-0">
              <img src="assets/jungle/layer-feuilleGauche.webp" alt="cocktail" className="w-full h-full object-contain z-0" />
            </div>
          </section>

          {/* Zone 3 */}
          <section className="zone-3 relative w-full h-screen flex flex-col items-start xl:justify-center sm:justify-center bg-transparent">
            <div className="text-center xl:max-w-[40vw] md:max-w-[40vw] sm:max-w-[60vw] xl:pl-40 md:pl-400 sm:pl-5">
            <p className="highlight-description font-yana font-regular text-gold xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-3">Know How</p>
              <h2 className="highlight-title font-yana text-gold mb-5 xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl"> FROM CANE TO GOLD</h2>
              <p className="highlight-description font-yana text-white xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-10">
              At Arcane Rum, our savoir-faire is a tribute to the rich heritage of Mauritius. From the cultivation of pure sugarcane to the mastery of distillation, every step is guided by a deep respect for tradition and innovation. </p>
              <Link to="/Know-How">
              <button className="highlight-button btn-animated">UNVEIL OUR SECRETS</button>
              </Link>
            </div>
            <div className="jungle-el-section absolute xl:right-[0%] xl:top-[50%] sm:w-[50vw] sm:right-[0%] sm:top-[75%]  xl:w-[30vw] z-10">
            <img src="/assets/jungle/layer-JungleRightLarge.webp" alt="Leaf" className="w-full h-full object-contain" />
            </div>
          </section>

          {/* Zone 4 - Slider */}
          <section className="zone-4 slider-section relative w-full h-screen flex items-center bg-transparent"
            style={{ padding: "0 0vw" }} // Limite la largeur à 80% de la page
          >
            <div className="w-full">
              <BottleSlider
                bottles={bottlesConfig}
                onBottleChange={handleBuyClick}
                selectedBottle={selectedBottle}
                onBuy={onclick} // Button action
              />
            </div>
            <div className="jungle-el-section absolute xl:bottom-[0%] sm:bottom-[16%] xl:right-[0%] md:right-[0%] sm:right-[0%] xl:w-[20vw] md:w-[20vw] sm:w-[40vw] z-0">
              <img src="assets/jungle/layer-feuilledroite2.webp" alt="cocktail" className="w-full h-full object-contain z-0" />
            </div>
            <div className="jungle-el-section absolute xl:bottom-[0%] sm:bottom-[16%] xl:right-[0%] md:right-[0%] sm:right-[0%] xl:w-[20vw] md:w-[20vw] sm:w-[40vw] z-0">
              <img src="assets/jungle/layer-feuilledroite.webp" alt="cocktail" className="w-full h-full object-contain z-0" />
            </div>
          </section>

          {/* Zone 5 */}
          <section className="zone-5 relative w-full h-screen flex flex-col items-end justify-center bg-transparent">
          <div className="text-center sm:mt-0 xl:max-w-[40vw] md:max-w-[40vw] sm:max-w-[60vw] xl:pr-40 md:pr-20 sm:pr-5 z-10">
          <p className="highlight-description font-yana font-regular text-gold xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-3">Cocktails with Charater</p>
          <h2 className="highlight-title font-yana text-gold mb-5 xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl">OUR COCKTAILS</h2>
          <p className="highlight-description font-yana text-white xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-10 ">
          Immerse yourself in the art of cocktails with Arcane RUM. Be adventurous with our creations, bold with our signature shots, and timeless with revisited classics. From the first sip to the final flourish, each drink is a journey of flavor, aroma, and craftsmanship—an invitation to savor and explore </p>
              <Link to="/Les-Cocktails">
              <button className="highlight-button btn-animated">UNVEIL OUR SECRETS</button>
              </Link>
            </div>
            <div className="jungle-el-section absolute xl:bottom-[6%] sm:bottom-[16%] xl:left-[28%] md:left-[20%] sm:left-[15%] xl:w-[16vw] md:w-[20vw] sm:w-[40vw] z-0">
              <img src="assets/cocktails/cocktailTest.webp" alt="cocktail" className="w-full h-full object-contain z-0" />
            </div>
          </section>
        <div>{isDetailView && <ModelDetail />}
    </div>
        </div>
      </div>
    );
  };

  export default Home;