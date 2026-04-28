import { useState, useEffect, useCallback } from 'react';

const INTRO_SESSION_KEY = 'rtf_intro_shown_at';
const INTRO_COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes

/**
 * useLoadingManager — Controls intro animation frequency per session
 * 
 * Returns:
 *   - shouldShowIntro: boolean, true if animation should play
 *   - markIntroComplete: function to call when animation finishes
 *   - assetsReady: boolean, true when critical assets are loaded
 *   - setAssetsReady: function to set assets ready
 */
export function useLoadingManager() {
  const [shouldShowIntro, setShouldShowIntro] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);

  // Check if intro should show on mount
  useEffect(() => {
    const lastShownTime = sessionStorage.getItem(INTRO_SESSION_KEY);
    const now = Date.now();

    if (!lastShownTime) {
      // First visit in session
      setShouldShowIntro(true);
    } else {
      const elapsed = now - parseInt(lastShownTime, 10);
      if (elapsed > INTRO_COOLDOWN_MS) {
        // Cooldown expired
        setShouldShowIntro(true);
      } else {
        // Still within cooldown
        setShouldShowIntro(false);
      }
    }
  }, []);

  // Mark intro as shown
  const markIntroComplete = useCallback(() => {
    sessionStorage.setItem(INTRO_SESSION_KEY, Date.now().toString());
  }, []);

  return {
    shouldShowIntro,
    markIntroComplete,
    assetsReady,
    setAssetsReady,
  };
}
