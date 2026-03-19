import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
