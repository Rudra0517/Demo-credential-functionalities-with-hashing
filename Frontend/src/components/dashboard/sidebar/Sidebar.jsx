import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Sidebar = () => {
  const [activeUser, setActiveUser] = useState({});
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("jwt_token"));

  const logout = () => {
    toast.success("logout successfully", { position: "top-center" });
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  const getDetails = async () => {
    const { data } = await axios.get(`http://localhost:8080/allusers/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActiveUser(data);
  };

  useEffect(() => {
    getDetails();
  }, [activeUser]);

  return (
    <div className="fixed left-0 pt-4 h-[90vh] w-[200px] bg-white border-r shadow-sm flex flex-col px-4 py-6">
      {/* Logo / Title */}
      <div className="mb-8 text-center">
        <h1 className="text-xl font-bold text-blue-700">Dashboard</h1>
        <p className="text-xs text-gray-400">{activeUser.role} Panel</p>
      </div>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/dashboard"
          className={` flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition`}
        >
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/updateprofile"
          className={` flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition`}
        >
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          Update Profile
        </NavLink>
      </nav>

      <div className="flex-grow"></div>

      <button
        className="mt-6 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
