import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        formData,
      );

      const token = data.jwt_token;
      if (token) {
        localStorage.setItem("jwt_token", JSON.stringify(token));
        toast.success("Logged in successfully");
        navigate("/dashboard");

        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.warning("User Not found", {
          position: "top-center",
        });
      }
      if (error.response.status === 401) {
        toast.warning("Invalid Password", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 to-slate-900">
      <form
        onSubmit={handleForm}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="user email"
          value={formData.email}
          onChange={handleInput}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInput}
          className="w-full mb-6 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="text-center mt-2">
          If you are not registered yet?
          <span className="text-[blue] font-semibold">
            <Link to="/register">Register </Link>
          </span>
          here
        </p>
        <p className="text-center font-semibold">
          <Link className="text-[#e63b3b]" to="/resetpassword">
            Forgot Password?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
