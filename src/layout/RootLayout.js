import React from "react";
import Navbar from "./Navbar";

const RootLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default RootLayout;
