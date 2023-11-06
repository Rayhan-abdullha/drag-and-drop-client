import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
