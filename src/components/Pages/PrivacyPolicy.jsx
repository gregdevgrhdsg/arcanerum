import React, { useState, useEffect } from 'react';

const PrivacyPolicy = ({ lang = 'fr' }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const filePath =
      lang === 'fr'
        ? '/politique-confidentialite-fr.txt'
        : '/privacy-policy-en.txt';

    fetch(filePath)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error('Erreur chargement :', err));
  }, [lang]);

  return (
<section className="max-w-5xl mx-auto px-4 sm:px-8 py-12 bg-white shadow-lg rounded-xl sm:mt-40 flex flex-col justify-center items-center p-5">  <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        {lang === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
      </h1>

      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify overflow-y-auto max-h-screen">
        {content}
      </div>
    </section>
  );
};

export default PrivacyPolicy;