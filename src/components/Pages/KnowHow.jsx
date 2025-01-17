import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KnowHow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const imageRef = useRef(null);
  const section1Ref = useRef(null);
  const panoramaRef = useRef(null);
  const { t } = useTranslation(); // Initialisation du hook

  const timelineSteps = [
    {
      img: "assets/sections/harvest.webp",
      monogram: "assets/monograms/step1.webp", // Monogramme pour l'étape 1
      title: t("know_how.sugarcane_harvest.title"),
      description: t("know_how.sugarcane_harvest.description"),
    },
    {
      img: "assets/sections/crushing.webp",
      monogram: "assets/monograms/step2.webp", // Monogramme pour l'étape 2
      title: t("know_how.sugarcane_crushing.title"),
      description: t("know_how.sugarcane_crushing.description"),
    },
    {
      img: "assets/sections/aging.jpg",
      monogram: "assets/monograms/step3.webp", // Monogramme pour l'étape 3
      title: t("know_how.fermentation_process.title"),
      description: t("know_how.fermentation_process.description"),
    },
    {
      img: "assets/sections/distilation.webp",
      monogram: "assets/monograms/step4.webp", // Monogramme pour l'étape 4
      title: t("know_how.distillation.title"),
      description: t("know_how.distillation.description"),
    },
    {
      img: "assets/sections/aging.webp",
      monogram: "assets/monograms/step5.webp", // Monogramme pour l'étape 5
      title: t("know_how.aging.title"),
      description: t("know_how.aging.description"),
    },
  ];

  // Animation d'entrée pour la section 1
  useEffect(() => {
    const section1Elements = section1Ref.current?.querySelectorAll(
      ".section1-animated"
    );
    if (section1Elements) {
      gsap.fromTo(
        section1Elements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  // Animation sur le panorama
  useEffect(() => {
    const panoramaElements = panoramaRef.current?.querySelectorAll(
      ".panorama-animated"
    );
    if (panoramaElements) {
      gsap.fromTo(
        panoramaElements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panoramaRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [currentStep]);

  // Animation GSAP pour les images
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [currentStep]);

  return (
    <div className="know-how-container w-full h-full">
      {/* Section 1 */}
      <section
        ref={section1Ref}
        className="h-screen flex flex-col items-center justify-center bg-transparent"
      >
        <div
          className="h-screen w-full relative flex items-center justify-center"
          style={{
            backgroundImage: "url('assets/sections/aging.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center xl:max-w-[40vw] md:max-w-[40vw] sm:max-w-[90vw] z-10">
            <p className="section1-animated font-yana text-gold xl:text-2xl sm:text-sm mb-6">
              {t("know_how.section1.subtitle")}
            </p>
            <h2 className="section1-animated font-yana font-bold text-gold mb-5 xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl">
              {t("know_how.section1.title")}
            </h2>
            <p className="section1-animated font-yana text-white xl:text-xl sm:text-sm mb-6">
              {t("know_how.section1.description")}
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
        </div>
      </section>

     {/* Panorama Section */}
<section
  ref={panoramaRef}
  className="h-screen flex flex-col items-center justify-center bg-black text-white relative"
>

  {/* Image et contenu */}
  <div
    ref={imageRef}
    className="absolute inset-0 transition-transform"
    style={{
      backgroundImage: `url(${timelineSteps[currentStep].img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>
  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
  
  {/* Texte centré verticalement */}
<div className="z-10 flex flex-col justify-center items-center text-center h-full xl:max-w-[50vw] md:max-w-[40vw] sm:max-w-[90vw] px-6">
  {/* Barre d'étapes positionnée au-dessus des images */}
  <div className="w-full py-4 text-center z-10 relative flex flex-col items-center justify-center">
    <h1 className="text-4xl text-gold font-yana mt-4 mb-2 font-bold">
      DIVING INTO OUR <br /> PROCESS
    </h1>
    <div className="flex justify-center space-x-6 max-w-5xl mx-auto">
      {timelineSteps.map((_, index) => (
        <button
          key={index}
          className={`px-4 py-2 text-lg transition-all duration-300 ${
            currentStep === index
              ? "bg-gold text-black"
              : "text-white hover:bg-gold hover:text-black"
          }`}
          onClick={() => setCurrentStep(index)}
        >
          {t("know_how.step", { step: index + 1 })}
        </button>
      ))}
    </div>
  </div>

  {/* Monogramme */}
  <img
    src={timelineSteps[currentStep].monogram}
    alt={`Monogram for step ${currentStep + 1}`}
    className="panorama-animated w-20 h-20 my-6 object-contain"
  />

  <h2 className="panorama-animated mt-4 font-yana text-gold mb-5 xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl">
    {timelineSteps[currentStep].title}
  </h2>
  <p className="panorama-animated font-yana text-white xl:text-xl sm:text-sm mb-6">
    {timelineSteps[currentStep].description}
  </p>
</div>
  <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
</section>
    </div>
  );
};

export default KnowHow;