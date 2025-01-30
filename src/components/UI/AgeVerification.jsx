import React, { useState, useEffect } from "react";

const AgeVerification = ({ onConfirm }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const hasConfirmed = localStorage.getItem("ageVerified");
    if (hasConfirmed) {
      setIsVisible(false);
    }
  }, []);
  const calculateAge = () => {
    if (!day || !month || !year) return;
  
    // Création de la date de naissance
    const birthDate = new Date(year, month - 1, day); // Mois -1 car JS commence à 0 pour Janvier
    const today = new Date();
  
    // Calcul de l'âge
    let age = today.getFullYear() - birthDate.getFullYear();
    const birthMonthDay = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  
    if (today < birthMonthDay) {
      age--; // Si l'anniversaire n'est pas encore passé cette année, on enlève 1
    }
  
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const age = calculateAge();
    if (age >= 18) {
      localStorage.setItem("ageVerified", "true");
      setIsVisible(false);
      onConfirm();
    } else {
      setError("Vous devez avoir au moins 18 ans pour accéder à ce site.");
    }
  };

  return (
    isVisible && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
        <div className="bg-black p-8 rounded-lg shadow-lg text-center max-w-lg w-full border border-gray-700">
          <img src="/assets/monogramArcane.png" alt="Logo" className="mx-auto mb-4 w-32 h-auto" />
          <h2 className="text-2xl font-bold text-white mb-4">Vérification de l'âge</h2>
          <p className="text-gray-300 mb-6">Veuillez entrer votre date de naissance.</p>

          {/* Formulaire de sélection */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex space-x-2">
              <select value={day} onChange={(e) => setDay(e.target.value)} required className="p-3 border border-gray-600 rounded-lg bg-black text-white">
                <option value="">Jour</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select value={month} onChange={(e) => setMonth(e.target.value)} required className="p-3 border border-gray-600 rounded-lg bg-black text-white">
                <option value="">Mois</option>
                {["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"].map((m, i) => (
                  <option key={i + 1} value={i + 1}>{m}</option>
                ))}
              </select>
              <select value={year} onChange={(e) => setYear(e.target.value)} required className="p-3 border border-gray-600 rounded-lg bg-black text-white">
                <option value="">Année</option>
                {[...Array(100)].map((_, i) => (
                  <option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button type="submit" className="mt-4 bg-gold text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition w-full max-w-xs">
              Valider
            </button>
          </form>

          <button onClick={() => (window.location.href = "https://www.google.com")} className="mt-4 text-gray-400 hover:text-gray-300 hover:underline transition">
            Je ne suis pas majeur
          </button>
        </div>
      </div>
    )
  );
};

export default AgeVerification;