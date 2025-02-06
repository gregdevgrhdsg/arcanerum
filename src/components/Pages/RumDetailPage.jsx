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
      <div className="container mx-auto flex xl:flex-row md:flex-col sm:flex-col items-center justify-start px-6 py-10 gap-8 z-30">

        {/* Image de la bouteille */}
        <div className="flex-1 relative flex justify-center " ref={imageContainerRef}>
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center xl:bg-center"
            style={{
              backgroundImage: `url(${rum.pattern})`,
              backgroundSize: "contain",
              width: "100%",
            }}
          ></div>
          <img src={rum.image} alt={rum.title} className="relative font-yana xl:mt-0 sm:mt-20 z-10 object-contain drop-shadow-lg"
            style={{ width: "30vw", maxWidth: "200px", minWidth: "100px" }} />
        </div>

        {/* Informations */}
        <div className="flex-1 flex w-full flex-col justify-start text-center items-center xl:mr-20 sm:mr-0 sm:ml-0">
          <h1 className="text-4xl font-bold xl:text-center font-yana text-gold">{rum.title}</h1>
          <h2 className="mt-2 text-2xl text-center font-yana font-semibold mb-6">{rum.subtitle}</h2>
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
                  Tasting Notes
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
                Logistic Info
              </button>
            </div>

            {/* Contenu des onglets */}
            {activeTab === "tastingNotes" && hasTastingNotes && (
              <div className="grid text-sm text-center grid-cols-1 md:grid-cols-3 gap-6">
                {rum.tastingNotes.color && <div><h4 className="text-lg font-semibold text-gold mb-2">Color</h4><p className="text-content">{rum.tastingNotes.color}</p></div>}
                {rum.tastingNotes.nose && <div><h4 className="text-lg font-semibold text-gold mb-2">Nose</h4><p className="text-content">{rum.tastingNotes.nose}</p></div>}
                {rum.tastingNotes.palate && <div><h4 className="text-lg font-semibold text-gold mb-2">Palate</h4><p className="text-content">{rum.tastingNotes.palate}</p></div>}
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
          <Link to="/Our-Rums" className="btn-animated w-1/2 mt-16 px-4 py-2 text-sm font-medium bg-gold text-black hover:bg-yellow-500 transition-all duration-300 justify-center">
            Retour à la liste
          </Link>
        </div>

        {/* Flèches de navigation */}
        <button className="absolute left-4 xl:top-1/2 sm:top-1/4 transform -translate-y-1/2 text-5xl text-gold p-3 rounded-full hover:bg-gray-700" onClick={() => handleNavigation(-1)}>&larr;</button>
        <button className="absolute right-4 xl:top-1/2 sm:top-1/4 transform -translate-y-1/2 text-5xl text-gold p-3 rounded-full hover:bg-gray-700" onClick={() => handleNavigation(1)}>&rarr;</button>

      </div>
    </section>
  );
};

export default RumDetailPage;