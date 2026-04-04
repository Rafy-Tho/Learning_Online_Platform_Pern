import { useEffect, useState } from "react";

/**
 * Custom hook for handling scroll effect
 */
function useScrollEffect() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolled;
}
export default useScrollEffect;
