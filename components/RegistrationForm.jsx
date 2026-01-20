import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.table(data);
  };

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-8 md:px-20">
      <div className="py-20">
        <h2 className="text-3xl md:text-4xl font-bold font-asgard text-center mb-14 uppercase tracking-wide">
          Register
        </h2>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-yellow-400 p-10 rounded-2xl shadow-xl text-black"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label className="block font-asgard text-base uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter your name"
                  className={`w-full text-lg font-glancyr rounded-lg px-5 py-3 placeholder-gray-600 focus:outline-none focus:ring-2 ${
                    errors.name ? "ring-red-500 border-red-500" : "focus:ring-black"
                  }`}
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block font-asgard text-base uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className={`w-full text-lg font-glancyr rounded-lg px-5 py-3 placeholder-gray-600 focus:outline-none focus:ring-2 ${
                    errors.email ? "ring-red-500 border-red-500" : "focus:ring-black"
                  }`}
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block font-asgard text-base uppercase mb-2">Password</label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Create a password"
                  className={`w-full text-lg font-glancyr rounded-lg px-5 py-3 placeholder-gray-600 focus:outline-none focus:ring-2 ${
                    errors.password ? "ring-red-500 border-red-500" : "focus:ring-black"
                  }`}
                />
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="inline-flex items-center group mt-6"
              >
                <span className="px-7 py-3 text-lg bg-black text-white rounded-full font-bold font-asgard group-hover:bg-white group-hover:text-black transition duration-300">
                  REGISTER
                </span>
                <span className="px-5 py-4 bg-black text-white rounded-full group-hover:bg-white group-hover:text-black transition duration-300 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
