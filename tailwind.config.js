/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"], // Parcours tous les fichiers pertinents
  mode: "jit",
  theme: {
    extend: {
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradientMove: 'gradientMove 3s ease-in-out infinite',
      },
      backgroundImage: {
        'fond-arcane': "url('/assets/jungle/fond-Arcane.webp')",
        'gold-linear': "linear-gradient(to right, #B07C41, #FCCF87)", // Dégradé doré
      },
      colors: {
        gold: "#DAB47A", // Couleur dorée
        blue: "#1e3a8a", // Définissez la couleur "blue"
        green: "#1e4442", // Définissez la couleur "blue"
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
      fontWeight: {
        light: "300",
        regular: "400",
        bold: "700",
        black: "900",
      },
      fontSize: {
        xs: '0.65rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
        '7xl': '4.5rem', // 72px
        '8xl': '6rem', // 96px
        '9xl': '8rem', // 128px
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
        sm: '320px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
        '2xl': '1920px',  // Ajout pour gérer les écrans 4K ou très grands
        '3xl': '2600px',
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
