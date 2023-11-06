import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import avatar from "../../assets/profile.png";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { state, dispatch } = useAppContext();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setShowMenu(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    toast.success("Logout successfull");
    navigate("/");
    dispatch({ type: "LOGOUT", paload: null });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul
        className={`nav-list ${showMenu ? "active" : ""} ${
          state.user ? "lineHeight" : ""
        }`}
      >
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
        <li>
          <Link to={"/gallery"}>Gallery</Link>
        </li>
        {state.user && (
          <li
            onClick={handleLogOut}
            className={`logout ${showMenu ? "active" : ""} `}
          >
            LogOut
          </li>
        )}
        <li className="profilePic">
          {!state.user ? (
            <Link to={"/signUp"}>SignUp</Link>
          ) : (
            <img
              onClick={() => navigate("/profile")}
              src={avatar}
              alt="notfound"
            />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
