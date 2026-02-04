import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");
  const logout = () => {
    toast.success("logout successfully", { position: "top-center" });
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  const login = () => {
    navigate("/login");
  };
  return (
    <nav className="h-[4.5rem] shadow-lg flex justify-end pr-10 items-center sticky top-0 bg-gray-900 text-white">
      <div
        className={`bg-green-500 px-[20px] font-bold py-2 rounded-md text-white ${token ? "hidden" : "block"}`}
      >
        <Link to="/login">
          <button onClick={login}>Log in</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
