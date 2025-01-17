import React, { useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import rumData from "../rumData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RumDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const rum = rumData.find((item) => item.id === parseInt(id));
  const sectionRef = useRef();
  const textRefs = useRef([]);
  const imageContainerRef = useRef();

  // Animation de transition
  const handleNavigation = (direction) => {
    const currentIndex = rumData.findIndex((item) => item.id === parseInt(id));
    const nextIndex = (currentIndex + direction + rumData.length) % rumData.length;
    const nextId = rumData[nextIndex].id;

    // Animation de sortie
    gsap.to(sectionRef.current, {
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      duration: 0.5,
      onComplete: () => {
        navigate(`/rum/${nextId}`);
      },
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animation d'entrée
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    );

    // Animations GSAP pour le contenu
    gsap.fromTo(
      textRefs.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      imageContainerRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [id]);

  if (!rum) {
    return <p>Bouteille non trouvée.</p>;
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white"
      style={{ background: rum.gradient }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-10 gap-8">
        {/* Flèche gauche */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gold-linear text-white p-3 rounded-full hover:bg-gray-700"
          onClick={() => handleNavigation(-1)}
        >
          ←
        </button>

        {/* Colonne droite : Image de la bouteille */}
        <div
          className="flex-1 relative flex justify-center items-center"
          ref={imageContainerRef}
        >
      <div
          className="absolute inset-0 bg-center bg-no-repeat z-0 pattern-container md:bg-[size:60%] sm:bg-[size:80%]"
          style={{
            backgroundImage: `url(${rum.pattern})`,
            opacity: 0.8,
          }}
        ></div>
          <img
            src={rum.image}
            alt={rum.title}
            className="relative xl:mt-0 sm:mt-20 z-10 object-contain drop-shadow-lg"
            style={{
              width: "200px",
              maxWidth: "300px",
            }}
          />
        </div>

        {/* Colonne gauche : Informations */}
        <div className="flex-1 flex flex-col space-y-6 text-center md:text-left items-center md:items-start ">
          <h1
            className="text-4xl font-bold text-gold text-content"
            ref={(el) => (textRefs.current[0] = el)}
          >
            {rum.title}
          </h1>
          <h2
            className="text-2xl font-semibold text-content"
            ref={(el) => (textRefs.current[1] = el)}
          >
            {rum.subtitle}
          </h2>
          <p
            className="text-lg text-content"
            ref={(el) => (textRefs.current[2] = el)}
          >
            {rum.description}
          </p>
          <Link
            to="/Our-Rums"
            className="btn-animated mt-4 px-4 py-2 text-sm font-medium bg-gold text-black rounded-md hover:bg-yellow-500 transition-all duration-300"
          >
            Retour à la liste
          </Link>
        </div>

        {/* Flèche droite */}
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gold-linear text-white p-3 rounded-full hover:bg-gray-700"
          onClick={() => handleNavigation(1)}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default RumDetailPage;