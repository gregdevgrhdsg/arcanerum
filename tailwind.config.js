/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Parcours tous les fichiers pertinents
  theme: {
    extend: {
      colors: {
        gold: "#DAB47A", // Couleur dorée
        blue: "#1e3a8a", // Définissez la couleur "blue"
        primary: "#3b3b3b", // Couleur principale (fond)
        accent: "#e63946", // Couleur d'accentuation
        secondary: "#555555", // Couleur secondaire (pour détails)
        white: "#ffffff", // Texte clair
        black: "#000000", // Texte sombre ou fond
        gray: {
          100: "#f3f4f6", // Tons clairs
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827", // Tons foncés
        },
      },
      fontFamily: {
        sans: ["Interstate", "Arial", "sans-serif"], // Interstate comme police principale pour sans-serif
        yana: ["Yana", "serif"], // Yana comme police pour les textes stylés
        display: ["Oswald", "sans-serif"], // Police pour les titres
      },
      spacing: {
        100: "25rem", // Espacements supplémentaires
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        lg: "1rem", // Angles arrondis personnalisés
        xl: "1.5rem",
        "2xl": "2rem",
      },
      screens: {
        xs: "920px", // Point de rupture supplémentaire
      },
      container: {
        center: true, // Centrer les conteneurs par défaut
        padding: "2rem", // Padding interne des conteneurs
      },
      zIndex: {
        background: '10',   // Pour les éléments d'arrière-plan
        content: '20',      // Pour le contenu principal
        foreground: '50',   // Pour les éléments de la jungle en premier plan
      },
    },
  },
  plugins: [],
};
