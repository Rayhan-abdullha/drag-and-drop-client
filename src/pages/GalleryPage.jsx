import React from "react";

import MainLayout from "../layout/MainLayout";
import Gallery from "../components/gallery/Gallery";

const GalleryPage = () => {
  return (
    <MainLayout>
      <main className="container all-gallery">
        <h3>All Images</h3>
        <Gallery />
      </main>
    </MainLayout>
  );
};

export default GalleryPage;
