import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center mb-12">
      <h1 className="text-2xl font-medium text-[#4b6c43]">Community Juaaris</h1>
      <nav className="flex gap-8">
        <Link
          href="#"
          className="text-[#2e7d32] font-semibold border-b-2 border-[#2e7d32] pb-1"
        >
          Upcoming Games
        </Link>
        <Link
          href="#"
          className="text-black hover:text-[#2e7d32] transition-colors"
        >
          Bets
        </Link>
        <Link
          href="#"
          className="text-black hover:text-[#2e7d32] transition-colors"
        >
          Standings
        </Link>
      </nav>
    </header>
  );
}

export default Header;
