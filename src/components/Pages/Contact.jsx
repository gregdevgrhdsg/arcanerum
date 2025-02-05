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
      className="w-full bg-cover bg-center flex flex-col items-center text-white"
      style={{
        backgroundImage: "url('/assets/jungle/fond-Arcane.webp')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center gap-12 xl:gap-48 xl:mt-0 md:mt-0 sm:mt-40 px-4 sm:px-8 md:px-12">
        
        {/* Bloc d'introduction */}
        <div className="w-full xl:w-1/2 text-center xl:text-left">
          <div className="flex justify-center xl:justify-center mb-4">
            <img
              src="/assets/monogramArcane.png"
              alt="Monogramme"
              className="w-16 h-16 sm:w-14 sm:h-14 object-contain"
            />
          </div>
          <h1 className="text-3xl text-center sm:text-4xl xl:text-5xl font-yana font-bold mb-4 text-gold">
            Contactez-nous
          </h1>
          <p className="text-center text-lg sm:text-xl text-gray-300">
            Une question ? Un commentaire ? Remplissez le formulaire ci-dessous,
            nous vous répondrons dès que possible.
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-6 rounded-lg bg-transparent"
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
              className="w-full px-3 py-2 border border-gold rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-gold"
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
              className="w-full px-3 py-2 border border-gold rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-gold"
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
              className="w-full px-3 py-2 border border-gold rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-gold"
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
              className="w-full px-3 py-2 border border-gold rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-gold"
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

        {/* Message de confirmation */}
        {successMessage && (
          <p className="mt-4 text-green-500 text-center">{successMessage}</p>
        )}
      </div>
    </section>
  );
};

export default Contact;