import React from "react";

const RumPage = () => {
  const rumData = [
    {
      id: 1,
      image: "assets/thumbnail/BouteilleArcane_Extraroma_Quart.png",
      title: "EXTRAROMA",
      subtitle: "OUR FLAG BEARER",
      description: "ANANAS ROTI A DELIGHTFUL TREAT",
      background: "bg-[url('assets/sections/fondExtraroma.webp')]",
    },
    {
      id: 2,
      image: "assets/thumbnail/BouteilleArcane_Extraroma_Quart.png",
      title: "Flamboyance",
      subtitle: "OUR FLAG BEARER",
      description: "ANANAS ROTI A DELIGHTFUL TREAT",
      background: "bg-[url('assets/sections/fondFlamboyance.webp')]",
    },
    {
      id: 3,
      image: "assets/thumbnail/BouteilleArcane_Extraroma_Quart.png",
      title: "EXTRAROMA",
      subtitle: "OUR FLAG BEARER",
      description: "ANANAS ROTI A DELIGHTFUL TREAT",
      background: "bg-[url('/path-to-background/background3.png')]",
    },
    {
      id: 4,
      image: "assets/thumbnail/BouteilleArcane_Extraroma_Quart.png",
      title: "EXTRAROMA",
      subtitle: "OUR FLAG BEARER",
      description: "ANANAS ROTI A DELIGHTFUL TREAT",
      background: "bg-[url('/path-to-background/background4.png')]",
    },
    {
      id: 5,
      image: "assets/thumbnail/BouteilleArcane_Extraroma_Quart.png",
      title: "EXTRAROMA",
      subtitle: "OUR FLAG BEARER",
      description: "ANANAS ROTI A DELIGHTFUL TREAT",
      background: "bg-[url('/path-to-background/background5.png')]",
    },
  ];

  return (
    <div className="w-full h-screen grid grid-rows-[1fr_1fr] gap-4 mt-0 p-0">
      {/* Ligne du haut : Deux colonnes */}
      <div className="grid xl:grid-cols-2 sm:grid-cols-1 gap-0">
        {rumData.slice(0, 2).map((rum) => (
          <div
            key={rum.id}
            className={`relative flex ${rum.background} position-center bg-center p-10`}
          >
            <div className="absolute inset-0 bg-black/30"></div> {/* Overlay */}
            <div className="relative z-10 flex items-center justify-start w-full h-screen p-0 text-white">
              {/* Bouteille */}
              <img
                src={rum.image}
                alt={rum.title}
                className="w-[30%] object-contain"
              />
              {/* Texte */}
              <div className="ml-10">
                <h2 className="text-4xl lg:text-3xl sm:text-2xl font-bold">{rum.title}</h2>
                <p className="text-2xl font-semibold">{rum.subtitle}</p>
                <p className="text-1xl mt-1">{rum.description}</p>
                <button className="btn-animated mt-4 self-start bg-white text-black px-4 py-2 rounded-md">En Savoir PLus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ligne du bas : Trois colonnes */}
      <div className="grid xl:grid-cols-3 sm:grid-cols-1 gap-4">
        {rumData.slice(2).map((rum) => (
          <div
            key={rum.id}
            className={`relative flex ${rum.background} bg-contain bg-center p-0`}
          >
            <div className="absolute inset-0 bg-black/20"></div> {/* Overlay */}
            <div className="relative z-10 flex items-center justify-center w-full h-full p-4 text-white">
              {/* Bouteille */}
              <img
                src={rum.image}
                alt={rum.title}
                className="w-[40%] object-contain"
              />
              {/* Texte */}
              <div className="ml-4">
                <h2 className="text-lg md:text-xl font-bold">{rum.title}</h2>
                <p className="text-sm md:text-md font-semibold">{rum.subtitle}</p>
                <p className="text-xs md:text-sm mt-1">{rum.description}</p>
                <button className="btn-animated mt-4 self-start bg-white text-black px-4 py-2 rounded-md">En Savoir PLus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RumPage;