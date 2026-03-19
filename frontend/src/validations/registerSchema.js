import * as yup from "yup";
export const registerSchema = yup.object({
  name: yup.string().required("Name required"),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
