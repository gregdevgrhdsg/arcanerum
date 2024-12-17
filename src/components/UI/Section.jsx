import React from 'react'

const Section = ({ title, description, buttonText, alignment = "left" }) => (
    <section className={`h-screen flex flex-col items-${alignment} justify-center p-[5vw] bg-transparent`}>
      <div className={`text-${alignment} max-w-[30vw]`}>
        <h2 className="highlight-title font-yana text-gold text-4xl mb-4">{title}</h2>
        <p className="highlight-description text-white text-sm font-300 leading-relaxed mb-6">{description}</p>
        {buttonText && (
          <button className="highlight-button bg-gold text-black py-3 px-6 rounded-lg hover:bg-white transition-all">
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
  export default Section;