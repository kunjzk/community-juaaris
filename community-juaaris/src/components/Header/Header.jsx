import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
      <Link
        to="/"
        className="text-xl sm:text-2xl font-medium text-[#4b6c43] mb-4 sm:mb-0"
      >
        Community Juaaris
      </Link>
      <nav className="flex gap-4 sm:gap-8">
        <Link
          to="/"
          className={`text-sm sm:text-base font-semibold pb-1 ${
            location.pathname === "/"
              ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
              : "text-black hover:text-[#2e7d32] transition-colors"
          }`}
        >
          Upcoming Games
        </Link>
        <Link
          to="/bets"
          className={`text-sm sm:text-base font-semibold pb-1 ${
            location.pathname.startsWith("/bets")
              ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
              : "text-black hover:text-[#2e7d32] transition-colors"
          }`}
        >
          Bets
        </Link>
        <Link
          to="/standings"
          className={`text-sm sm:text-base font-semibold pb-1 ${
            location.pathname === "/standings"
              ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
              : "text-black hover:text-[#2e7d32] transition-colors"
          }`}
        >
          Standings
        </Link>
      </nav>
    </header>
  );
}

export default Header;
