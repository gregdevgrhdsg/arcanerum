import React, { useState, useEffect } from "react";
import Navbar from "./components/UI/Navbar"; // Assurez-vous du chemin correct
import CookieConsent from "./components/UI/CookieConsent";
import Footer from "./components/UI/Footer"; // Assurez-vous du chemin correct
import LayoutWithCanvas from "./LayoutWithCanvas";
import AgeVerification from "./components/UI/AgeVerification"; // Import du composant

function App() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const storedAgeVerification = localStorage.getItem("ageVerified");
    if (storedAgeVerification === "true") {
      setIsVerified(true);
    }
  }, []);

  if (!isVerified) {
    return <AgeVerification onConfirm={() => setIsVerified(true)} />;
  }

  return (
    <div className="relative z-0"> {/* Conteneur principal */}
      {!isVerified ? (
        <div className="absolute inset-0 z-[10000]"> {/* Z-index élevé */}
          <AgeVerification onConfirm={() => setIsVerified(true)} />
        </div>
      ) : (
        <>
          <div className="relative z-[9999]"> {/* S'assure que CookieConsent est au-dessus */}
            <CookieConsent />
          </div>
          <Navbar />
          <div className="flex-grow">
            <LayoutWithCanvas />
          </div>
        </>
      )}
    </div>
  );
}

export default App;