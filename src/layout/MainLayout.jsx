import React from "react";
import Footer from "../components/footer/Footer";
import Navbar from "./../components/navbar/Navbar";

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
