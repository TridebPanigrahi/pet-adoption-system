import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import UserDashboard from "../pages/user/UserDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import ManagePets from "../pages/admin/ManagePets";
import Applications from "../pages/admin/Applications";
import PetDetails from "../pages/PetDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route element={<PrivateRoutes role="user" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Route>
        </Route>
        <Route element={<PrivateRoutes role="admin" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard/pets" element={<ManagePets />} />
            <Route
              path="/admin-dashboard/applications"
              element={<Applications />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
