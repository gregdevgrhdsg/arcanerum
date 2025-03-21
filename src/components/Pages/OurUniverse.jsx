import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const SliderSection = ({ slider }) => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = slider.slides;

  // Animation du texte (identique pour tous)
  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    );
  }, [currentIndex]);

  // Animation du changement d'image pour les sections autres que la section 2
  if (slider.id !== 2 && slider.images) {
    useEffect(() => {
      if (!imageRef.current || !imageLoaded) return;
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
      );
    }, [currentIndex, imageLoaded]);
  }

  const handleSlideChange = (direction) => {
    setImageLoaded(false);
    const newIndex = (currentIndex + direction + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  // Pagination : affichage de tous les numéros avec style conditionnel
  const pagination = slides.length > 1 && (
    <div className="flex justify-center items-center mt-6 space-x-2">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          aria-label={`Aller à la diapositive ${index + 1}`}
          className={`px-3 pt-1 font-yana font-bold text-2xl transition-colors duration-300 ${
            currentIndex === index
              ? 'border border-gold bg-gold text-black'
              : 'border border-gold text-gold'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );

  if (slider.id === 2) {
    // Section 2 : on conserve la mise en page et l'animation d'origine, sans flèches
    return (
      <section className={`relative min-h-screen h-screen flex flex-col bg-transparent slide-${slider.id}`}>
        <div
          className={`h-full w-full relative flex ${slider.flexClasses}`}
          style={{
            backgroundImage: `url('${slider.backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className={`text-center z-10 ${slider.containerClass} px-4`}>
            <h2
              ref={titleRef}
              className="highlight-title font-yana font-bold text-gold leading-none 2xl:text-6xl xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl mb-3"
            >
              {slider.title}
            </h2>
            <p
              ref={textRef}
              className="highlight-description font-yana text-white 2xl:text-3xl xl:text-xl lg:text-lg md:text-md sm:text-sm"
            >
              {slides[currentIndex]}
            </p>
            {pagination}
            {/* Flèches supprimées pour la section du milieu */}
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
        </div>
      </section>
    );
  } else {
    // Pour les autres sections (1 et 3)
    // - La section 3 est inversée en desktop grâce à "lg:flex-row-reverse"
    // - On ajoute des flèches de chaque côté en position absolue
    const layoutClass = slider.id === 3 ? 'flex-col lg:flex-row-reverse' : 'flex-col lg:flex-row';
    return (
      <section className={`relative min-h-screen flex ${layoutClass}`}>
        {slider.id === 1 && (
          <>
 
          </>
        )}

        {slider.id === 3 && (
          <>

          </>
        )}

        <div className="lg:w-1/2 bg-black lg:p-20 xl:pl-40 2xl:p-40 flex flex-col justify-center items-center md:pt-40 md:pb-40 sm:pt-32 sm:pb-20 text-center md:max-w-[80vw] sm:max-w-[80vw] mx-auto  ">
          <h2
            ref={titleRef}
            className="highlight-title font-yana font-bold text-gold leading-none 2xl:text-6xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-2xl mb-3"
          >
            {slider.title}
          </h2>
          <p
            ref={textRef}
            className="highlight-description font-yana text-white 2xl:text-3xl xl:text-xl lg:text-lg md:text-lg sm:text-sm"
          >
            {slides[currentIndex]}
          </p>
          {pagination}
    
        </div>
        {/* Pour la photo : elle couvre toute la zone droite */}
        <div className="lg:w-1/2 w-full sm:h-[50vh] lg:h-[100vh] relative flex items-center justify-center">
          <img
            ref={imageRef}
            src={slider.images ? slider.images[currentIndex] : slider.backgroundImage}
            alt={`Slide ${currentIndex + 1}`}
            onLoad={() => setImageLoaded(true)}
            className="object-cover w-full h-full filter bg-black/40 relative z-10"
          />

          {/* Filtre similaire à la section 2 */}
          <div             
          className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
        </div>

        {/* Flèches de navigation positionnées sur les côtés */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold 2xl:text-8xl text-6xl hover:text-white z-10"
          onClick={() => handleSlideChange(-1)}
          aria-label="Diapositive précédente"
        >
          &larr;
          </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gold 2xl:text-8xl text-6xl hover:text-white z-10"
          onClick={() => handleSlideChange(1)}
          aria-label="Diapositive suivante"
        >
          &rarr;
          </button>
      </section>
    );
  }
};

const OurUniverse = () => {
  const { t } = useTranslation();

  const slidersData = useMemo(() => [
    {
      id: 1,
      title: t('ourUniverse.slide1Title'),
      slides: [
        t('ourUniverse.slide1Content1'),
        t('ourUniverse.slide1Content2'),
        t('ourUniverse.slide1Content3'),
      ],
      images: [
        '/assets/sections/volcanic.webp',
        '/assets/sections/arcaneShooting.jpg',
        '/assets/sections/volcanic.webp',
      ],
      buttonText: t('button_discover_more'),
      flexClasses: 'md:justify-start sm:justify-center md:items-center sm:items-center',
      containerClass: 'md:w-[50vw] md:max-w-[60vw] sm:w-[80vw] md:pl-40',
    },
    {
      id: 2,
      title: t('ourUniverse.slide2Title'),
      slides: [
        t('ourUniverse.slide2Content1'),
      ],
      backgroundImage: '/assets/sections/volcanicShape.webp',
      buttonText: t('button_discover_more'),
      flexClasses: 'md:justify-center sm:justify-center md:items-center sm:items-center',
      containerClass: 'md:w-[50vw] md:max-w-[50vw] sm:w-[80vw]',
      whiteSpace: 'pre-line'
    },
    {
      id: 3,
      title: t('ourUniverse.slide3Title'),
      slides: [
        t('ourUniverse.slide3Content1'),
        t('ourUniverse.slide3Content2'),
        t('ourUniverse.slide3Content3'),
      ],
      images: [
        '/assets/sections/territory.webp',
        '/assets/sections/teritory2.jpg',
        '/assets/sections/territory3.jpg',
      ],
      buttonText: t('button_discover_more'),
      flexClasses: 'md:justify-start sm:justify-center md:items-center sm:items-center',
      containerClass: 'md:w-[50vw] md:max-w-[50vw] sm:w-[80vw] xl:pr-40',
    },
  ], [t]);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.utils.toArray('.highlight-title, .highlight-description, .highlight-button').forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.4,
          scrollTrigger: {
            trigger: element,
            start: 'top 100%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    gsap.utils.toArray('.jungle-el-section').forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: 20, scale: 1 },
        {
          opacity: 1,
          x: 0,
          scale: 1.3,
          duration: 1,
          ease: 'power2.inOut',
          stagger: 0.2,
          transformOrigin: 'bottom right',
          scrollTrigger: {
            trigger: element,
            start: 'top 100%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      gsap.to(element, {
        x: -20,
        duration: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [slidersData]);

  return (
    <div className="know-how-container relative w-full h-full whitespace-pre-line">
      <div className="content-container">
        {slidersData.map((slider) => (
          <SliderSection key={slider.id} slider={slider} />
        ))}
      </div>
    </div>
  );
};

export default OurUniverse;