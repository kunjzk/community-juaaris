import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
      <h1 className="text-xl sm:text-2xl font-medium text-[#4b6c43] mb-4 sm:mb-0">
        Community Juaaris
      </h1>
      <nav className="flex gap-4 sm:gap-8">
        <Link
          href="#"
          className="text-sm sm:text-base text-[#2e7d32] font-semibold border-b-2 border-[#2e7d32] pb-1"
        >
          Upcoming Games
        </Link>
        <Link
          href="#"
          className="text-sm sm:text-base text-black hover:text-[#2e7d32] transition-colors"
        >
          Bets
        </Link>
        <Link
          href="#"
          className="text-sm sm:text-base text-black hover:text-[#2e7d32] transition-colors"
        >
          Standings
        </Link>
      </nav>
    </header>
  );
}

export default Header;
