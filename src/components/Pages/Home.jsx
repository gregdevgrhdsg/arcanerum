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
    const translatedBottlesConfig = bottlesConfig(t);

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
              start: "top 97%",
              end: "bottom 10%",
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
      { opacity: 0, y: 50, scale:1, }, // Part visible, mais légèrement en bas
      {
        opacity: 1,
        y: 0, // Retour à sa position originale
        scale:1.3,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
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
      <div ref={containerRef} className="home-container absolute xl:w-full sm:w-full sm:h-[400vh]">
        {/* Sections de Contenu */}
        <div className="content-container">
          {/* Zone 2 */}
          <section className="zone-2 relative w-full h-[100vh] flex flex-col items-end justify-center bg-transparent">
            <div className="text-center sm:mt-0 xl:max-w-[42vw] md:max-w-[40vw] sm:max-w-[60vw] xl:pr-40 md:pr-20 sm:pr-5">
            <p className="highlight-description font-yana font-regular text-gold 2xl:text-4xl xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-3">{t('home.zone2.title')}</p>
              <h2 className="highlight-title font-bold font-yana text-gold mb-5 2xl:text-6xl xl:text-4xl lg:text-lg md:text-3xl sm:text-2xl">{t('home.zone2.subtitle')}</h2>
              <p className="highlight-description font-yana text-white 2xl:text-3xl xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-10" style={{ whiteSpace: "pre-line" }}>{t('home.zone2.description')}</p>
              <Link to="/Our-Universe">
                <button className="highlight-button btn-animated cursor-pointer ">{t('home.zone2.button')}</button>
              </Link>
            </div>
            <div className="jungle-el-section absolute xl:bottom-[0%] sm:bottom-[0%] xl:left-[0%] md:left-[0%] sm:left-[0%] xl:w-[15vw] md:w-[20vw] sm:w-[40vw] z-0">
              <img src="assets/jungle/layer-feuilleGauche2.webp" alt="cocktail" className="w-full h-full object-contain z-0" />
            </div>
            <div className="jungle-el-section absolute xl:bottom-[0%] sm:bottom-[0%] xl:left-[0%] md:left-[0%] sm:left-[0%] xl:w-[15vw] md:w-[20vw] sm:w-[40vw] z-0">
              <img src="assets/jungle/layer-feuilleGauche.webp" alt="cocktail" className="w-full h-full object-contain z-0" />
            </div>
          </section>

          {/* Zone 3 */}
          <section className="zone-3 relative w-full h-[100vh] flex flex-col items-start xl:justify-center sm:justify-center bg-transparent">
            <div className="text-center xl:max-w-[40vw] md:max-w-[42vw] sm:max-w-[60vw] xl:pl-40 md:pl-400 sm:pl-5">
            <p className="highlight-description font-yana font-regular text-gold 2xl:text-3xl xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-3">{t('home.zone3.title')}</p>
              <h2 className="highlight-title font-bold font-yana text-gold mb-5 2xl:text-6xl xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl">{t('home.zone3.subtitle')}</h2>
              <p className="highlight-description font-yana text-white 2xl:text-3xl xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-10" style={{ whiteSpace: "pre-line" }}>{t('home.zone3.description')}</p>
              <Link to="/Know-How">
              <button className="highlight-button btn-animated">{t('home.zone3.button')}</button>
              </Link>
            </div>
            <div className="jungle-el-section absolute xl:bottom-[0%] sm:bottom-[0%] xl:right-[0%] md:right-[0%] sm:right-[0%] xl:w-[15vw] md:w-[20vw] sm:w-[40vw] z-0">
              <img src="assets/jungle/layer-feuilledroite2.webp" alt="jungle" className="w-full h-full object-contain z-0" />
            </div>
            <div className="jungle-el-section absolute xl:bottom-[0%] sm:bottom-[0%] xl:right-[0%] md:right-[0%] sm:right-[0%] xl:w-[15vw] md:w-[20vw] sm:w-[40vw] z-0">
              <img src="assets/jungle/layer-feuilledroite.webp" alt="jungle2" className="w-full h-full object-contain z-0" />
            </div>
            <div className="jungle-el-section absolute xl:bottom-[50%] sm:bottom-[65%] xl:right-[15%] md:right-[40%] sm:right-[70%] xl:w-[10vw] md:w-[15vw] sm:w-[20vw] z-0">
              <img src="assets/jungle/layer-Bird.webp" alt="jungle3" className="w-full h-full object-contain z-0" />
            </div>
          </section>

          {/* Zone 4 - Slider */}
          <section className="zone-4 slider-section relative w-full h-[100vh] flex items-center bg-transparent"
            style={{ padding: "0 0vw" }} // Limite la largeur à 80% de la page
          >
            <div className="w-full">
              <BottleSlider
                bottles={bottlesConfig(t)}
                onBottleChange={handleBuyClick}
                selectedBottle={selectedBottle}
                onBuy={onclick} // Bewxzutton action
              />
            </div>
          </section>

          {/* Zone 5 */}
          <section className="zone-5 relative w-full h-[100vh] flex flex-col items-end justify-center bg-transparent">
          <div className="text-center sm:mt-0 xl:max-w-[40vw] md:max-w-[40vw] sm:max-w-[60vw] xl:pr-40 md:pr-20 sm:pr-5 z-10">
          <p className="highlight-description font-yana font-regular text-gold 2xl:text-3xl xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-3">{t('home.zone5.title')}</p>
          <h2 className="highlight-title font-bold font-yana text-gold mb-5 2xl:text-6xl xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl">{t('home.zone5.subtitle')}</h2>
          <p className="highlight-description font-yana text-white  2xl:text-3xl xl:text-xl lg:text-1xl md:1xl sm:text-sm mb-10 " style={{ whiteSpace: "pre-line" }}>{t('home.zone5.description')}</p>
              <Link to="/Les-Cocktails">
              <button className="highlight-button btn-animated">{t('home.zone5.button')}</button>
              </Link>
            </div>
            <div className="jungle-el-section absolute xl:bottom-[8%] lg:bottom-[8%] md:bottom-[3%] sm:bottom-[16%] xl:left-[30%] lg:left-[30%] md:left-[25%] sm:left-[15%] xl:w-[13vw] lg:w-[17vw] md:w-[28vw] sm:w-[35vw] z-0">
              <img src="assets/cocktails/cocktailTest.webp" alt="cocktail" className="w-full h-full object-contain z-0" />
            </div>
            <div className="jungle-el-section absolute xl:bottom-[60%] sm:bottom-[80%] xl:left-[10%] md:left-[20%] sm:left-[15%] xl:w-[5vw] lg:w-[5vw] md:w-[7vw] sm:w-[10vw] z-0">
              <img src="assets/jungle/layer-papillon1.webp" alt="cocktail" className="w-full h-full object-contain z-0" />
            </div>
          </section>
        <div>{isDetailView && <ModelDetail />}
    </div>
        </div>
      </div>
    );
  };

  export default Home;