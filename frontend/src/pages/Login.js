import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { toast } from "react-toastify";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful 🎉");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };
  return (
    <AuthLayout>
      <Typography
        variant="h4"
        mb={3}
        textAlign={{
          xs: "center",
          md: "left",
        }}
      >
        Welcome back!
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email Address"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          type="password"
          helperText={errors.password?.message}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            borderRadius: 5,
            height: 50,
            fontSize: 18,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #ffcc80, #ff6f00)",
            color: "#fff",
            textTransform: "none",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            "&:hover": {
              background: "linear-gradient(45deg, #ffb74d, #e65100)",
            },
          }}
          type="submit"
        >
          Log In
        </Button>
      </form>

      <Typography mt={2} textAlign="center">
        New here? <Link to="/register">Sign Up</Link>
      </Typography>
    </AuthLayout>
  );
};

export default Login;
