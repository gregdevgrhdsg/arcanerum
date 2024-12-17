import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bottlesConfig } from "../bottleConfig";

const ModelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bottle = bottlesConfig.find((b) => b.id === parseInt(id, 10));

  if (!bottle) {
    return <div className="text-white">Bouteille introuvable.</div>;
  }

  return (
    <div className="relative h-screen inset-0 flex flex-col items-center justify-center text-white">
      <button
        onClick={() => navigate("/")}
        className="relative top-5 left-5 bg-gold text-black px-4 py-2 rounded-md"
      >
        Retour
      </button>
      <h1 className="text-4xl font-bold">{bottle.name}</h1>
      <p className="text-lg mt-4">{bottle.description}</p>
      <p className="text-2xl mt-6">Prix : {bottle.prix}</p>
    </div>
  );
};

export default ModelDetail;