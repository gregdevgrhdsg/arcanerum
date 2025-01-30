import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KnowHow = () => {
  const { t } = useTranslation();
  const panoramaRef = useRef(null);
  const imageRef = useRef(null);
  const slidesRef = useRef([]);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  const sliderData = [
    {
      title: t("know_how.slide1.title"),
      description: t("know_how.slide1.description"),
    },
    {
      title: t("know_how.slide2.title"),
      description: t("know_how.slide2.description"),
    },
    {
      title: t("know_how.slide3.title"),
      description: t("know_how.slide3.description"),
    }
  ];

  const timelineSteps = [
    {
      img: "assets/sections/harvest.webp",
      monogram: "assets/monograms/step1.webp",
      title: t("know_how.sugarcane_harvest.title"),
      description: t("know_how.sugarcane_harvest.description"),
    },
    {
      img: "assets/sections/crushing.webp",
      monogram: "assets/monograms/step2.webp",
      title: t("know_how.sugarcane_crushing.title"),
      description: t("know_how.sugarcane_crushing.description"),
    },
    {
      img: "assets/sections/aging.jpg",
      monogram: "assets/monograms/step3.webp",
      title: t("know_how.fermentation_process.title"),
      description: t("know_how.fermentation_process.description"),
    },
    {
      img: "assets/sections/distilation.webp",
      monogram: "assets/monograms/step4.webp",
      title: t("know_how.distillation.title"),
      description: t("know_how.distillation.description"),
    },
    {
      img: "assets/sections/aging.webp",
      monogram: "assets/monograms/step5.webp",
      title: t("know_how.aging.title"),
      description: t("know_how.aging.description"),
    },
  ];

  // Animation du slider
  useEffect(() => {
    if (!titleRef.current || !textRef.current) return;

    gsap.fromTo(
      [titleRef.current, textRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: "power2.out" }
    );

    return () => gsap.killTweensOf([titleRef.current, textRef.current]);
  }, [currentStep]);

  // Animation du panorama
  useEffect(() => {
    if (!panoramaRef.current) return;

    const panoramaElements = panoramaRef.current.querySelectorAll(".panorama-animated");
    if (!panoramaElements.length) return;

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
  }, [currentStep]);

  // Animation de l'image du panorama
  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    );
  }, [currentStep]);

  return (
    <div className="know-how-container w-full h-full">
      {/* Section 1: Slider */}
      <section className="h-screen bg-black text-white relative">
        <div
          className="h-full w-full relative flex items-center items-start"
          style={{
            backgroundImage: "url('assets/sections/fondKnowHow.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center z-10 w-full xl:pl-40 md:pl-0 xl:max-w-[50vw] md:max-w-[60vw] sm:max-w-[100vw] px-6 flex flex-col justify-start">
            <h2 ref={titleRef} className="slide-item font-bold text-gold font-yana text-4xl mb-6">
              {sliderData[currentStep]?.title}
            </h2>
            <p ref={textRef} className="highlight-description font-yana text-white xl:text-xl sm:text-sm">
              {sliderData[currentStep]?.description}
            </p>

            {/* Flèches de navigation */}
            <div className="flex justify-center items-end relative mt-6">
              <button
                className="text-gold text-6xl hover:text-white mx-4 transform rotate-90"
                onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : sliderData.length - 1))}
                aria-label="Précédent"
              >
                &#8249;
              </button>
              <button
                className="text-gold text-6xl hover:text-white mx-4 -rotate-90"
                onClick={() => setCurrentStep((prev) => (prev < sliderData.length - 1 ? prev + 1 : 0))}
                aria-label="Suivant"
              >
                &#8249;
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
        </div>
      </section>


      {/* Section 2: Panorama */}
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
                  className={`px-4 py-2 text-lg transition-all duration-300 ${currentStep === index
                      ? "bg-gold-linear text-black rounded-xl"
                      : "text-white hover:bg-gold-linear hover:text-black rounded-xl"
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