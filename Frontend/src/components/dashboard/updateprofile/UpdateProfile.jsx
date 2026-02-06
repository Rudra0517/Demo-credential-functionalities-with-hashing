import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
    image_url: "",
    gender: "",
    city: "",
    role: "",
  });

  const token = JSON.parse(localStorage.getItem("jwt_token"));

  // const id = token.split(".")[1];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const deleteUser = async () => {
    try {
      if (confirm("Confirm that you want to delete profile?")) {
        const data = await axios.delete(`http://localhost:8080/deleteuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fdata = async () => {
    const { data } = await axios.get(`http://localhost:8080/allusers/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFormData(data);
  };

  useEffect(() => {
    fdata();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    const data = await axios.put(`http://localhost:8080/updateuser`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("User data updated successfully.");
    navigate("/dashboard");
  };

  return (
    <div className="h-[90vh] w-full flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleForm}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Update Profile</h2>
          <p className="text-sm text-gray-500 mt-1"></p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInput}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInput}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleInput}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="role"
              value={formData.role}
              readOnly
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            name="email"
            readOnly
            value={formData.email}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="image_url"
            placeholder="Profile Image URL"
            value={formData.image_url}
            onChange={handleInput}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInput}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mt-8 space-y-3">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={deleteUser}
            className="w-full py-3 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
