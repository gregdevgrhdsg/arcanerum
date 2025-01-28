import React, { useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useRumData from "../rumData"; // Assure-toi d'importer correctement
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";


gsap.registerPlugin(ScrollTrigger);

const RumDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const rumData = useRumData(); // Appel de la fonction pour obtenir les données
  const rum = rumData.find((item) => item.id === parseInt(id));
  const sectionRef = useRef();
  const textRefs = useRef([]);
  const imageContainerRef = useRef();
  // Définir l'état initial de l'onglet actif
  const [activeTab, setActiveTab] = useState(() =>
    rum?.tastingNotes.color || rum?.tastingNotes.nose || rum?.tastingNotes.palate
      ? "tastingNotes"
      : "logisticInfo"
  );

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
      <div className="container mx-auto flex xl:flex-row md:flex-col sm:flex-col items-center justify-between px-6 py-10 gap-8 z-30">

        {/* Colonne gauche : Image de la bouteille */}
        <div
          className="flex-1 relative flex justify-center items-center"
          ref={imageContainerRef}
        >
          <div
            className="absolute inset-0 xl:bg-center lg:bg-start md:bg-start sm:bg-start bg-no-repeat z-0 xl:bg-[size:60%] lg:bg-[size:100%] lg:w-[100%] md:bg-[size:100%] sm:bg-[size:100%] xl:top-0 md:top-0 sm:top-44"
            style={{
              backgroundImage: `url(${rum.pattern})`,
              opacity: 0.8,
            }}
          ></div>
          <img
            src={rum.image}
            alt={rum.title}
            className="relative font-yana xl:mt-0 sm:mt-20 z-10 object-contain drop-shadow-lg"
            style={{
              width: "200px",
              maxWidth: "300px",
            }}
          />
        </div>

        {/* Colonne droite : Informations */}
        <div className="flex-1 flex w-full flex-col text-center items-center xl:mr-20 sm:mr-0 sm:ml-0">
          <h1 className="text-4xl font-bold xl:text-center font-yana text-gold">
            {rum.title}
          </h1>
          <h2 className="mt-2 text-2xl text-center font-yana font-semibold mb-6">
            {rum.subtitle}
          </h2>
          <p className="text-lg text-center font-yana text-content">{rum.description}</p>

          <div className="mt-6">
            <div className="flex space-x-4 border-b border-gold mb-4">
              {/* Afficher l'onglet Tasting Notes uniquement si les données sont présentes */}
              {rum.tastingNotes.color || rum.tastingNotes.nose || rum.tastingNotes.palate ? (
                <button
                  className={`px-4 py-2 ${
                    activeTab === "tastingNotes"
                      ? "text-gold border-b-2 border-gold"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("tastingNotes")}
                >
                  Tasting Notes
                </button>
              ) : null}

              {/* Onglet Logistic Info toujours visible */}
              <button
                className={`px-4 py-2 ${
                  activeTab === "logisticInfo"
                    ? "text-gold border-b-2 border-gold"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("logisticInfo")}
              >
                Logistic Info
              </button>
            </div>

            {/* Contenu des onglets */}
            {activeTab === "tastingNotes" && (
              <div>
                <div className="grid text-center grid-cols-1 md:grid-cols-3 gap-6">
                  {rum.tastingNotes.color && (
                    <div>
                      <h4 className="text-lg font-semibold text-gold mb-2">Color</h4>
                      <p className="text-content">{rum.tastingNotes.color}</p>
                    </div>
                  )}
                  {rum.tastingNotes.nose && (
                    <div>
                      <h4 className="text-lg font-semibold text-gold mb-2">Nose</h4>
                      <p className="text-content">{rum.tastingNotes.nose}</p>
                    </div>
                  )}
                  {rum.tastingNotes.palate && (
                    <div>
                      <h4 className="text-lg font-semibold text-gold mb-2">Palate</h4>
                      <p className="text-content">{rum.tastingNotes.palate}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "logisticInfo" && (
              <div>
                <ul className="space-y-2 text-yana">
                  <li>
                    <strong>Volume :</strong> {rum.logisticInfo.volume}
                  </li>
                  <li>
                    <strong>Alcohol Content :</strong> {rum.logisticInfo.alcohol}
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link
            to="/Our-Rums"
            className="btn-animated mt-16 px-4 py-2 text-sm font-medium bg-gold text-black rounded-md hover:bg-yellow-500 transition-all duration-300"
          >
            Retour à la liste
          </Link>
        </div>

        {/* Flèche droite */}
             {/* Flèche gauche */}
             <button
          className="absolute left-4 top-100 transform  text-5xl text-gold p-3 rounded-full hover:bg-gray-700"
          onClick={() => handleNavigation(-1)}
        >
          &larr;
        </button>
        
        <button
          className="absolute right-4 top-100 text-5xl text-gold p-3 rounded-full hover:bg-gray-700"
          onClick={() => handleNavigation(1)}
        >
          &rarr;
        </button>
      </div>
    </section>
  );
};

export default RumDetailPage;