import { useState, useEffect } from "react";
import { logoArcane } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Gérer le scroll pour changer le fond
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Si on a scrollé plus de 50px
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-b from-black to-transparent"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full py-5 px-5 sm:px-10 flex justify-between items-center">
        {/* Boutons de menu (gauche) */}
        <div className="flex-1 flex justify-end max-sm:hidden space-x-10">
          {navLists.slice(0, 2).map((nav, index) => (
            <div
              key={index}
              className="text-2xl font-yana text-gold text-sm cursor-pointer hover:text-white transition-all duration-300"
            >
              {nav}
            </div>
          ))}
        </div>

        {/* Logo centré */}
        <div className="flex-1 flex justify-center">
          <img src={logoArcane} alt="Arcane" width={180} />
        </div>

        {/* Boutons de menu (droite) */}
        <div className="flex-1 flex justify-start max-sm:hidden space-x-10">
          {navLists.slice(2).map((nav, index) => (
            <div
              key={index}
              className="text-2xl font-yana text-gold text-sm cursor-pointer hover:text-white transition-all duration-300"
            >
              {nav}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
