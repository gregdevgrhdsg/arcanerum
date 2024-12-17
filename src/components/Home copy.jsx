import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RumA } from "./Canvas/Models/Extraroma";
import { Flamboyance } from "./Canvas/Models/flamboyance";
import { RumB } from "./Canvas/Models/Ananas";
import { RumC } from "./Canvas/Models/Vanille";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const CustomArrow = ({ direction, onClick }) => (
  <div
    className={`custom-arrow custom-arrow-${direction} text-gold text-6xl cursor-pointer z-50 transform ${
      direction === "next" ? "translate-x-0" : "-translate-x-0"
    }`}
    onClick={onClick}
    style={{
      background: 'gold',
      padding: '15px',
      borderRadius: '50%',
    }}
  >
    {direction === "next" ? ">" : "<"}
  </div>
);

const Home = ({ isModelReady, onBottleChange }) => {
  const containerRef = useRef(null);
  const [selectedBottle, setSelectedBottle] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const backgrounds = [
    "/assets/environement1.jpg",
    "/assets/environement2.jpg",
    "/assets/environement3.jpg",
    "/assets/environement4.jpg",
  ];
  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);

  const bottles = [
    { id: 0, name: "Extraroma", prix: "100€", description: "courte description", component: <RumA /> },
    { id: 1, name: "Flamboyance", prix: "150€", description: "description du Gold Rum", component: <Flamboyance /> },
    { id: 2, name: "ArcaneAnanas", prix: "150€", description: "description du Ananas", component: <RumB /> },
    { id: 3, name: "ArcaneVanille", prix: "15€", description: "description du Vanille", component: <RumC /> },
  ];

  useEffect(() => {
    if (!isModelReady) {
      console.log("En attente que le modèle soit prêt...");
      return;
    }
    // Préchargement des modèles
    const preloadModels = async () => {
      await Promise.all(
        bottles.map(async (bottle) => {
          if (bottle.component && bottle.component.type.preload) {
            await bottle.component.type.preload();
          }
        })
      );
    };
    preloadModels();

    // Configuration du scroll et de la navigation automatique entre les sections avec GSAP
    const sections = gsap.utils.toArray(".content-container section");

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 99%",
        end: "bottom top",
        onEnter: () => {
          gsap.to(window, {
            scrollTo: {
              y: section,
              autoKill: false,
              ease: "power8.inOut",
            },
            duration: 1,
            scrub: true,
          });
        },
      });
    });

    // Text appearance effect using GSAP and ScrollTrigger
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
  }, [isModelReady]);

  // Mise à jour des paramètres du slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    beforeChange: (oldIndex, newIndex) => {
      if (!isFirstLoad) {
        const oldSlide = document.querySelectorAll(
          `.slick-slide[data-index="${oldIndex}"] .slider-title, .slick-slide[data-index="${oldIndex}"] .slider-description, .slick-slide[data-index="${oldIndex}"] .slider-button`
        );
        oldSlide.forEach((element) => {
          gsap.to(element, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      }
    },
    afterChange: (current) => {
      setSelectedBottle(current);
      setIsFirstLoad(false);
      setCurrentBackground(backgrounds[current]);
      if (onBottleChange) onBottleChange(current);

      const currentSlide = document.querySelectorAll(
        `.slick-slide[data-index="${current}"] .slider-title, .slick-slide[data-index="${current}"] .slider-description, .slick-slide[data-index="${current}"] .slider-button`
      );
      currentSlide.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
        );
      });
    },
  };

  return (
    <div
      ref={containerRef}
      className="home-container absolute w-full h-full"
    >
      <Slider {...settings} className="w-full h-full">
        {bottles.map((bottle, index) => (
          <div
            key={bottle.id}
            className="flex justify-between text-white slide-content h-full w-full px-8 space-x-8"
            style={{
              backgroundImage: `url(${backgrounds[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 1.5s ease-in-out",
            }}
          >
            <div className="w-1/2 flex justify-center items-center relative">
              {bottle.component}
            </div>
            <div className="w-1/2 text-left p-6 bg-opacity-50 bg-black rounded-lg">
              <h3 className="slider-title font-yana text-gold text-5xl mb-4">{bottle.name}</h3>
              <p className="slider-description text-3xl mb-4 font-semibold">{bottle.prix}</p>
              <p className="text-lg mb-6">{bottle.description}</p>
              <button className="slider-button bg-gold text-black py-3 px-6 rounded-lg hover:bg-white transition-all">
                ACHETER
              </button>
            </div>
          </div>
        ))}
      </Slider>
      {/* Content Sections */}
      <div className="content-container relative z-10">
        <section className="zone-2 h-screen flex flex-col items-end justify-center pr-[5vw] bg-transparent">
          <div className="text-right max-w-[30vw]">
            <h2 className="highlight-title font-yana text-gold text-4xl mb-4">ESCAPE THE EXPECTED</h2>
            <p className="highlight-description text-white text-sm font-300 leading-relaxed mb-6">
              Every adventure begins with the desire to explore the unknown...
            </p>
            <button className="highlight-button bg-gold text-black py-3 px-6 rounded-lg hover:bg-white transition-all">
              DISCOVER MORE
            </button>
          </div>
        </section>
        <section className="zone-3 h-screen flex flex-col items-start justify-center pl-[5vw] bg-transparent">
          <div className="text-left max-w-[30vw]">
            <h2 className="highlight-title font-yana text-gold text-4xl mb-4">
              KNOW HOW : <br /> FROM CANE TO GOLD
            </h2>
            <p className="highlight-description text-white text-sm font-300 leading-relaxed mb-6">
              At Arcane Rum, our savoir-faire is a tribute to the rich heritage of Mauritius...
            </p>
            <button className="highlight-button bg-gold text-black py-3 px-6 rounded-lg hover:bg-white transition-all">
              UNVEIL OUR SECRETS
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
