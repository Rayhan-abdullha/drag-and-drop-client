import React, { useEffect, useState } from "react";
import "../style/home.css";
import Modal from "../components/modal/Modal";
import Card from "../components/card/Card";
import Header from "../components/header/Header";
import ImageUpload from "../components/fileUpload/ImageUpload";
import MainLayout from "./../layout/MainLayout";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { decodedToken } from "../util";
import Intro from "../components/header/Intro";
import Gallery from "../components/gallery/Gallery";

const Home = () => {
  const { state, dispatch } = useAppContext();
  const [selectId, setSetSelectId] = useState([]);
  const [confirmDel, setConfirmDel] = useState(false);

  const [dragging, setDragging] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodedToken(token);
      dispatch({ type: "DECODED_TOKEN", payload: user });
      const galleries = getAllGalleries(token);
      galleries
        .then((res) => {
          dispatch({ type: "FETCH_USER_GALLERY", payload: res?.data?.data });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Somthing went to wrong");
        });
    }
  }, []);

  const getAllGalleries = async (token) => {
    return await axios.get(
      "https://drag-drop-image-gallery-server.onrender.com/api/users/galleries",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
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
      const updatedImages = state.userGallery.filter(
        (image) => image._id !== draggedImage._id
      );
      updatedImages.splice(targetIndex, 0, draggedImage);

      dispatch({ type: "DROP_USER_GALLERY", payload: updatedImages });
      setDraggedImage(null);
    }
  };

  // select image for delete
  const handleSelect = (id) => {
    if (selectId.includes(id)) {
      const filterId = selectId.filter((idx) => idx !== id);
      setSetSelectId(filterId);
    } else {
      setSetSelectId([...selectId, id]);
    }
  };

  // delete image
  const confirmDeleteImages = async (confimed) => {
    if (confimed) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          "https://drag-drop-image-gallery-server.onrender.com/api/galleries",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            data: selectId,
          }
        );

        if (response?.data?.code === 200) {
          toast.success(response.data.message);
        } else {
          toast.error("Somthing went to wrong");
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || "Somthing went to wrong");
      }

      const filterData = state?.userGallery.filter(
        (item) => !selectId.includes(item._id)
      );
      dispatch({ type: "DELETE_GALLERY", payload: filterData });
      setConfirmDel(false);
      setSetSelectId([]);
    } else {
      setConfirmDel(confimed);
    }
  };

  return (
    <MainLayout>
      <Intro />
      {state.user && (
        <main className="container home">
          <Header setConfirmDel={setConfirmDel} selectId={selectId} />
          <div className="image-gallery" onDragOver={handleDragOver}>
            {state.userGallery?.map((image, index) => (
              <Card
                key={index}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                image={image}
                index={index}
                handleSelect={handleSelect}
                selectId={selectId}
                checked={selectId.includes(image._id)}
              />
            ))}

            <ImageUpload />
          </div>
          {confirmDel && (
            <Modal openmodal={confirmDel} confirmDel={confirmDeleteImages} />
          )}
        </main>
      )}

      <section className="container all-gallery">
        <h3 className="gallery-title">All Images</h3>
        <Gallery />
      </section>
    </MainLayout>
  );
};

export default Home;
