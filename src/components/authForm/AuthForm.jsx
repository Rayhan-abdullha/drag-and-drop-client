import { useForm } from "react-hook-form";
import "./index.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const registerData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(
        `https://drag-drop-image-gallery-server.onrender.com/api/auth/${
          toggle ? "login" : "register"
        }`,
        registerData
      );

      if (response.status === 201) {
        toast.success("Register successfull");
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.removeItem("token");
          localStorage.setItem("token", response?.data?.data.token);
        } else {
          localStorage.setItem("token", response?.data?.data.token);
        }
        navigate("/");
        reset();
      } else if (response.status === 200) {
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.removeItem("token");
          localStorage.setItem("token", response?.data?.data.token);
        } else {
          localStorage.setItem("token", response?.data?.data.token);
        }
        navigate("/");
        toast.success("Login successfull");
        reset();
      } else {
        toast.error("Somthing went to wrong");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Credential error");
    }
  };

  return (
    <div className="authForm">
      <h2 className="formTitle">{toggle ? "Sign Up Form" : "Login Form"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!toggle && (
          <div className="form-group">
            <input
              className={errors.email ? "requiredError" : ""}
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: 3,
              })}
            />
          </div>
        )}

        <div className="form-group">
          <input
            className={errors.email ? "requiredError" : ""}
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />
        </div>

        <div className="form-group">
          <input
            className={errors.email ? "requiredError" : ""}
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value={toggle ? "Log in" : "Sign Up"}
            className="submit-button"
          />
        </div>
      </form>
      <div className="toggleSection">
        <p>{toggle ? "Don't have an account?" : `Have an account?`}</p>
        <button
          className="toggleBtn"
          onClick={() => setToggle((prev) => !prev)}
        >
          {toggle ? "SignUp" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
