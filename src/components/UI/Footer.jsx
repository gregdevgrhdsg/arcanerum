// src/components/UI/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-4">
    <p className="text-sm">
      &copy; {new Date().getFullYear()} Arcane Rum. Tous droits réservés.
    </p>
    <nav className="mt-2">
      <ul className="flex justify-center space-x-4">
        <li>
          <a href="/" className="hover:text-gold transition-colors duration-200">
            Accueil
          </a>
        </li>
        <li>
          <a href="/about" className="hover:text-gold transition-colors duration-200">
            À propos
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:text-gold transition-colors duration-200">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </footer>
  );
};

export default Footer;