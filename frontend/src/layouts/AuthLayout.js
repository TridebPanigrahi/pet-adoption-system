import { Box, Paper } from "@mui/material";
import rightLoginImg from "../assets/right_login_img.png";
import loginBackground from "../assets/login_background.png";

function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        justifyContent: "center",
        alignItems: "center",
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        py: {
          xs: 3,
          sm: 4,
          md: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          width: {
            xs: "100%",
            sm: "420px",
            md: "1200px",
          },
          alignItems: "center",
          justifyContent: "center",
          gap: {
            xs: 2,
            md: 6,
          },
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            p: {
              xs: 3,
              sm: 4,
              md: 5,
            },
            borderRadius: 4,
          }}
        >
          {children}
        </Paper>
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "block",
            },
          }}
        >
          <img src={rightLoginImg} alt="pet" width={620} />
        </Box>
      </Box>
    </Box>
  );
}

export default AuthLayout;
