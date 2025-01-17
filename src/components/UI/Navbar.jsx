import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { logoArcane } from "../../utils/index";
import { navLists, subMenuLinks } from "../../Constants/index";
import LanguageSwitcher from "./LanguageSwitcher";
import { FiChevronDown } from "react-icons/fi";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeMobileSubMenu, setActiveMobileSubMenu] = useState(null);
  const subMenuRef = useRef(null);
  const headerRef = useRef(null);

  // Gestion du scroll pour changer le fond
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation du sous-menu (Desktop uniquement)
  const toggleSubMenu = (index) => {
    if (activeSubMenu === index) {
      gsap.to(subMenuRef.current, { height: "0px", opacity: 0, duration: 0.5 });
      setActiveSubMenu(null);
    } else {
      setActiveSubMenu(index);
      gsap.fromTo(
        subMenuRef.current,
        { height: "0px", opacity: 0, },
        { height: "auto", opacity: 1, duration: 0.5 }
      );
    }
  };
  // Animation d'ouverture et de fermeture du bandeau noir
  useEffect(() => {
    if (activeSubMenu !== null) {
      gsap.to(headerRef.current, {
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Noir semi-transparent
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(headerRef.current, {
        backgroundColor: "",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [activeSubMenu]);

  // Animation d'ouverture du menu mobile
  const openMenu = () => {
    gsap.timeline()
      .set(".mobile-menu", { display: "flex" })
      .fromTo(
        ".mobile-menu",
        { y: "-100%" },
        { y: "0%", duration: 0.5, ease: "power3.out",  }
      )
      .fromTo(
        ".mobile-menu div",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      );
  };

  // Animation de fermeture du menu mobile
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
      .set(".mobile-menu", { display: "none" });
  };

  // Gestion des animations du menu mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      openMenu();
    } else {
      document.body.style.overflow = "auto";
      closeMenu();
    }
  }, [isMenuOpen]);

  const toggleMobileSubMenu = (index) => {
    if (activeMobileSubMenu === index) {
      setActiveMobileSubMenu(null); // Ferme le sous-menu
    } else {
      setActiveMobileSubMenu(index); // Ouvre le sous-menu correspondant
    }
  };

  // Animation lors du changement de page
  useEffect(() => {
    gsap.to(headerRef.current, { opacity: 0, duration: 0.5 }).then(() => {
      gsap.to(headerRef.current, { opacity: 1, duration: 0.5 });
    });
    setActiveSubMenu(null);
  }, [location]);

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 z-50 transition-all ${
        scrolled ? "bg-gradient-to-b from-black to-transparent" : "bg-transparent"
      }`}
    >
      <nav className="w-full py-5 px-5 md:px-10 flex items-center justify-between relative">
        {/* Navigation gauche */}
        <div className="flex-1 flex justify-start space-x-10 hidden md:flex">
          {navLists.slice(0, 2).map((nav, index) => (
            <div
              key={index}
              className="relative text-lg font-bold md:text-xl lg:text-md font-yana text-gold cursor-pointer hover:text-gold flex items-center"
              onClick={() => toggleSubMenu(index)}
            >
              {t(nav.name)}
              {subMenuLinks[index]?.length > 0 && (
                <FiChevronDown
                  className={`ml-2 text-gold transition-transform duration-300 ${
                    activeSubMenu === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Logo centré */}
        <div className="flex-1 flex justify-center">
          <img src={logoArcane} alt="Arcane" className="w-32 md:w-40" />
        </div>

        {/* Navigation droite */}
        <div className="flex-1 flex justify-end space-x-10 hidden md:flex">
          {navLists.slice(2).map((nav, index) => (
            <Link
              key={index}
              to={nav.path}
              className="text-lg font-bold md:text-xl lg:text-md font-yana text-gold cursor-pointer hover:text-white flex items-center"
            >
              {t(nav.name)}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Bouton burger mobile */}
        <div className="md:hidden z-[101] relative">
          <button
            className="relative w-10 h-10 flex flex-col justify-center items-center"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span
              className={`absolute block h-0.5 w-8 bg-gold transform transition-transform duration-300 ${
                isMenuOpen
                  ? "rotate-45 translate-y-[0px]"
                  : "rotate-0 translate-y-[-7px]"
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 w-8 bg-gold transform transition-transform duration-300 ${
                isMenuOpen
                  ? "-rotate-45 -translate-y-[0px]"
                  : "rotate-0 translate-y-[7px]"
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Sous-menu */}
      <div
        ref={subMenuRef}
        className="absolute top-full left-0 w-full bg-black/80 text-white hidden md:flex flex-col items-center justify-center overflow-hidden h-0 opacity-0 transition-all duration-500"
      >
        {activeSubMenu !== null &&
          subMenuLinks[activeSubMenu]?.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="py-3 px-4 font-yana hover:bg-gold-linear w-full text-center"
            >
              {t(link.name)}
            </Link>
          ))}
      </div>

      {/* Menu mobile */}
      <div
  className="mobile-menu w-full fixed inset-0 bg-black text-white flex flex-col items-center justify-center hidden"
  style={{ zIndex: 99 }}
>
  <div className="mb-10">
    <img src={logoArcane} alt="Arcane" className="w-40" />
  </div>
  {navLists.map((nav, index) => (
    <div key={index} className="w-full">
      <button
        className="text-2xl md:text-3xl lg:text-4xl font-yana my-4 cursor-pointer hover:text-gold flex items-center justify-left w-full pl-20"
        onClick={() =>
          subMenuLinks[index]?.length
            ? toggleMobileSubMenu(index) // Gérer l'ouverture du sous-menu
            : setIsMenuOpen(false) // Naviguer directement pour les autres liens
        }
      >
        {t(nav.name)}
        {subMenuLinks[index]?.length > 0 && (
          <FiChevronDown
            className={`ml-2 text-gold transition-transform duration-300 ${
              activeMobileSubMenu === index ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </button>
      {activeMobileSubMenu === index && (
        <div className="bg-gray-900 text-white flex flex-col items-start w-full px-8">
          {subMenuLinks[index]?.map((link, subIndex) => (
            <Link
              key={subIndex}
              to={link.path}
              className="py-2 hover:text-gold w-full text-left"
              onClick={() => setIsMenuOpen(false)} // Fermer le menu après navigation
            >
              {t(link.name)}
            </Link>
          ))}
        </div>
      )}
    </div>
  ))}
  <div className="mt-8">
    <LanguageSwitcher />
  </div>
</div>
    </header>
  );
};

export default Navbar;