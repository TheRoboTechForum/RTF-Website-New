import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
  // Use 'instant' to override any 'smooth' CSS settings
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant', 
  });
}, [pathname]);// This runs every time the route (path) changes

  return null;
}
