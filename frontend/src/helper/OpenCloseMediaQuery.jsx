import { useState, useEffect } from "react";
// Custom hook to use media query
// this component is used to check if the screen size matches the query query string
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (event) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};
// Example usage:
const YourComponent = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);

  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);
};
// Example usage:
export const useSidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);

  // Update when screen size changes
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  // Toggle function
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Close function
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Open function
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  return {
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    isDesktop,
  };
};
