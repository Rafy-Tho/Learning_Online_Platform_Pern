import { useEffect, useRef, useState } from "react";
import Avatar from "./navbar/Avatar";
import Desktop from "./navbar/Desktop";
import Logo from "./navbar/Logo";
import Menu from "./navbar/Menu";
import Mobile from "./navbar/Mobile";
import useAuth from "../hooks/useAuth";
import LoginSignupBtn from "./LoginSignupBtn";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { user } = useAuth();
  const navRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setPricingOpen(false);
        setAvatarOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      setPricingOpen(false);
      setAvatarOpen(false);
    }
  };

  const togglePricing = (e) => {
    e.stopPropagation();
    setPricingOpen(!pricingOpen);
    setAvatarOpen(false);
  };

  const toggleAvatar = (e) => {
    e.stopPropagation();
    setAvatarOpen(!avatarOpen);
    setPricingOpen(false);
  };

  const closeAll = () => {
    setMobileMenuOpen(false);
    setPricingOpen(false);
    setAvatarOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md"
      ref={navRef}
    >
      <div className="max-w-7xl mx-auto   ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />
          {/* Desktop Navigation */}
          <Desktop
            closeAll={closeAll}
            togglePricing={togglePricing}
            pricingOpen={pricingOpen}
          />
          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Avatar */}
            {user && (
              <Avatar
                avatarOpen={avatarOpen}
                toggleAvatar={toggleAvatar}
                closeAll={closeAll}
              />
            )}
            {!user && <LoginSignupBtn />}
            {/* Mobile menu button */}
            <Menu
              mobileMenuOpen={mobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>
        </div>
        {/* Mobile Menu with Functional Dropdowns */}
        <Mobile
          mobileMenuOpen={mobileMenuOpen}
          closeAll={closeAll}
          togglePricing={togglePricing}
          pricingOpen={pricingOpen}
          avatarOpen={avatarOpen}
          toggleAvatar={toggleAvatar}
        />
      </div>
    </header>
  );
};

export default Navigation;
