import React, { useState } from 'react';
import SolarSystem from './scenes/SolarSystem';
import Navbar from './components/Navbar';
import PlanetNavigation from './components/PlanetNavigation';
import ScrollProgress from './components/ScrollProgress';
import PlanetLabel from './components/PlanetLabel';
import LoadingScreen from './components/LoadingScreen';
import CertificateModal from './components/CertificateModal';
import Footer from './components/Footer';

import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

import { usePlanetNavigation } from './hooks/usePlanetNavigation';
import { useScrollCamera } from './hooks/useScrollCamera';
import { soundscape } from './utils/audio';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFreeInspect, setIsFreeInspect] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Synchronized Dual Navigation Hook
  const {
    activePlanetId,
    setActivePlanetId,
    navigateToPlanet,
    isProgrammaticScroll,
  } = usePlanetNavigation();

  // GSAP ScrollTrigger Camera Synchronization
  useScrollCamera({
    onSectionChange: (planetId) => {
      setActivePlanetId(planetId);
    },
    isProgrammaticScroll,
    enabled: !isLoading,
  });

  // Direct 3D planet click selection in Canvas
  const handleSelectPlanetFrom3D = (planet) => {
    soundscape.playWarp(0.25);
    navigateToPlanet(planet.id);
  };

  return (
    <div className="relative min-h-screen w-full bg-space-deep text-white overflow-x-hidden select-text">
      {/* Full-Screen Universe Initialization Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Photorealistic 3D Solar System (R3F Canvas) */}
      <SolarSystem
        activePlanetId={activePlanetId}
        onSelectPlanet={handleSelectPlanetFrom3D}
        isFreeInspect={isFreeInspect}
      />

      {/* Top Navbar */}
      <Navbar
        activePlanetId={activePlanetId}
        onNavigateTo={navigateToPlanet}
        isFreeInspect={isFreeInspect}
        onToggleFreeInspect={() => setIsFreeInspect(!isFreeInspect)}
      />

      {/* Planet Navigation Sidebar (Left) */}
      <PlanetNavigation
        activePlanetId={activePlanetId}
        onSelectPlanet={navigateToPlanet}
      />

      {/* Vertical Scroll Progress Indicator (Right) */}
      <ScrollProgress
        activePlanetId={activePlanetId}
        onNavigateTo={navigateToPlanet}
      />

      {/* Active Planet Label & Live Telemetry (Bottom Left) */}
      <PlanetLabel
        activePlanetId={activePlanetId}
        onResetToSun={() => navigateToPlanet('sun')}
      />

      {/* Scrollable Storytelling Sections Overlay */}
      <main className="relative z-10 w-full flex flex-col">
        {/* The Sun / Solar Core — Overview with left-side intro */}
        <Hero onExplore={() => navigateToPlanet('mercury')} />

        {/* Mercury — About Me */}
        <About />

        {/* Venus — Technical Skills */}
        <Skills />

        {/* Earth — Projects (Car Service Hub & Parkinson AI) */}
        <Projects />

        {/* Mars — Experience (Project Development Timeline) */}
        <Experience onOpenCertificate={setSelectedCertificate} />

        {/* Jupiter — Certifications */}
        <Certifications onOpenCertificate={setSelectedCertificate} />

        {/* Saturn — Education */}
        <Education />

        {/* Uranus — Achievements */}
        <Achievements />

        {/* Neptune — Contact */}
        <Contact />

        {/* Journey Footer */}
        <Footer onBackToSun={() => navigateToPlanet('sun')} />
      </main>

      {/* Interactive Certificate / Document Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
}
