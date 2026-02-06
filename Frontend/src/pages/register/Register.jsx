import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
    password: "",
    image_url: "",
    gender: "",
    city: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post("http://localhost:8080/register", formData);

      toast.success("Registered successfully", { position: "top-center" });
      setFormData({
        username: "",
        age: "",
        email: "",
        password: "",
        image_url: "",
        gender: "",
        city: "",
        role: "",
      });
      navigate("/login");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.warning("You are already registered!!!", {
          position: "top-center",
        });
        navigate("/login");
      } else {
        toast.error("Server not responding", {
          position: "top-center",
        });
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleForm}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-black"
      >
        <h2 className="text-2xl font-bold text-center mb-6 ">Registration</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInput}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInput}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInput}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInput}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleInput}
          className="w-full mb-3 p-2 border rounded"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleInput}
          className="w-full mb-3 p-2 border rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <select
          name="role"
          value={formData.role}
          onChange={handleInput}
          className="w-full mb-3 p-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInput}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
        <p className="text-center mt-2">
          Already have an account?
          <span className="text-[blue] font-semibold">
            <Link to="/login">Signin </Link>
          </span>
          here
        </p>
      </form>
    </div>
  );
};

export default Register;
