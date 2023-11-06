import React from "react";
import "./index.css";
import MainLayout from "../../layout/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="notfound">
        <h3 className="ops">Oops</h3>
        <p>404 Not Found!</p>
      </div>
    </MainLayout>
  );
};

export default NotFound;
