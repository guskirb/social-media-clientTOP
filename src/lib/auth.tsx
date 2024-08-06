import axios from "./axios";
import { z } from "zod";
import moment from "moment";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username/Email is required" }),
  password: z
    .string()
    .min(5, { message: "Password must contain at least 5 characters" }),
});

export type LoginFormFields = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(5, { message: "Password must contain at least 5 characters" }),
    confirm: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export type RegisterFormFields = z.infer<typeof registerSchema>;

export const getUser = async () => {
  try {
    const response = await axios.get("/users/me");
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser = async (data: LoginFormFields) => {
  try {
    const response = await axios.post("/users/log-in", data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const registerUser = async (data: RegisterFormFields) => {
  try {
    const response = await axios.post("/users/create", data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expires");
};

export const setLocalStorage = (response: any) => {
  const expires = moment().add(response.expires);

  localStorage.setItem("token", response.token);
  localStorage.setItem("expires", JSON.stringify(expires.valueOf()));
};