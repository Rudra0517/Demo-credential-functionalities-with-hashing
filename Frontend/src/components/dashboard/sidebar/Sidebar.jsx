import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    toast.success("logout successfully", { position: "top-center" });
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };
  return (
    <div className="fixed left-0 pt-4 h-[90vh] w-[200px] bg-white border-r shadow-sm flex flex-col px-4 py-6">
      {/* Logo / Title */}
      <div className="mb-8 text-center">
        <h1 className="text-xl font-bold text-blue-700">Dashboard</h1>
        <p className="text-xs text-gray-400">User Panel</p>
      </div>

      <nav className="flex flex-col gap-3">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition"
        >
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          Profile
        </Link>

        <Link
          to="/dashboard/updateprofile"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition"
        >
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          Update Profile
        </Link>
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
