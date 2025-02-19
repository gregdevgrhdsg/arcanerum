import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { logoArcane, monoGramLogo } from "../../utils/index";
import { navLists, subMenuLinks } from "../../Constants/index.js";
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
  const headerRef = useRef(null);
  const subMenuRefs = useRef([]);

  // Gestion du scroll pour changer le fond
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation pour les sous-menus desktop
  const toggleSubMenu = (index) => {
    if (activeSubMenu === index) {
      gsap.to(subMenuRefs.current[index], {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      setActiveSubMenu(null);
    } else {
      if (activeSubMenu !== null) {
        gsap.to(subMenuRefs.current[activeSubMenu], {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
        });
      }
      setActiveSubMenu(index);
      gsap.fromTo(
        subMenuRefs.current[index],
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  };

  // Animation d'ouverture et de fermeture du menu mobile
  const toggleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (!isMenuOpen) {
      gsap.timeline()
        .set(".mobile-menu", { display: "flex" })
        .fromTo(
          ".mobile-menu",
          { y: "-100%" },
          { y: "0%", duration: 0.5, ease: "power3.out" }
        )
        .fromTo(
          ".mobile-menu div",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        );
    } else {
      closeMobileMenu();
    }
  };

  // Fermeture du menu mobile
  const closeMobileMenu = () => {
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
    setIsMenuOpen(false);
    setActiveMobileSubMenu(null);
  };

  // Animation du sous-menu mobile
  const toggleMobileSubMenu = (index) => {
    if (activeMobileSubMenu === index) {
      gsap.to(`.mobile-submenu-${index}`, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setActiveMobileSubMenu(null),
      });
    } else {
      if (activeMobileSubMenu !== null) {
        gsap.to(`.mobile-submenu-${activeMobileSubMenu}`, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
        });
      }
      setActiveMobileSubMenu(index);
      gsap.fromTo(
        `.mobile-submenu-${index}`,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  };

  // Replie les sous-menus desktop et mobile au changement de page
  useEffect(() => {
    // Ferme les sous-menus desktop
    if (activeSubMenu !== null) {
      gsap.to(subMenuRefs.current[activeSubMenu], {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
      setActiveSubMenu(null);
    }

    // Ferme le menu mobile si ouvert
    if (isMenuOpen) {
      closeMobileMenu();
    }
  }, [location]);

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 z-50 transition-all ${scrolled ? "bg-gradient-to-b from-black to-transparent" : "bg-transparent"
        }`}
    >
      <nav className="w-full py-5 lg:space-x-4 2xl:space-x-20 px-5 md:px-10 flex items-center justify-between relative">
        {/* Navigation gauche */}
        <div className="flex-1 flex justify-start space-x-10 hidden md:flex">
          {navLists.slice(0, 2).map((nav, index) => (
            <div key={index} className="relative group">
              <div
                className="relative 2xl:text-4xl xl:text-xl font-bold md:text-xl lg:text-md font-yana text-gold cursor-pointer hover:text-gold flex items-center"
                onClick={() => toggleSubMenu(index)}
              >
                {t(nav.name)}
                {subMenuLinks[index]?.length > 0 && (
                  <FiChevronDown
                    className={`ml-2 text-gold transition-transform duration-300 ${activeSubMenu === index ? "rotate-180" : "rotate-0"
                      }`}
                  />
                )}
              </div>

              {/* Sous-menu desktop */}
              <div
                ref={(el) => (subMenuRefs.current[index] = el)}
                className="absolute flex flex-col top-full mt-2 font-yana 2xl:text-4xl xl:text-xl text-xl overflow-hidden opacity-0"
                style={{ minWidth: "200px", height: 0 }}
              >
                {subMenuLinks[index]?.map((link, subIndex) => (
                  <Link
                    key={subIndex}
                    to={link.path}
                    className="block py-2 px-4 text-gold-hover-bg-black transition-all"
                  >
                    {t(link.name)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Logo centré */}
        <div className="flex flex xl:justify-center lg:justify-center md:justify-center sm:justify-start">
          <img src={monoGramLogo} alt="Arcane" className="2xl:w-24 xl:w-16 md:w-16 sm:w-16" />
        </div>

        {/* Navigation droite */}
        <div className="flex-1 flex justify-end 2xl:space-x-20 xl:space-x-10 lg:space-x-4 md:space-x-4 hidden md:flex">
          {navLists.slice(2).map((nav, index) => (
            <Link
              key={index}
              to={nav.path}
              className="text-lg font-bold 2xl:text-4xl xl:text-xl md:text-xl lg:text-md font-yana text-gold cursor-pointer hover:text-white flex items-center"
            >
              {t(nav.name)}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Bouton burger mobile */}
        <div className="lg:hidden z-[101] relative">
          <button
            className="relative w-10 h-10 flex flex-col justify-center items-center"
            onClick={toggleMobileMenu}
          >
            <span
              className={`absolute block h-1 w-8 bg-gold-linear transform transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-[0px]" : "rotate-0 translate-y-[-7px]"
                }`}
            ></span>
            <span
              className={`absolute block h-1 w-8 bg-gold-linear transform transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[0px]" : "rotate-0 translate-y-[7px]"
                }`}
            ></span>
          </button>
        </div>
      </nav>

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
            {subMenuLinks[index]?.length > 0 ? (
              // Si l'élément possède un sous-menu, on affiche un bouton qui gère l'ouverture du sous-menu
              <button
                className="text-2xl md:text-3xl lg:text-4xl font-yana my-4 cursor-pointer hover:text-gold flex items-center justify-left w-full pl-20"
                onClick={() => toggleMobileSubMenu(index)}
              >
                {t(nav.name)}
                <FiChevronDown
                  className={`ml-2 text-gold transition-transform duration-300 ${activeMobileSubMenu === index ? "rotate-180" : "rotate-0"}`}
                />
              </button>
            ) : (
              // Sinon, on affiche directement un Link qui navigue vers nav.path
              <Link
                to={nav.path}
                className="text-2xl md:text-3xl lg:text-4xl font-yana my-4 cursor-pointer hover:text-gold flex items-center justify-left w-full pl-20"
                onClick={closeMobileMenu}
              >
                {t(nav.name)}
              </Link>
            )}

            {/* Sous-menu mobile */}
            {subMenuLinks[index]?.length > 0 && (
              <div
                className={`mobile-submenu-${index} bg-green text-white flex flex-col items-start w-full px-8 overflow-hidden`}
                style={{
                  height: activeMobileSubMenu === index ? "auto" : 0,
                  opacity: activeMobileSubMenu === index ? 1 : 0,
                }}
              >
                {subMenuLinks[index].map((link, subIndex) => (
                  <Link
                    key={subIndex}
                    to={link.path}
                    className="py-2 hover:text-gold w-full text-left"
                    onClick={closeMobileMenu}
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