import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e67e22", // smokey orange
    },
    secondary: {
      main: "#5d6d7e",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;
