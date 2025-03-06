import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KnowHow = () => {
  const { t } = useTranslation();
  const panoramaRef = useRef(null);
  const imageRef = useRef(null);      
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const panoramaImageRef = useRef(null);
  const [currentSliderStep, setCurrentSliderStep] = useState(0);
  const [currentTimelineStep, setCurrentTimelineStep] = useState(0);

  // Données du slider (Section 1)
  const sliderData = [
    {
      title: t("know_how.slide1.title"),
      description: t("know_how.slide1.description"),
      image: "assets/sections/fondKnowHow.webp"
    },
    {
      title: t("know_how.slide2.title"),
      description: t("know_how.slide2.description"),
      image: "assets/sections/fondKnowHow.webp"
    },
    {
      title: t("know_how.slide3.title"),
      description: t("know_how.slide3.description"),
      image: "assets/sections/fondKnowHow.webp"
    }
  ];

  // Données du panorama (Section 2)
  const timelineSteps = [
    {
      img: "assets/sections/harvest.webp",
      monogram: "assets/monograms/step1.webp",
      title: t("know_how.sugarcane_harvest.title"),
      description: t("know_how.sugarcane_harvest.description")
    },
    {
      img: "assets/sections/crushing.webp",
      monogram: "assets/monograms/step2.webp",
      title: t("know_how.sugarcane_crushing.title"),
      description: t("know_how.sugarcane_crushing.description")
    },
    {
      img: "assets/sections/aging.jpg",
      monogram: "assets/monograms/step3.webp",
      title: t("know_how.fermentation_process.title"),
      description: t("know_how.fermentation_process.description")
    },
    {
      img: "assets/sections/distilation.webp",
      monogram: "assets/monograms/step4.webp",
      title: t("know_how.distillation.title"),
      description: t("know_how.distillation.description")
    },
    {
      img: "assets/sections/aging.webp",
      monogram: "assets/monograms/step5.webp",
      title: t("know_how.aging.title"),
      description: t("know_how.aging.description")
    }
  ];

  // Animation du texte du slider (Section 1)
  useEffect(() => {
    if (!titleRef.current || !textRef.current) return;
    gsap.fromTo(
      [titleRef.current, textRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 2, stagger: 0.2, ease: "power2.out",
      }
    );
    return () => gsap.killTweensOf([titleRef.current, textRef.current]);
  }, [currentSliderStep]);

  // Animation de l'image du slider (Section 1)
  useEffect(() => {
    if (!imageRef.current) return;
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 2, ease: 'power2.out' }
    );
  }, [currentSliderStep]);

  // Animation des éléments du panorama (Section 2)
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
  }, [currentTimelineStep]);

  // Animation de l'image du panorama (Section 2)
  useEffect(() => {
    if (!panoramaImageRef.current) return;
    gsap.fromTo(
      panoramaImageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    );

  }, [currentTimelineStep]);

  return (
    <div className="know-how-container w-full h-full">
      {/* Section 1 : Slider */}
      <section className="min-h-screen relative flex flex-col lg:flex-row">
      <div className="lg:w-1/2 bg-black lg:p-20 xl:p-30 2xl:p-40 flex flex-col justify-center items-center md:pt-40 md:pb-40 sm:pb-40 sm:pt-32 text-center md:max-w-[80vw] sm:max-w-[80vw] mx-auto lg:pt-0 ">
      <h2
            ref={titleRef}
            className="slide-item font-bold text-gold font-yana leading-none 2xl:text-6xl xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl mb-6"
          >
            {sliderData[currentSliderStep]?.title}
          </h2>
          <p
            ref={textRef}
            className="highlight-description font-yana text-white 2xl:text-3xl xl:text-xl lg:text-lg md:text-md sm:text-sm"
          >
            {sliderData[currentSliderStep]?.description}
          </p>
          {/* Pagination par numéro */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSliderStep(index)}
                aria-label={`Aller à la diapositive ${index + 1}`}
                className={`px-3 pt-1 font-yana font-bold text-2xl transition-colors duration-300 ${
                  currentSliderStep === index
                    ? 'border border-gold bg-gold text-black'
                    : 'border border-gold text-gold'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 w-full relative flex items-center justify-center">
          <img
            ref={imageRef}
            src={sliderData[currentSliderStep]?.image}
            alt={`Slide ${currentSliderStep + 1}`}
            className="object-cover w-full h-full filter bg-black/40 relative z-10"
          />
          <div             
          ref={imageRef}
          className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
         </div>

        {/* Flèches de navigation sur chaque côté */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold 2xl:text-8xl text-6xl hover:text-white z-10"
          onClick={() =>
            setCurrentSliderStep(prev => (prev > 0 ? prev - 1 : sliderData.length - 1))
          }
          aria-label="Précédent"
        >
          &larr;
          </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gold 2xl:text-8xl text-6xl hover:text-white z-10"
          onClick={() =>
            setCurrentSliderStep(prev => (prev < sliderData.length - 1 ? prev + 1 : 0))
          }
          aria-label="Suivant"
        >
          &rarr;
          </button>
      </section>

      {/* Section 2 : Panorama */}
      <section
        ref={panoramaRef}
        className="h-screen flex flex-col items-center justify-center bg-black text-white relative"
      >
        <div
          ref={panoramaImageRef}
          className="absolute inset-0 transition-transform"
          style={{
            backgroundImage: `url(${timelineSteps[currentTimelineStep].img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
        <div className="z-10 flex flex-col justify-center items-center text-center h-full xl:max-w-[50vw] md:max-w-[40vw] sm:max-w-[90vw] px-6">
          <div className="w-full py-4 text-center z-10 relative flex flex-col items-center justify-center">
            <h1 className="2xl:text-6xl xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl text-gold font-yana mt-4 mb-2 font-bold">
              {t("know_how.title")}
            </h1>
            <div className="flex justify-center space-x-6 max-w-5xl">
              {timelineSteps.map((_, index) => (
                <button
                  key={index}
                  className={`px-2 py-2 xl:text-lg sm:text-xs transition-all duration-300 ${
                    currentTimelineStep === index
                      ? "bg-gold-linear text-black rounded-xl"
                      : "text-white hover:bg-gold-linear hover:text-black rounded-xl"
                  }`}
                  onClick={() => setCurrentTimelineStep(index)}
                >
                  {t("know_how.step", { step: index + 1 })}
                </button>
              ))}
            </div>
          </div>
          <img
            src={timelineSteps[currentTimelineStep].monogram}
            alt={`Monogram for step ${currentTimelineStep + 1}`}
            className="panorama-animated w-20 h-20 my-6 object-contain"
          />
          <h2 className="panorama-animated mt-4 font-yana text-gold mb-5 xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl">
            {timelineSteps[currentTimelineStep].title}
          </h2>
          <p className="panorama-animated font-yana text-white xl:text-xl sm:text-sm mb-6">
            {timelineSteps[currentTimelineStep].description}
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      </section>
    </div>
  );
};

export default KnowHow;