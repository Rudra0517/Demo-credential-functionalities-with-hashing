import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [activeuser, setActiveUser] = useState({});

  const token = JSON.parse(localStorage.getItem("jwt_token"));

  const fdata = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/allusers/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setActiveUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fdata();
  }, []);

  return (
    <div className="h-auto w-full flex items-center justify-center bg-gray-100 px-4 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-28 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-white shadow-md flex items-center justify-center text-3xl font-bold text-indigo-600">
            {activeuser.username?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            {activeuser.username?.toUpperCase()}
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{activeuser.email}</p>
            </div>

            <div>
              <p className="text-gray-500">Age</p>
              <p className="font-medium text-gray-800">{activeuser.age}</p>
            </div>

            <div>
              <p className="text-gray-500">Gender</p>
              <p className="font-medium text-gray-800">
                {activeuser.gender?.toUpperCase()}
              </p>
            </div>

            <div>
              <p className="text-gray-500">City</p>
              <p className="font-medium text-gray-800">
                {activeuser.city?.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Role</p>
              <p className="font-medium text-gray-800">
                {activeuser.role?.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Profile Image</p>
              <p className="text-indigo-600 text-sm truncate">
                {activeuser.image_url}
              </p>
            </div>
          </div>

          <button className="w-full mt-4 py-2 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
            <Link to="/dashboard/updateprofile"> Edit Profile</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
