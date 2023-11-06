import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import MainLayout from "../layout/MainLayout";
import "../style/profile.css";
import avatar from "../assets/profile.png";

const ProfilePage = () => {
  const [copiedLink, setCopiedLink] = useState(null);

  const { state } = useAppContext();

  const handleCopy = (link) => {
    // Attempt to copy the link to the clipboard
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopiedLink(link);
        toast.success("copied");
      })
      .catch((error) => {
        toast.error("Failed to copy link");
      });
  };

  return (
    <MainLayout>
      <div className="container">
        <div class="profile">
          <div className="card-container">
            <span class="pro">Online</span>
            <img class="round" src={avatar} alt="user" />
            <h3>Name: {state.user?.name.toUpperCase()}</h3>
            <h5>Email: {state.user.email}</h5>
            <p>I am a humble boy</p>
          </div>
          <div className="imgLink">
            <h2 className="img-LinkTitle">Your Uploaded Image Link</h2>
            {state.userGallery.map((item) => (
              <li>
                <a href={item.img} target="_blank">
                  {item.img}
                </a>
                <button onClick={() => handleCopy(item.img)}>copy</button>
              </li>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
