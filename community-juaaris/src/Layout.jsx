import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
