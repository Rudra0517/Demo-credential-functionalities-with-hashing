import React from "react";
import Sidebar from "./sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex w-[100%] h-[90vh]">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
