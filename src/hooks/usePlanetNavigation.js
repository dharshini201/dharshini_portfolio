import { useState, useCallback, useRef } from 'react';
import { PLANETS } from '../data/planets.js';

export function usePlanetNavigation() {
  const [activePlanetId, setActivePlanetId] = useState('sun');
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  const planetToSectionMap = {
    sun: 'hero',
    mercury: 'about',
    venus: 'skills',
    earth: 'projects',
    mars: 'experience',
    jupiter: 'certifications',
    saturn: 'education',
    uranus: 'achievements',
    neptune: 'contact',
  };

  const sectionToPlanetMap = {
    hero: 'sun',
    about: 'mercury',
    skills: 'venus',
    projects: 'earth',
    experience: 'mars',
    certifications: 'jupiter',
    education: 'saturn',
    achievements: 'uranus',
    contact: 'neptune',
  };

  // Click-based navigation that smoothly updates scroll and active state
  const navigateToPlanet = useCallback((planetId) => {
    const validPlanet = PLANETS.find((p) => p.id === planetId);
    if (!validPlanet) return;

    // Set lock flag to prevent scroll spy from jittering during animation
    isProgrammaticScroll.current = true;
    setActivePlanetId(planetId);

    const targetSectionId = planetToSectionMap[planetId];
    if (targetSectionId) {
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1100);
  }, []);

  // Scroll spy updater called when an element enters viewport
  const onSectionIntersect = useCallback((sectionId) => {
    if (isProgrammaticScroll.current) return;
    const planetId = sectionToPlanetMap[sectionId];
    if (planetId) {
      setActivePlanetId(planetId);
    }
  }, []);

  return {
    activePlanetId,
    setActivePlanetId,
    navigateToPlanet,
    onSectionIntersect,
    isProgrammaticScroll,
    planetToSectionMap,
    sectionToPlanetMap,
  };
}

