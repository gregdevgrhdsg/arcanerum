import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Assurez-vous que useLocation est importé
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KnowHow = () => {
  const location = useLocation(); // Récupère l'emplacement actuel
  
  useEffect(() => {
    // Nettoyer les anciens ScrollTriggers au montage
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    gsap.utils.toArray(".highlight-title, .highlight-description, .highlight-button").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: 50, },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

        // Animation des étapes de la timeline (images et flèches)
        const timelineSteps = gsap.utils.toArray(".timeline-step");
        timelineSteps.forEach((step, index, steps) => {
          gsap.fromTo(
            step,
            { opacity: 0.5, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                end: "top 50%",
                scrub: true,
              },
            }
          );
    
    // Animation des textes dans les sections
    const animateTexts = gsap.utils.toArray(".text-animated");
    animateTexts.forEach((text) => {
      gsap.fromTo(
        text,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "bootom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });


      // Ajouter des animations pour les flèches
      if (index < steps.length - 1) {
        const arrow = step.nextElementSibling;
        if (arrow) {
          gsap.fromTo(
            arrow,
            { opacity: 0, y: -20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 50%",
                end: "top 30%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    });

    // Nettoyer les ScrollTriggers à la suppression du composant
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [location.pathname]); // Réexécuter lorsque l'emplacement change

  return (
    <div className="know-how-container absolute w-full h-full">
      <div className="content-container">
        {/* Section 1 : Intro */}
        <section className="h-screen flex flex-col items-center justify-center bg-transparent">
        <div
              className="h-screen w-full relative flex items-center justify-center"
              style={{
                backgroundImage: "url('assets/sections/aging.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
          <div className="text-center xl:max-w-[40vw] md:max-w-[40vw] sm:max-w-[90vw] z-10">
            <p className="text-animated highlight-description font-yana text-gold xl:text-2xl sm:text-sm mb-6">
              Arcane Rum
            </p>
            <h2 className="text-animated highlight-title ont-yana text-gold mb-5 xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl">
              THE ALCHEMY OF DISTILLATION
            </h2>
            <p className="text-animated highlight-description font-yana text-white xl:text-xl sm:text-sm mb-6">
              Arcane distills pure, freshly pressed sugarcane juice close to cutting time to preserve its vibrant flavors. This ensures that the rum captures the full aromatic essence of the cane.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
          </div>
        </section>
   {/* Section 3 : Process */}
   <section className="h-screen flex flex-col items-center justify-center bg-transparent">
        <div
              className="h-screen w-full relative flex items-center justify-center"
              style={{
                backgroundImage: "url('assets/sections/distilation.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
          <div className="text-center xl:max-w-[40vw] md:max-w-[40vw] sm:max-w-[60vw] z-10">
            <h2 className="text-animated highlight-title font-yana text-gold mb-5 xl:text-5xl sm:text-2xl">
              A DYNAMIC MATURATION
            </h2>
            <p className="text-animated highlight-description font-yana text-white xl:text-xl sm:text-sm mb-6">
              Aged in French and American oak barrels, Arcane rums benefit from Mauritius’ tropical climate. Dynamic temperature variations speed up maturation, creating complex, opulent flavors in a shorter period.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
          </div>
        </section>

        {/* Section 2 : Timeline avec textes alternés */}
        <section className="timeline-container relative w-full min-h-screen bg-black text-white font-yana flex flex-col items-center py-20">
          {[
            { img: "sugarcaneHarvest.webp", label: "Sugarcane Harvest" },
            { img: "sugarcaneCrushing.webp", label: "Sugarcane Crushing" },
            { img: "fermentationProcess.webp", label: "Fermentation Process" },
            { img: "distillation.webp", label: "Distillation" },
            { img: "aging.webp", label: "Aging" },
          ].map((step, index) => (
            <React.Fragment key={index}>
              <div
                className={`timeline-step relative flex items-center justify-center w-full mb-0                 }`}
              >
                <div className="flex justify-center items-center w-1/2">
                  <img
                    src={`assets/icon/${step.img}`}
                    alt={step.label}
                    className="w-[400px] h-auto object-contain"
                  />
                </div>

                <div
                  className=" w-1/3 px-6 font-yana text-animated text-3xl flex items-center "
                   
                  
                >
                  <p className="font-yana max-w-sm">{step.label}</p>
                </div>
              </div>

              {index < 4 && (
                <div className="timeline-arrow flex justify-center items-center w-full mb-10">
                  <span className="arrow-icon text-gold text-4xl">↓</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </section>

        {/* Section 4 : Call-to-action */}
        <section className="h-screen flex flex-col items-center justify-center bg-transparent">
          <div className="text-center xl:max-w-[40vw] md:max-w-[40vw] sm:max-w-[60vw]">
            <h2 className="text-animated highlight-title font-yana text-gold mb-5 xl:text-5xl sm:text-2xl">
              JOIN THE EXPERIENCE
            </h2>
            <p className="text-animated highlight-description font-yana text-white xl:text-xl sm:text-sm mb-6">
              Explore the full range of Arcane rums and discover the spirit of Mauritius through every sip.
            </p>
            <Link
              to="/products"
              className="highlight-button bg-gold text-black px-6 py-3 rounded-full mt-6 text-animated"
            >
              Discover More
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default KnowHow;