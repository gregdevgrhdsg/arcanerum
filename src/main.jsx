// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ModelProvider } from './components/Context/ModelContext';
import App from './App.jsx';
import './index.css';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import './locales/i18n.js'; // Assurez-vous que ce fichier est importé avant tout autre composant


gsap.registerPlugin(ScrollTrigger);


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModelProvider>
        <App />
      </ModelProvider>
    </BrowserRouter>
  </React.StrictMode>
);