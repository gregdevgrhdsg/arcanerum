import React from "react";
import Navbar from "./components/UI/Navbar"; // Assurez-vous du chemin correct
import Footer from "./components/UI/Footer"; // Assurez-vous du chemin correct
import LayoutWithCanvas from "./LayoutWithCanvas";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <LayoutWithCanvas />
    </div>
  );
}

export default App;