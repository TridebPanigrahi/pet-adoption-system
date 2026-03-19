import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </ThemeProvider>
  );
}

export default App;
