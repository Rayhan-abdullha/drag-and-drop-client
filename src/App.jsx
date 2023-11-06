import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { AppProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/loader/Loader";

const App = () => {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);
  return (
    <AppProvider>
      <RouterProvider router={router} />
      {loader && <Loader />}
      <ToastContainer />
    </AppProvider>
  );
};

export default App;
