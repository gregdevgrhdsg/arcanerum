import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const consentRef = useRef(null);

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent");

    if (!consentGiven) {
      setIsVisible(true);
      gsap.fromTo(
        consentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  const handleConsent = (choice) => {
    localStorage.setItem("cookieConsent", choice);

    gsap.to(consentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => setIsVisible(false),
    });
  };

  if (!isVisible) return null;

  return (
    <div
      ref={consentRef}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white p-4 rounded-lg shadow-lg flex flex-col items-center space-y-2 z-[9999] max-w-md"
    >
      <p className="text-xs text-center">
        Nous utilisons des cookies pour améliorer votre expérience.
        <br />
        Consultez notre {" "}
        <Link
          to="/privacy-policy"
          className="text-gold underline hover:text-yellow-500 transition"
        >
          politique de confidentialité
        </Link>
        .
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => handleConsent("accepted")}
          className="bg-gold text-black px-4 py-1 rounded-md text-xs font-semibold hover:bg-yellow-500 transition"
        >
          Accepter
        </button>
        <button
          onClick={() => handleConsent("refused")}
          className="bg-gray-400 text-white px-4 py-1 rounded-md text-xs font-semibold hover:bg-gray-500 transition"
        >
          Refuser
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
