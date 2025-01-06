// src/components/UI/Navbar.jsx

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { logoArcane } from "../../utils/index";
import { navLists, subMenuLinks } from "../../Constants/index";
import LanguageSwitcher from './LanguageSwitcher';
import gsap from "gsap";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation(); // Initialisation du hook
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const subMenuRef = useRef(null);
  const subMenuContentRef = useRef(null);

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

  // Animation d'ouverture du menu mobile
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
      .set(".mobile-menu", { display: "none" }); // Cache le menu
  };

  // Gestion des animations en fonction de l'état
  useEffect(() => {
    if (isMenuOpen) openMenu();
    else closeMenu();
  }, [isMenuOpen]);

  // Animation d'ouverture du sous-menu
  const openSubMenu = (index) => {
    setActiveSubMenu(index);
    gsap.to(subMenuRef.current, {
      duration: 0.5,
      y: "0%",
      opacity: 1,
      ease: "power3.out",
      display: "flex",
    });

    gsap.fromTo(
      subMenuContentRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power3.out" }
    );
  };

  // Animation de fermeture du sous-menu
  const closeSubMenu = () => {
    gsap.to(subMenuContentRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
      stagger: 0.05,
      onComplete: () => {
        gsap.to(subMenuRef.current, {
          y: "-100%",
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => {
            setActiveSubMenu(null);
          },
        });
      },
    });
  };

  // Gestion des événements de survol
  const handleMouseEnter = (index) => {
    if (activeSubMenu !== index) {
      if (activeSubMenu !== null) {
        closeSubMenu();
        setTimeout(() => openSubMenu(index), 600); // Délai pour laisser l'animation se terminer
      } else {
        openSubMenu(index);
      }
    }
  };

  const handleMouseLeave = () => {
    closeSubMenu();
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-800 ${
        scrolled
          ? "bg-gradient-to-b from-black to-transparent"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full py-5 px-5 md:px-10 flex items-center justify-between relative">
        {/* Boutons de navigation (gauche) */}
        <div className="flex-1 flex justify-start space-x-10 hidden md:flex">
          {navLists.slice(0, 2).map((nav, index) => (
            <div
              key={index}
              className="relative text-lg md:text-xl lg:text-md font-yana text-gold cursor-pointer hover:text-white transition-all duration-300"
              onMouseEnter={() => handleMouseEnter(index)}
            >
              {t(nav.name)}
            </div>
          ))}
        </div>

        {/* Logo centré */}
        <div className="flex-1 flex justify-center">
          <img src={logoArcane} alt="Arcane" className="w-32 md:w-40" />
        </div>

        {/* Boutons de navigation (droite) */}
        <div className="flex-1 flex justify-end space-x-10 hidden md:flex items-center">
          {navLists.slice(2).map((nav, index) => (
            <div
              key={index}
              className="text-lg md:text-xl lg:text-md font-yana text-gold cursor-pointer hover:text-white transition-all duration-300"
              onMouseEnter={() =>
                handleMouseEnter(index + navLists.slice(0, 2).length)
              }
            >
              {t(nav.name)}
            </div>
          ))}
          {/* Intégration du LanguageSwitcher */}
          <LanguageSwitcher /> {/* Ajout du sélecteur de langue */}
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

      {/* Bandeau noir du sous-menu (Visible uniquement sur desktop) */}
      <div
        ref={subMenuRef}
        className="sub-menu hidden md:flex absolute top-0 left-0 w-full h-full bg-black text-white overflow-hidden flex items-center justify-center transform -translate-y-full opacity-0 z-0"
        onMouseLeave={handleMouseLeave}
      >
        {activeSubMenu !== null && subMenuLinks[activeSubMenu]?.length > 0 && (
          <div
            ref={subMenuContentRef}
            className="flex space-x-10"
          >
            {subMenuLinks[activeSubMenu].map((link, subIndex) => (
              <Link
                key={subIndex}
                to={link.path}
                className="submenu-item text-lg md:text-xl lg:text-md font-yana py-2 px-4 hover:bg-gray-800 cursor-pointer transition-all duration-300 z-0"
              >
                {t(link.name)}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Menu déroulant pour mobile et tablette */}
      <div
        className="mobile-menu w-full fixed inset-0 bg-black text-white flex flex-col items-center justify-center hidden"
        style={{ zIndex: 99 }}
      >
        {/* Logo dans le menu */}
        <div className="mb-10">
          <img src={logoArcane} alt="Arcane" className="w-40" />
        </div>

        {/* Liens de navigation */}
        {navLists.map((nav, index) => (
          <Link
            key={index}
            to={nav.path}
            className="text-2xl md:text-3xl lg:text-4xl font-yana my-4 cursor-pointer hover:text-gold z-60"
            onClick={() => setIsMenuOpen(false)} // Fermer le menu lors du clic
          >
            {t(nav.name)}
          </Link>
        ))}

        {/* Intégration du LanguageSwitcher dans le menu mobile */}
        <div className="mt-8">
          <LanguageSwitcher /> {/* Ajout du sélecteur de langue */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;