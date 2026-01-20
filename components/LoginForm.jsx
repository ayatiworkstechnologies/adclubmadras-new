"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { memberLogin, memberRegister, forgotPassword } from "@/lib/api";

/* ---------------- helpers to render API errors ---------------- */
// --- add these helpers near your imports ---
const humanizeKey = (k = "") =>
  k.replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

const collectErrors = (errors) => {
  if (!errors) return [];
  return Object.entries(errors).flatMap(([field, msgs]) => {
    if (Array.isArray(msgs)) return msgs.map((m) => `${humanizeKey(field)}: ${m}`);
    if (typeof msgs === "string") return [`${humanizeKey(field)}: ${msgs}`];
    return [`${humanizeKey(field)}: ${JSON.stringify(msgs)}`];
  });
};


/* ---------------- Validation Schemas ---------------- */
const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const forgotSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function AuthForm() {
  const [mode, setMode] = useState("login"); // 'login' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  // --- inside your component, change useForm to include setError ---
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,          // <<— add this
  } = useForm({
    resolver: yupResolver(
      mode === "register" ? registerSchema : mode === "forgot" ? forgotSchema : loginSchema
    ),
  });


  // --- replace your onSubmit with this patched version ---
  const onSubmit = async (data) => {
    try {
      if (mode === "login") {
        const res = await memberLogin(data);
        if (res?.status) {
          const userData = res.user;
          const token = res.token || res.user?.code || "dummy-token";
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("isAuthenticated", "true");

          Swal.fire({
            title: "Login Successful",
            text: `Welcome, ${userData?.firstName || "User"}!`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          reset();
          router.push("/");
        } else {
          const lines = collectErrors(res?.errors);
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            html: lines.length ? lines.join("<br/>") : (res?.message || "Login failed"),
          });
        }
      } else if (mode === "register") {
        const res = await memberRegister(data);

        if (res?.status) {
          Swal.fire({
            title: "Registered Successfully",
            text: "You can now login.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          reset();
          setMode("login");
        } else {
          // ✅ exact match for: {status:false, errors:{signUpEmail:["The sign up email has already been taken."]}}
          const takenMsg = res?.errors?.signUpEmail?.[0];
          if (takenMsg) {
            Swal.fire({
              icon: "error",
              title: "Email Already Taken",
              text: takenMsg,
            });
            // reflect under the Email input
            setError("email", { type: "server", message: takenMsg });
          } else {
            // generic fallback (handles other server-side field errors)
            const lines = collectErrors(res?.errors);
            Swal.fire({
              icon: "error",
              title: "Registration Failed",
              html: lines.length ? lines.join("<br/>") : (res?.message || "Registration failed"),
            });
          }
        }
      } else if (mode === "forgot") {
        const res = await forgotPassword(data.email);
        if (res?.status) {
          Swal.fire({
            title: "Email Sent",
            text: "Check your inbox for a reset link.",
            icon: "info",
            timer: 3000,
            showConfirmButton: false,
          });
          reset();
        } else {
          const lines = collectErrors(res?.errors);
          Swal.fire({
            icon: "error",
            title: "Request Failed",
            html: lines.length ? lines.join("<br/>") : (res?.message || "Failed to send reset email"),
          });
        }
      }
    } catch (error) {
      const api = error?.response?.data;
      const lines = collectErrors(api?.errors);
      const message =
        lines.length ? lines.join("<br/>") : (api?.message || error?.message || "Something went wrong. Please try again.");
      Swal.fire({ title: "Error", icon: "error", html: message });
    }
  };


  return (
    <section className="bg-black text-white py-20 px-4 sm:px-8 md:px-20">
      <div className="py-20">
        <h2 className="text-3xl md:text-4xl font-bold font-asgard text-center mb-14 uppercase tracking-wide">
          {mode === "login" ? "Login" : mode === "register" ? "Register" : "Forgot Password"}
        </h2>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-yellow-400 p-10 rounded-2xl shadow-xl text-black"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {mode === "register" && (
                <div>
                  <label className="font-asgard uppercase">Full Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter your name"
                    className={`input-primary ${errors.name ? "border-red-500 ring-red-500" : "focus:ring-black"}`}
                  />
                  {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                </div>
              )}

              <div>
                <label className="font-asgard uppercase">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className={`input-primary ${errors.email ? "border-red-500 ring-red-500" : "focus:ring-black"}`}
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
              </div>

              {(mode === "login" || mode === "register") && (
                <div className="relative">
                  <label className="font-asgard uppercase">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Enter password"
                    className={`input-primary pr-12 ${errors.password ? "border-red-500 ring-red-500" : "focus:ring-black"}`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px]">
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                  {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                </div>
              )}

              {mode === "register" && (
                <div className="relative">
                  <label className="font-asgard uppercase">Confirm Password</label>
                  <input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="Confirm password"
                    className={`input-primary pr-12 ${errors.confirmPassword ? "border-red-500 ring-red-500" : "focus:ring-black"}`}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-[38px]">
                    {showConfirm ? <EyeOff /> : <Eye />}
                  </button>
                  {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-full bg-black text-white py-3 rounded-full font-asgard hover:bg-white hover:text-black transition-all flex justify-center items-center gap-2"
              >
                {mode === "register" ? "CREATE ACCOUNT" : mode === "forgot" ? "SEND RESET LINK" : "LOGIN"}
                <ArrowRight />
              </motion.button>
            </form>

            <div className="text-sm text-center font-glancyr text-black mt-8 space-y-2">
              {mode !== "forgot" && (
                <button className="hover:underline" onClick={() => setMode("forgot")}>
                  Forgot your password?
                </button>
              )}
              <div className="my-4 border-t border-black" />
              {mode === "login" && (
                <p>
                  Don’t have an account?{" "}
                  <button className="text-blue-700 hover:underline" onClick={() => setMode("register")}>
                    Register here
                  </button>
                </p>
              )}
              {mode === "register" && (
                <p>
                  Already have an account?{" "}
                  <button className="text-blue-700 hover:underline" onClick={() => setMode("login")}>
                    Login here
                  </button>
                </p>
              )}
              {mode === "forgot" && (
                <p>
                  Remembered your password?{" "}
                  <button className="text-blue-700 hover:underline" onClick={() => setMode("login")}>
                    Back to Login
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
