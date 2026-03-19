import {
  Box,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const menu =
    user?.role === "admin"
      ? [
          { name: "Dashboard", path: "/admin-dashboard" },
          { name: "Manage Pets", path: "/admin-dashboard/pets" },
          { name: "Applications", path: "/admin-dashboard/applications" },
        ]
      : [
          { name: "Dashboard", path: "/user-dashboard" },
          { name: "Available Pets", path: "/user-dashboard/pets" },
          { name: "My Applications", path: "/user-dashboard/applications" },
        ];

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f9f3ea">
      {/* SIDEBAR */}
      <Box width={250} bgcolor="#fff3e0" p={3} borderRight="1px solid #eee">
        <Typography variant="h5" fontWeight="bold" mb={4}>
          🐾 Pet Adoption
        </Typography>

        <List>
          {menu.map((m) => (
            <ListItemButton key={m.name} onClick={() => navigate(m.path)}>
              <ListItemText primary={m.name} />
            </ListItemButton>
          ))}
          <ListItemButton
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>

      {/* MAIN AREA */}
      <Box flex={1}>
        {/* HEADER */}
        <Box
          height={80}
          bgcolor="#ffe0b2"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={4}
        >
          <Typography variant="h4">Pet Adoption Dashboard</Typography>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography>Welcome, {user?.name}</Typography>
            <Avatar src="https://i.pravatar.cc/150" />
          </Box>
        </Box>

        {/* CONTENT */}
        <Box p={4}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
