import React from "react";
import upload from "../../../src/assets/gallery/upload.png";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { imgBBKey } from "../../config";
import "./upload.css";

const ImageUpload = () => {
  const { state, dispatch } = useAppContext();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const newImage = {};
    try {
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const fileUpload = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgBBKey}`,
          formData
        );
        newImage.img = fileUpload.data.data.display_url;
      }
      const token = localStorage.getItem("token");

      await axios.post(
        "https://drag-drop-image-gallery-server.onrender.com/api/galleries",
        newImage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "ADD_USER_GALLERY", payload: newImage });
      toast.success("Upload successfull");
    } catch (err) {
      toast.error("Credential error");
    }
  };

  return (
    <div className="file-upload">
      <input onChange={handleImageUpload} type="file" name="file" id="file" />
      <label htmlFor="file">
        <img
          src={upload}
          htmlFor="file"
          alt="add image"
          width={30}
          height={30}
        />
        <h3>Add Image</h3>
      </label>
    </div>
  );
};

export default ImageUpload;
