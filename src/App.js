import React from "react";
import HeroSection from "./components/HeroSection";
import MainCard from "./components/MainCard";
import RoomsSection from "./components/RoomsSection";
import Footer from "./components/Footer";
import AboutSection from "./components/AboutSection";
import LuxuryInterior from "./components/LuxuryInterior";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <div>
      <HeroSection />
      <MainCard />   {/* Corrected */}
      <AboutSection />
      <LuxuryInterior />
      <Footer />
    </div>
  );
}

export default App;
