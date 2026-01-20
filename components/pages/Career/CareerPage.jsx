"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Swal from "sweetalert2";
import { postJobApplication } from "@/lib/api";

// 🔶 Validation Schema including logo
const schema = yup.object({
  email: yup.string().email().required("Company Email is required"),
  job_title: yup.string().required("Job Title is required"),
  location: yup.string().required("Location is required"),
  phoneNo: yup.string().required("Mobile No is required"),
  job_type: yup
    .string()
    .oneOf(["Full Time", "Part Time", "Internship"])
    .required("Job Type is required"),
  description: yup.string().required("Description is required"),
  application_email: yup
    .string()
    .email()
    .required("Application Email is required"),
  company_name: yup.string().required("Company Name is required"),
  website: yup
    .string()
    .url("Invalid URL")
    .nullable()
    .transform((v) => (v === "" ? null : v)),
  tagline: yup.string().nullable(),
  video: yup
    .string()
    .url("Invalid video URL")
    .nullable()
    .transform((v) => (v === "" ? null : v)),
  twitter_username: yup.string().nullable(),
  logo: yup
    .mixed()
    .required("Logo is required")
    .test(
      "fileExist",
      "Logo is required",
      (value) => value && value.length > 0
    ),
});

export default function JobApplicationPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // 🔸 Convert to FormData for file upload
      const formData = new FormData();
      for (const key in data) {
        if (key === "logo") {
          formData.append("logo", data.logo[0]); // single file
        } else {
          formData.append(key, data[key] ?? "");
        }
      }

      const res = await postJobApplication(formData);

      if (res.status === "success") {
        Swal.fire("Success!", "Job submitted successfully!", "success");
        reset();
        document.querySelector('input[type="file"]').value = "";
      } else {
        Swal.fire("Failed", "Something went wrong.", "error");
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Unexpected error",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 mt-20 text-white p-6">
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Job List */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-primary">Latest Jobs</h2>
          <ul className="space-y-4">
            {[
              // Example: this array is empty or populated dynamically
            ].length === 0 ? (
              <li className="text-gray-400 text-sm italic">
                No job postings yet.
              </li>
            ) : (
              [
                // if you have jobs, they will be mapped here
              ].map((job, index) => (
                <li
                  key={index}
                  className="p-4 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition"
                >
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-400">
                    {job.location} · {job.type}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Job Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-primary">Post a Job</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            encType="multipart/form-data"
          >
            {/* Required Fields */}
            {[
              {
                name: "email",
                label: "Your Email *",
                type: "email",
                placeholder: "hr@company.com",
              },
              {
                name: "job_title",
                label: "Job Title *",
                type: "text",
                placeholder: "Frontend Developer",
              },
              {
                name: "location",
                label: "Location *",
                type: "text",
                placeholder: "Chennai",
              },

              {
                name: "phoneNo",
                label: "Mobile No *",
                type: "text",
                placeholder: "9876543211",
              },
              {
                name: "application_email",
                label: "Application Email *",
                type: "email",
                placeholder: "apply@company.com",
              },
              {
                name: "company_name",
                label: "Company Name *",
                type: "text",
                placeholder: "TechCorp Pvt Ltd",
              },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="block mb-1">{label}</label>
                <input
                  {...register(name)}
                  type={type}
                  placeholder={placeholder}
                  className="input-primary"
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm">{errors[name].message}</p>
                )}
              </div>
            ))}

            {/* Job Type */}
            <div>
              <label className="block mb-1 text-white">Job Type *</label>
              <select
                {...register("job_type")}
                className="input-primary focus:ring-primary"
              >
                <option value="">-- Select --</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.job_type && (
                <p className="text-red-500 text-sm">
                  {errors.job_type.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1">Description *</label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Describe the role"
                className="input-primary"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Optional Fields */}
            {[
              {
                name: "website",
                label: "Website",
                type: "url",
                placeholder: "https://company.com",
              },
              {
                name: "tagline",
                label: "Tagline",
                type: "text",
                placeholder: "We build the future",
              },
              {
                name: "video",
                label: "Video URL",
                type: "url",
                placeholder: "https://youtu.be/...",
              },
              {
                name: "twitter_username",
                label: "Twitter Username",
                type: "text",
                placeholder: "@companyjobs",
              },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="block mb-1">{label}</label>
                <input
                  {...register(name)}
                  type={type}
                  placeholder={placeholder}
                  className="input-primary"
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm">{errors[name].message}</p>
                )}
              </div>
            ))}

            {/* Logo Upload */}
            <div>
              <label className="block mb-1">Company Logo *</label>
              <input type="file" accept="image/*" {...register("logo")} />
              {errors.logo && (
                <p className="text-red-500 text-sm">{errors.logo.message}</p>
              )}
            </div>

            {/* Submit Button */}

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 inline-flex font-asgard items-center"
              type="submit"
            >
              <span className="px-6 py-3 bg-primary text-black hover:text-black rounded-full font-bold hover:bg-white transition-all duration-300">
                {loading ? "Submitting..." : "Submit Job"}{" "}
              </span>
              <span className="px-4 py-4 bg-primary text-black hover:text-black rounded-full hover:bg-white transition-all duration-300 flex items-center justify-center">
                <ArrowRight className="h-5 w-5" />
              </span>
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
