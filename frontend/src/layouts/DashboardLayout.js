// import {
//   Box,
//   Typography,
//   Avatar,
//   List,
//   ListItemButton,
//   ListItemText,
// } from "@mui/material";
// import { Outlet, useNavigate } from "react-router-dom";
// import loginBackground from "../assets/login_background.png";

// const DashboardLayout = () => {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   const menu =
//     user?.role === "admin"
//       ? [
//           { name: "Dashboard", path: "/admin-dashboard" },
//           { name: "Manage Pets", path: "/admin-dashboard/pets" },
//           { name: "Applications", path: "/admin-dashboard/applications" },
//         ]
//       : [
//           { name: "Dashboard", path: "/user-dashboard" },
//           { name: "Available Pets", path: "/user-dashboard/pets" },
//           { name: "My Applications", path: "/user-dashboard/applications" },
//         ];

//   return (
//     <Box display="flex" minHeight="100vh" bgcolor="#f9f3ea">
//       {/* SIDEBAR */}
//       <Box width={250} bgcolor="#fff3e0" p={3} borderRight="1px solid #eee">
//         <Typography variant="h5" fontWeight="bold" mb={4}>
//           🐾 Pet Adoption
//         </Typography>

//         <List>
//           {menu.map((m) => (
//             <ListItemButton key={m.name} onClick={() => navigate(m.path)}>
//               <ListItemText primary={m.name} />
//             </ListItemButton>
//           ))}
//           <ListItemButton
//             onClick={() => {
//               localStorage.clear();
//               navigate("/");
//             }}
//           >
//             <ListItemText primary="Logout" />
//           </ListItemButton>
//         </List>
//       </Box>

//       {/* MAIN AREA */}
//       <Box flex={1}>
//         {/* HEADER */}
//         <Box
//           height={80}
//           bgcolor="#ffe0b2"
//           display="flex"
//           alignItems="center"
//           justifyContent="space-between"
//           px={4}
//         >
//           <Typography variant="h4">Pet Adoption Dashboard</Typography>

//           <Box display="flex" alignItems="center" gap={2}>
//             <Typography>Welcome, {user?.name}</Typography>
//             <Avatar src="https://i.pravatar.cc/150" />
//           </Box>
//         </Box>

//         {/* CONTENT */}
//         <Box
//           p={4}
//           sx={{
//             backgroundImage: `url(${loginBackground})`,
//             backgroundSize: "cover",
//             backgroundPosition: "right center",
//             backgroundRepeat: "no-repeat",
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DashboardLayout;

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import loginBackground from "../assets/login_background.png";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
      <Box
        width={260}
        bgcolor="#fff3e0"
        p={3}
        borderRight="1px solid #eee"
        sx={{
          boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={4}>
          🐾 Pet Adoption
        </Typography>

        <List>
          {menu.map((m) => {
            const isActive = location.pathname === m.path;

            return (
              <ListItemButton
                key={m.name}
                onClick={() => navigate(m.path)}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  background: isActive
                    ? "linear-gradient(45deg, #ff9800, #ffb74d)"
                    : "transparent",
                  color: isActive ? "#fff" : "#333",
                  fontWeight: isActive ? "bold" : "normal",

                  "&:hover": {
                    background: isActive
                      ? "linear-gradient(45deg, #fb8c00, #ffa726)"
                      : "#ffe0b2",
                  },
                }}
              >
                <ListItemText primary={m.name} />
              </ListItemButton>
            );
          })}

          {/* LOGOUT */}
          <ListItemButton
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            sx={{
              mt: 3,
              borderRadius: 2,
              bgcolor: "#ffccbc",
              "&:hover": { bgcolor: "#ffab91" },
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
          sx={{
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h4">Pet Adoption Dashboard</Typography>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography fontWeight="500">Welcome, {user?.name}</Typography>
            <Avatar src="https://i.pravatar.cc/150" />
          </Box>
        </Box>

        {/* CONTENT */}
        <Box
          p={4}
          sx={{
            minHeight: "calc(100vh - 80px)",
            backgroundImage: `
              linear-gradient(
                rgba(249,243,234,0.95),
                rgba(255,224,178,0.85)
              ),
              url(${loginBackground})
            `,
            backgroundSize: "cover",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
