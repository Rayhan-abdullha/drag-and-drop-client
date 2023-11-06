import React from "react";

const Intro = () => {
  return (
    <div className="intro-wrapper">
      <div className="background-intro">
        <picture>
          <source
            src="https://cdn.pixabay.com/index/2023/11/03/03-48-13-353_1920x550.jpg"
            media="(max-width: 640px)"
          ></source>

          <source
            src="https://cdn.pixabay.com/index/2023/11/03/03-48-13-353_1920x550.jpg"
            media="(min-width: 1440px)"
          ></source>
          <img
            className="imageBanner"
            src="https://cdn.pixabay.com/index/2023/11/03/03-48-13-353_1920x550.jpg"
            alt="bg-img"
          />
        </picture>
      </div>
      <div className="overlay-bg"></div>
      <div className="content-intro">
        <h1>Welcom to Your Gallery</h1>
        <p>
          Over 4.2 million+ high quality stock images, videos and music shared
          by our talented community.
        </p>
      </div>
    </div>
  );
};

export default Intro;
