import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useLenis — initialises Lenis smooth scroll once and wires it
 * into GSAP ScrollTrigger so pinning / scrub still works perfectly.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // ⚠️  Only use the GSAP ticker to drive Lenis — do NOT also call
    //    lenis.on('scroll', ScrollTrigger.update) because the ticker
    //    already calls ScrollTrigger.update via RAF, causing double updates
    //    and visible jank.
    gsap.ticker.lagSmoothing(0);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();   // single, authoritative update point
    };

    gsap.ticker.add(tickerCb);

    // Let ScrollTrigger know the page layout after Lenis patches scroll
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);
}
