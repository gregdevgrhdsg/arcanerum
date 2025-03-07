import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

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
    setSuccessMessage(t("contact.success_message"));
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
<div className="min-h-screen w-full flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-32 2xl:gap-32 px-4 sm:px-8 md:px-12 max-w-screen-2xl mx-auto ">
  
  {/* Bloc d'introduction */}
  <div className="w-full max-w-3xl text-center px-4">
    <div className="flex justify-center mb-6">
      <img
        src="/assets/monogramArcane.png"
        alt="Monogramme"
        className="w-16 h-16 sm:w-14 sm:h-14 object-contain 2xl:w-20 2xl:h-20"
      />
    </div>
    <h1 className="text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl font-yana font-bold mb-4 text-gold">
      {t("contact.title")}
    </h1>
    <p className="text-lg sm:text-xl 2xl:text-2xl text-gray-300 max-w-4xl mx-auto">
      {t("contact.description")}
    </p>
</div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg xl:max-w-3xl 2xl:max-w-4xl p-6 rounded-lg bg-transparent"
        >
          <div className="mb-6">
            <label htmlFor="name" className="block font-yana text-gold mb-2 text-lg 2xl:text-xl">
              {t("contact.fields.name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gold rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-gold text-lg 2xl:text-xl"
              placeholder={t("contact.fields.name_placeholder")}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block font-yana text-gold mb-2 text-lg 2xl:text-xl">
              {t("contact.fields.email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gold rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-gold text-lg 2xl:text-xl"
              placeholder={t("contact.fields.email_placeholder")}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block font-yana text-gold mb-2 text-lg 2xl:text-xl">
              {t("contact.fields.subject")}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gold rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-gold text-lg 2xl:text-xl"
              placeholder={t("contact.fields.subject_placeholder")}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block font-yana text-gold mb-2 text-lg 2xl:text-xl">
              {t("contact.fields.message")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gold rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-gold text-lg 2xl:text-xl"
              placeholder={t("contact.fields.message_placeholder")}
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full font-yana py-3 px-6 bg-gold-linear text-black font-semibold rounded hover:bg-yellow-500 transition text-lg 2xl:text-xl"
          >
            {t("contact.button")}
          </button>
        </form>

        {/* Message de confirmation */}
        {successMessage && (
          <p className="mt-4 text-green-500 text-center text-lg 2xl:text-xl">{successMessage}</p>
        )}
      </div>
    </section>
  );
};

export default Contact;