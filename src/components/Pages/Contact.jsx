import { section } from "framer-motion/client";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ici, vous pouvez intégrer une API pour envoyer le formulaire
    console.log("Form Data Submitted:", formData);

    setSuccessMessage("Votre message a été envoyé avec succès !");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section
    className="cocktail-page bg-cover bg-center flex flex-col items-center justify-start text-white"
    style={{
      backgroundImage: "url('/assets/jungle/fond-Arcane.webp')",
      backgroundAttachment: "fixed", // Le fond reste fixe lors du scroll
    }}
  >
    <div className="min-h-screen flex flex-col-2 items-center justify-center gap-28">
        <div className="justify-left items-left">
      <h1 className="text-4xl text-center font-yana font-bold mb-6 text-gold">Contactez-nous</h1>
      <p className="mb-6 font-yana text-gray-300 text-center">
        Une question ? Un commentaire ? Remplissez <br/> le formulaire ci-dessous, nous vous répondrons dès que possible.
      </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block font-yana text-gold mb-2">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gold rounded bg-transparent text-white"
            placeholder="Votre nom"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-yana text-gold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gold rounded bg-transparent text-white"
            placeholder="Votre adresse email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block font-yana text-gold mb-2">
            Sujet
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gold rounded bg-transparent text-white"
            placeholder="Sujet de votre message"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block font-yana text-gold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gold rounded bg-transparent text-white"
            placeholder="Votre message"
            rows="5"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full font-yana py-2 px-4 bg-gold-linear text-black font-semibold rounded hover:bg-yellow-500 transition"
        >
          Envoyer
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-green-500">{successMessage}</p>
      )}
    </div>
    </section>
  );
};

export default Contact;