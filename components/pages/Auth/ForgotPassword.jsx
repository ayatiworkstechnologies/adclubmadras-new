"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";
import { forgotPasswordReset } from "@/lib/api";

/* ----------------- Validation Schema ----------------- */
const schema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  // ✅ Ensure only one password field can be open at a time
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword({
        password: !showPassword.password,
        confirmPassword: false,
      });
    } else if (field === "confirmPassword") {
      setShowPassword({
        password: false,
        confirmPassword: !showPassword.confirmPassword,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await forgotPasswordReset({ id, password: data.password });

      if (res.status) {
        Swal.fire("✅ Success", res.message || "Password reset successful!", "success");
        reset();
        router.push("/login");
      } else {
        Swal.fire("❌ Failed", res.message || "Password reset failed!", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Something went wrong!", "error");
    }
  };

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-8 md:px-20">
      <div className="py-20">
        <h2 className="text-3xl md:text-4xl font-bold font-asgard text-center mb-14 uppercase tracking-wide">
          Reset Password
        </h2>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-yellow-400 p-10 rounded-2xl shadow-xl text-black"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* New Password */}
              <div className="relative">
                <label className="block text-base uppercase font-bold font-asgard mb-3">
                  New Password
                </label>
                <input
                  type={showPassword.password ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("password")}
                  className={`input-primary pr-12 ${errors.password
                    ? "ring-red-500 border-red-500"
                    : "focus:ring-black"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute right-4 top-12 text-gray-600"
                >
                  {showPassword.password ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-base uppercase font-bold font-asgard mb-3">
                  Confirm Password
                </label>
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
                  className={`input-primary pr-12 ${errors.confirmPassword
                    ? "ring-red-500 border-red-500"
                    : "focus:ring-black"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-4 top-12 text-gray-600"
                >
                  {showPassword.confirmPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center group"
                >
                  <span className="px-7 py-3 text-lg bg-black text-white rounded-full font-bold font-asgard group-hover:bg-white group-hover:text-black transition duration-300">
                    {isSubmitting ? "Submitting..." : "RESET PASSWORD"}
                  </span>
                  <span className="px-5 py-4 bg-black text-white rounded-full group-hover:bg-white group-hover:text-black transition duration-300 flex items-center justify-center">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
