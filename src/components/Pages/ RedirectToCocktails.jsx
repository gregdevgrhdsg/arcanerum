import React from "react";
import { Navigate } from "react-router-dom";

const RedirectToCocktails = () => {
  return <Navigate to="/Les-Cocktails" replace />;
};

export default RedirectToCocktails;