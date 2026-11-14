import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PLANETS } from '../data/planets.js';

gsap.registerPlugin(ScrollTrigger);

export function useScrollCamera({
  onSectionChange,
  isProgrammaticScroll,
  enabled = true,
}) {
  useEffect(() => {
    if (!enabled) return;

    const ctx = gsap.context(() => {
      PLANETS.forEach((planet) => {
        const sectionEl = document.getElementById(planet.sectionId);
        if (!sectionEl) return;

        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => {
            if (!isProgrammaticScroll?.current) {
              onSectionChange(planet.id);
            }
          },
          onEnterBack: () => {
            if (!isProgrammaticScroll?.current) {
              onSectionChange(planet.id);
            }
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, [enabled, onSectionChange, isProgrammaticScroll]);
}

