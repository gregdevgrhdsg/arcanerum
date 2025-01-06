// src/components/UI/LanguageSwitcher.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import gsap from 'gsap';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const languages = [
    { code: 'fr', countryCode: 'FR', label: 'Français' },
    { code: 'en', countryCode: 'GB', label: 'English' },
    // Ajoutez d'autres langues ici si nécessaire
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Fermer la liste déroulante lorsqu'on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation avec GSAP pour l'ouverture/fermeture
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        listRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
      );
    } else {
      gsap.to(listRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  const currentLanguage = languages.find(
    (lang) => lang.code === i18n.language
  ) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-2 py-1 border border-gold rounded bg-transparent hover:bg-gold hover:text-white transition-colors duration-300"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <ReactCountryFlag
          countryCode={currentLanguage.countryCode}
          svg
          style={{
            width: '1.5em',
            height: '1.5em',
            marginRight: '0.5em',
          }}
          title={currentLanguage.label}
        />
        <span className="font-yana">{currentLanguage.code.toUpperCase()}</span>
        <svg
          className="ml-2 w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 8.5l-5.016 5.016L6 8.5 5.516 7.548z" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={listRef}
          className="absolute right-0 mt-2 w-40 bg-black border border-gold rounded shadow-lg z-50"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center w-full px-4 py-2 text-left hover:bg-gold hover:text-white transition-colors duration-300 ${
                lang.code === currentLanguage.code ? 'bg-gold text-white' : 'bg-transparent text-gold'
              }`}
              aria-label={`Changer la langue en ${lang.label}`}
            >
              <ReactCountryFlag
                countryCode={lang.countryCode}
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                  marginRight: '0.5em',
                }}
                title={lang.label}
              />
              <span className="font-yana">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;