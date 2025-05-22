import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="flex justify-between items-center mb-8 sm:mb-12 relative">
      <Link to="/" className="text-xl sm:text-2xl font-medium text-[#4b6c43]">
        Community Juaaris
      </Link>

      {/* Hamburger menu button - only visible on mobile */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${
            isMenuOpen ? "transform rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${
            isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Desktop navigation - hidden on mobile */}
      <nav className="hidden sm:flex gap-8">
        <NavLinks location={location} />
      </nav>

      {/* Mobile navigation - full-screen overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-20 sm:hidden">
          <nav className="flex flex-col items-center gap-6 px-4">
            <NavLinks location={location} onClick={closeMenu} />
          </nav>
        </div>
      )}
    </header>
  );
}

// Extracted NavLinks to a separate component for reuse
function NavLinks({ location, onClick }) {
  return (
    <>
      <Link
        to="/"
        onClick={onClick}
        className={`text-base font-semibold pb-1 ${
          location.pathname === "/"
            ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
            : "text-black hover:text-[#2e7d32] transition-colors"
        }`}
      >
        All Matches
      </Link>
      <Link
        to="/bets"
        onClick={onClick}
        className={`text-base font-semibold pb-1 ${
          location.pathname.startsWith("/bets")
            ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
            : "text-black hover:text-[#2e7d32] transition-colors"
        }`}
      >
        Match Bets
      </Link>
      <Link
        to="/upcomingtrivia"
        onClick={onClick}
        className={`text-base font-semibold pb-1 ${
          location.pathname.startsWith("/upcomingtrivia")
            ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
            : "text-black hover:text-[#2e7d32] transition-colors"
        }`}
      >
        All Trivia
      </Link>
      <Link
        to="/triviabets"
        onClick={onClick}
        className={`text-base font-semibold pb-1 ${
          location.pathname.startsWith("/triviabets")
            ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
            : "text-black hover:text-[#2e7d32] transition-colors"
        }`}
      >
        Trivia Bets
      </Link>
      <Link
        to="/standings"
        onClick={onClick}
        className={`text-base font-semibold pb-1 ${
          location.pathname === "/standings"
            ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
            : "text-black hover:text-[#2e7d32] transition-colors"
        }`}
      >
        Standings
      </Link>
      <Link
        to="/admin"
        onClick={onClick}
        className={`text-base font-semibold pb-1 ${
          location.pathname === "/admin"
            ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
            : "text-black hover:text-[#2e7d32] transition-colors"
        }`}
      >
        Admin
      </Link>
      {import.meta.env.VITE_VERCEL_TARGET_ENV === "development" && (
        <Link
          to="/debug"
          onClick={onClick}
          className={`text-base font-semibold pb-1 ${
            location.pathname === "/debug"
              ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
              : "text-black hover:text-[#2e7d32] transition-colors"
          }`}
        >
          Debug DB
        </Link>
      )}
    </>
  );
}

export default Header;
