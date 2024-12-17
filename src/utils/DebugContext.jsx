// src/components/Pages/DebugContext.jsx
import React from 'react';
import { useModel } from '../components/Context/ModelContext';

const DebugContext = () => {
  const { currentPosition, currentScale, currentRotation, selectedBottle } = useModel();

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, background: "rgba(0,0,0,0.7)", color: "white", padding: "10px" }}>
      <p>Bouteille sélectionnée : {selectedBottle}</p>
      <p>Position : {JSON.stringify(currentPosition)}</p>
      <p>Échelle : {JSON.stringify(currentScale)}</p>
      <p>Rotation : {JSON.stringify(currentRotation)}</p>
    </div>
  );
};

export default DebugContext;