import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import ResetPassword from "../pages/resetpassword/ResetPassword";
import Layout from "../pages/layout/Layout";
import Home from "../components/home/Home";
import Profile from "../components/dashboard/profile/Profile";
import Dashboard from "../components/dashboard/Dashboard";
import UpdateProfile from "../components/dashboard/updateprofile/UpdateProfile";
import ErrorPage from "../pages/errorpage/ErrorPage";
import PrivateRoute from "../privateroute/PrivateRoute";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Profile />,
          },
          {
            path: "/dashboard/updateprofile",
            element: <UpdateProfile />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "resetpassword",
    element: <ResetPassword />,
  },
]);
