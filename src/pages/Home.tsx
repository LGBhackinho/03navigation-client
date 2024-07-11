// src/pages/Home.tsx
import React from "react";
import { useEffect } from "react";
import { initBrevoTracker } from "../lib/trackerBrevo";

const Home: React.FC = () => {
  useEffect(() => {
    initBrevoTracker();
  }, []);

  return (
    <div className="right-side">
      <div className="right-side-page">
        <h1 className="text-3xl font-bold">Accueil</h1>
        <p className="mt-2">Bienvenue sur la page d'accueil !</p>
      </div>
    </div>
  );
};

export default Home;
