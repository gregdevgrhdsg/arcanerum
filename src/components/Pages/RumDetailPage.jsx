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
  const rumData = useRumData();
  const rum = rumData.find((item) => item.id === parseInt(id));
  const sectionRef = useRef();
  const textRefs = useRef([]);
  const imageContainerRef = useRef();

  // Vérifier s'il s'agit d'un rhum classique ou d'un arrangé
  const hasTastingNotes = rum?.tastingNotes?.color || rum?.tastingNotes?.nose || rum?.tastingNotes?.palate;
  const hasWaysToEnjoy = rum?.waysToEnjoy;
  const hasLogisticInfo = rum?.logisticInfo;

  // Définir l'onglet actif par défaut
  const [activeTab, setActiveTab] = useState("tastingNotes");

  useEffect(() => {
    if (!rum) return;

    // Vérifie quels onglets sont disponibles pour le rhum actuel
    const hasTastingNotes = rum.tastingNotes && Object.keys(rum.tastingNotes).length > 0;
    const hasWaysToEnjoy = rum.waysToEnjoy && Object.keys(rum.waysToEnjoy).length > 0;
    const hasLogisticInfo = rum.logisticInfo && Object.keys(rum.logisticInfo).length > 0;

    // Réinitialiser l'onglet actif en fonction des informations disponibles
    if (hasTastingNotes) {
      setActiveTab("tastingNotes");
    } else if (hasWaysToEnjoy) {
      setActiveTab("waysToEnjoy");
    } else if (hasLogisticInfo) {
      setActiveTab("logisticInfo");
    }
  }, [id]); // Ajout de `id` pour mettre à jour l'onglet à chaque changement de bouteille; // Exécute ce useEffect uniquement lorsque `rum` change // Mettre à jour l'onglet actif à chaque changement de bouteille

  // Fonction pour naviguer entre les rhums avec animation GSAP
  const handleNavigation = (direction) => {
    const currentIndex = rumData.findIndex((item) => item.id === parseInt(id));
    const nextIndex = (currentIndex + direction + rumData.length) % rumData.length;
    const nextId = rumData[nextIndex].id;

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

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    );

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
    <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white" style={{ background: rum.gradient }}>
      <div className="container mx-auto flex sm:flex-col md:flex-col lg:flex-row xl:flex-row items-center justify-start px-6 md:py-32 sm:py-10 gap-8 z-30">
        {/* Image de la bouteille */}
        <div className="flex-1 relative flex justify-center" ref={imageContainerRef}>
          {/* Pattern à taille fixe */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             bg-no-repeat bg-contain bg-center
             w-[150px] sm:w-[350px] md:w-[350px] lg:w-[500px] xl:w-[500px] 2xl:w-[900px]
             h-[150px] sm:h-[350px] md:h-[350px] lg:h-[500px] xl:h-[500px] 2xl:h-[900px]"
            style={{ backgroundImage: `url(${rum.pattern})` }}
          ></div>

          {/* Image de la bouteille */}
          <img
            src={rum.image}
            alt={rum.title}
            className="relative z-10 drop-shadow-lg sm:w-[150px] md:w-[150px] lg:w-[200px] xl:w-[200px] 2xl:w-[400px]"
          />
        </div>

        {/* Informations */}
        <div ref={textRefs} className="flex-1 flex w-full flex-col justify-start text-center items-center xl:mr-20 sm:mr-0 sm:ml-0">
          <h1 className="text-4xl font-bold xl:text-center font-yana text-gold">{rum.title}</h1>
          <p className="text-lg text-center font-yana text-content">{rum.description}</p>

          <div className="mt-6">
            <div className="flex justify-center items-center flex-wrap gap-4 mb-4">
              {hasTastingNotes && (
                <button
                  className={`px-4 py-2 transition duration-300 ${activeTab === "tastingNotes"
                    ? "text-gold border-b-4 border-gold font-bold"
                    : "text-gray-400 border-transparent"
                    }`}
                  onClick={() => setActiveTab("tastingNotes")}
                >
                  {rum.tastingNotes.title}
                </button>
              )}
              {hasWaysToEnjoy && (
                <button
                  className={`px-4 py-2 transition duration-300 ${activeTab === "waysToEnjoy"
                    ? "text-gold border-b-4 border-gold font-bold"
                    : "text-gray-400 border-transparent"
                    }`}
                  onClick={() => setActiveTab("waysToEnjoy")}
                >
                  {rum.waysToEnjoy.title}
                </button>
              )}
              <button
                className={`px-4 py-2 transition duration-300 ${activeTab === "logisticInfo"
                  ? "text-gold border-b-4 border-gold font-bold"
                  : "text-gray-400 border-transparent"
                  }`}
                onClick={() => setActiveTab("logisticInfo")}
              >
                {rum.logisticInfo.title}
              </button>
            </div>

            {/* Contenu des onglets */}
            {activeTab === "tastingNotes" && hasTastingNotes && (
              <div className="grid text-sm text-center grid-cols-1 md:grid-cols-3 gap-6">
                {rum.tastingNotes.color && <div><h4 className="text-lg font-semibold text-gold mb-2">{rum.tastingNotes.titleA}</h4><p className="text-content">{rum.tastingNotes.color}</p></div>}
                {rum.tastingNotes.nose && <div><h4 className="text-lg font-semibold text-gold mb-2">{rum.tastingNotes.titleB}</h4><p className="text-content">{rum.tastingNotes.nose}</p></div>}
                {rum.tastingNotes.palate && <div><h4 className="text-lg font-semibold text-gold mb-2">{rum.tastingNotes.titleC}</h4><p className="text-content">{rum.tastingNotes.palate}</p></div>}
              </div>
            )}

            {activeTab === "waysToEnjoy" && hasWaysToEnjoy && (
              <div>
                <p className="text-content xl:mx-28 sm:mx-0 text-sm">{rum.waysToEnjoy.description}</p>
                {rum.waysToEnjoy.signatureShot && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gold mb-2">Signature Shot</h4>
                    <p className="text-content text-sm whitespace-pre-line">{rum.waysToEnjoy.signatureShot}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "logisticInfo" && (
              <div>
                <ul className="space-y-2 text-yana">
                  <li><strong>Volume :</strong> {rum.logisticInfo.volume}</li>
                  <li><strong>Alcohol Content :</strong> {rum.logisticInfo.alcohol}</li>
                </ul>
              </div>
            )}
          </div>
          <Link to="/Our-Rums" className="btn-animated w-2/2 mt-16 px-4 py-2 text-sm font-medium bg-gold text-black hover:bg-yellow-500 transition-all duration-300 justify-center">
            {rum.button}
          </Link>
        </div>

        {/* Flèches de navigation */}
        <button className="absolute left-4 xl:top-1/2 lg:top-1/2 sm:top-1/4 transform -translate-y-1/2 text-5xl text-gold p-3 rounded-full hover:bg-gray-700" onClick={() => handleNavigation(-1)}>&larr;</button>
        <button className="absolute right-4 xl:top-1/2 lg:top-1/2 sm:top-1/4 transform -translate-y-1/2 text-5xl text-gold p-3 rounded-full hover:bg-gray-700" onClick={() => handleNavigation(1)}>&rarr;</button>

      </div>
    </section>
  );
};

export default RumDetailPage;