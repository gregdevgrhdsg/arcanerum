import { useState, useEffect } from "react";
import { logoArcane } from "../../utils/index";
import { navLists } from "../../Constants/index";
import gsap from "gsap";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Gestion du scroll pour changer le fond
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Empêcher le défilement pendant que le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  // Animation d'entrée
  const openMenu = () => {
    gsap.timeline()
      .set(".mobile-menu", { display: "flex" }) // Affiche le menu
      .fromTo(
        ".mobile-menu",
        { y: "-100%" },
        { y: 0, duration: 0.5, ease: "power3.out" }
      )
      .fromTo(
        ".mobile-menu div",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      );
  };

  // Animation de sortie
  const closeMenu = () => {
    gsap.timeline()
      .to(".mobile-menu div", {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.1,
        ease: "power3.in",
      })
      .to(".mobile-menu", { y: "-100%", duration: 0.5, ease: "power3.in" }, "-=0.2")
      .set(".mobile-menu", { display: "none" }); // Cache le menu
  };

  // Gestion des animations en fonction de l'état
  useEffect(() => {
    if (isMenuOpen) openMenu();
    else closeMenu();
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-800 ${
        scrolled
          ? "bg-gradient-to-b from-black to-transparent"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full py-5 px-5 md:px-10 flex items-center justify-between">
        {/* Boutons de menu (gauche) */}
        <div className="flex-1 flex justify-start space-x-10 hidden md:flex">
          {navLists.slice(0, 2).map((nav, index) => (
            <div
              key={index}
              className="text-lg md:text-xl lg:text-2xl font-yana text-gold cursor-pointer hover:text-white transition-all duration-300"
            >
              {nav}
            </div>
          ))}
        </div>

        {/* Logo centré */}
        <div className="flex-1 flex justify-center">
          <img
            src={logoArcane}
            alt="Arcane"
            className="w-32 md:w-40"
          />
        </div>

        {/* Boutons de menu (droite) */}
        <div className="flex-1 flex justify-end space-x-10 hidden md:flex">
          {navLists.slice(2).map((nav, index) => (
            <div
              key={index}
              className="text-lg md:text-xl lg:text-2xl font-yana text-gold cursor-pointer hover:text-white transition-all duration-600"
            >
              {nav}
            </div>
          ))}
        </div>

        {/* Bouton burger/croix */}
        <div className="md:hidden z-[101] relative">
          <button
            className="relative w-10 h-10 flex flex-col justify-center items-center"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`absolute block h-0.5 w-8 bg-gold transform transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-[0px]" : "rotate-0 translate-y-[-7px]"
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 w-8 bg-gold transform transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-[0px]" : "rotate-0 translate-y-[7px]"
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Menu déroulant pour mobile et tablette */}
      <div
        className="mobile-menu fixed inset-0 bg-black text-white flex flex-col items-center justify-center hidden"
        style={{ zIndex: 99 }}
      >
        {/* Logo dans le menu */}
        <div className="mb-10">
          <img src={logoArcane} alt="Arcane" className="w-40" />
        </div>

        {/* Liens de navigation */}
        {navLists.map((nav, index) => (
          <div
            key={index}
            className="text-2xl md:text-3xl lg:text-4xl font-yana my-4 cursor-pointer hover:text-gold"
            onClick={() => setIsMenuOpen(false)} // Fermer le menu lors du clic
          >
            {nav}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Navbar;