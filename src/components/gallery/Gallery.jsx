import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./gallery.css";

const Gallery = () => {
  const { state, dispatch } = useAppContext();

  const [dragging, setDragging] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    const galleries = getAllGalleries();
    galleries
      .then((res) => {
        dispatch({ type: "FETCH_ALL_GALLERY", payload: res?.data?.data });
      })
      .catch((err) => toast.error("Somthing went to wrong"));
  }, []);

  const getAllGalleries = async () => {
    return await axios.get(
      "https://drag-drop-image-gallery-server.onrender.com/api/galleries"
    );
  };

  const handleDragStart = (img) => {
    setDraggedImage(img);
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e?.target?.children[0]?.alt && setDraggedIndex(e?.target?.children[0]?.alt);
  };

  const handleDrop = (targetIndex) => {
    setDragging(false);

    if (draggedImage) {
      const updatedImages = state.allGalleries.filter(
        (image) => image._id !== draggedImage._id
      );
      updatedImages.splice(targetIndex, 0, draggedImage);

      dispatch({ type: "DROP_ALL_GALLERY", payload: updatedImages });
      setDraggedImage(null);
    }
  };

  const data = state.allGalleries || ImageData;

  return (
    <div className="image-gallery" onDragOver={handleDragOver}>
      {state.allGalleries?.map((image, index) => (
        <Card
          key={index}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          image={image}
          index={index}
        />
      ))}
    </div>
  );
};

export default Gallery;
