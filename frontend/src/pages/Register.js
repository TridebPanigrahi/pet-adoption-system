import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { registerSchema } from "../validations/registerSchema";
import { toast } from "react-toastify";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await API.post("/auth/register", data);

      toast.success("Registration Successful 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Register Failed");
    }
  };
  return (
    <AuthLayout>
      <Typography variant="h4" mb={1}>
        Create Account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        <Button
          fullWidth
          variant="contained"
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
          Sign Up
        </Button>
      </form>

      <Typography mt={2} textAlign="center">
        Already have account? <Link to="/login">Login</Link>
      </Typography>
    </AuthLayout>
  );
};

export default Register;
