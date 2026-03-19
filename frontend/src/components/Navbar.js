import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          PetAdopt
        </Typography>

        <Box>
          <Button onClick={() => navigate("/")} color="primary">
            Home
          </Button>
          <Button color="primary" onClick={() => navigate("/about")}>
            About
          </Button>
          <Button color="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
