"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  getUserDetails,
  updateUserProfile,
  changeUserPassword,
  getMembershipDetails,
} from "@/lib/api";
import { TbUserUp } from "react-icons/tb";
import { ShieldCheck, LogOut } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  FaUserClock,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaChevronDown,
  FaChevronUp,
  FaMobile,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ProfilePage() {
  const [tab, setTab] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [hasMembership, setHasMembership] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingMembership, setLoadingMembership] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const profileSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    contactNO: Yup.string()
      .required("Contact Number is required")
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number"),
  });

  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    setValue: setProfileValue,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      contactNO: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      getUserDetails({ user_id: user.id })
        .then(async (res) => {
          const data = res?.data;
          setUserData(data);
          setProfileValue("fullName", data?.name || "");
          setProfileValue("email", data?.email || "");
          setProfileValue("contactNO", data?.phone || "");

          if (data?.user_id) {
            setLoadingMembership(true);
            try {
              const membershipRes = await getMembershipDetails({
                id: data.user_id,
              });
              const membershipData = membershipRes?.data;

              const isActive =
                membershipData?.status &&
                String(membershipData?.member_status).toLowerCase() ===
                "active";

              if (isActive) {
                setHasMembership(true);
                setUserData((prev) => ({
                  ...prev,
                  membershipDetails: membershipData,
                }));
              }
              else {
                // Not active (inactive/expired/missing) → treat as no membership
                setHasMembership(false);
                setUserData((prev) => ({
                  ...prev,
                  membershipDetails: undefined,
                }));
              }
            } catch (err) {
              console.error("Membership fetch failed:", err);
              setHasMembership(false);
            } finally {
              setLoadingMembership(false);
            }
          }
        })
        .catch(() => {
          Swal.fire("Error", "Failed to fetch user details", "error");
        });
    }
  }, [setProfileValue]);

  const onProfileUpdate = async (formData) => {
    try {
      setLoadingProfile(true);
      const payload = {
        user_id: userData?.id || userData?.user_id,
        fullName: formData.fullName,
        contactNO: formData.contactNO,
      };
      const res = await updateUserProfile(payload);
      Swal.fire(
        "Updated!",
        res?.data?.message || "Profile information updated.",
        "success"
      );
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Failed to update profile",
        "error"
      );
    } finally {
      setLoadingProfile(false);
    }
  };

  const onChangePassword = async (formData) => {
    try {
      setLoadingPassword(true);
      const payload = {
        user_id: userData?.id || userData?.user_id,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };
      const res = await changeUserPassword(payload);
      Swal.fire(
        "Success",
        res?.data?.message || "Password changed successfully!",
        "success"
      );
      resetPasswordForm();
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Failed to change password",
        "error"
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      localStorage.clear();
      Swal.fire(
        "Logged Out",
        "You have been logged out successfully.",
        "success"
      ).then(() => {
        window.location.href = "/";
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 mt-20 font-glancyr">
      <div className="max-w-6xl mx-auto bg-black/80 rounded-2xl shadow-lg p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Left Tabs */}
        <div className="w-full md:w-1/4 space-y-4">
          <button
            onClick={() => setTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${tab === "profile"
                ? "bg-primary text-black shadow-md"
                : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            <TbUserUp size={30} />
            <span className="font-semibold">My Profile</span>
          </button>
          <button
            onClick={() => setTab("membership")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${tab === "membership"
                ? "bg-primary text-black shadow-md"
                : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            <ShieldCheck size={30} />
            <span className="font-semibold">Membership</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut size={30} />
            <span className="font-semibold">Logout</span>
          </button>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-gray-900 rounded-xl p-6 min-h-[500px]">
            {tab === "profile" && (
              <ProfileTab
                handleProfileSubmit={handleProfileSubmit}
                onProfileUpdate={onProfileUpdate}
                registerProfile={registerProfile}
                profileErrors={profileErrors}
                loadingProfile={loadingProfile}
                handlePasswordSubmit={handlePasswordSubmit}
                onChangePassword={onChangePassword}
                registerPassword={registerPassword}
                passwordErrors={passwordErrors}
                loadingPassword={loadingPassword}
                showPassword={showPassword}
                togglePassword={togglePassword}
              />
            )}

            {tab === "membership" && (
              <MembershipTab
                loadingMembership={loadingMembership}
                hasMembership={hasMembership}
                userData={userData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ✅ PROFILE TAB COMPONENT */
function ProfileTab({
  handleProfileSubmit,
  onProfileUpdate,
  registerProfile,
  profileErrors,
  loadingProfile,
  handlePasswordSubmit,
  onChangePassword,
  registerPassword,
  passwordErrors,
  loadingPassword,
  showPassword,
  togglePassword,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      {/* Profile Info */}
      <div>
        <h3 className="text-xl font-bold mb-4 border-b pb-2 border-gray-700">
          Profile Information
        </h3>
        <form
          onSubmit={handleProfileSubmit(onProfileUpdate)}
          className="grid md:grid-cols-2 gap-4"
        >
          <div>
            <input
              {...registerProfile("fullName")}
              className="bg-gray-800 p-3 rounded-lg w-full"
              placeholder="Full Name"
            />
            {profileErrors.fullName && (
              <p className="text-red-400 text-xs mt-1">
                {profileErrors.fullName.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...registerProfile("email")}
              disabled
              className="bg-gray-800 p-3 rounded-lg w-full"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              {...registerProfile("contactNO")}
              className="bg-gray-800 p-3 rounded-lg w-full"
              placeholder="Contact Number"
            />
            {profileErrors.contactNO && (
              <p className="text-red-400 text-xs mt-1">
                {profileErrors.contactNO.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loadingProfile}
              className={`mt-4 px-6 py-2 rounded-full font-semibold ${loadingProfile
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-primary text-black"
                }`}
            >
              {loadingProfile ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div>
        <h3 className="text-xl font-bold mb-4 border-b pb-2 border-gray-700">
          Change Password
        </h3>
        <form
          onSubmit={handlePasswordSubmit(onChangePassword)}
          className="grid md:grid-cols-3 gap-4"
        >
          {["oldPassword", "newPassword", "confirmPassword"].map((field, i) => (
            <div key={i} className="relative">
              <input
                type={showPassword[field] ? "text" : "password"}
                {...registerPassword(field)}
                className="bg-gray-800 p-3 rounded-lg w-full pr-10"
                placeholder={
                  field === "oldPassword"
                    ? "Old Password"
                    : field === "newPassword"
                      ? "New Password"
                      : "Confirm Password"
                }
              />
              <button
                type="button"
                onClick={() => togglePassword(field)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword[field] ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              {passwordErrors[field] && (
                <p className="text-red-400 text-xs mt-1">
                  {passwordErrors[field].message}
                </p>
              )}
            </div>
          ))}
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={loadingPassword}
              className={`mt-4 px-6 py-2 rounded-full font-semibold ${loadingPassword
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-primary text-black"
                }`}
            >
              {loadingPassword ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

/* ✅ MEMBERSHIP TAB (with Accordion) */
function MembershipTab({ loadingMembership, hasMembership, userData }) {
  const handleRenewMembership = () => {
    Swal.fire(
      "Renewal Process",
      "Redirecting to membership renewal page...",
      "info"
    );
    // ✅ Redirect to your renewal page (replace with your actual URL)
    window.location.href = "/membership-renewal";
  };

  const isMembershipExpiringSoon = () => {
    if (!userData?.membershipDetails?.expiryDate) return false;

    const expiryDate = new Date(userData.membershipDetails.expiryDate);
    const today = new Date();
    const daysLeft = (expiryDate - today) / (1000 * 60 * 60 * 24);

    return daysLeft <= 30; // show if expired or less than/equal 30 days left
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-700 text-white">
        Membership Details
      </h3>

      {loadingMembership ? (
        <p className="text-gray-400">Loading membership details...</p>
      ) : hasMembership && userData?.membershipDetails ? (
        <>
          {/* ✅ Membership Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 text-white flex flex-col items-center justify-center p-6 rounded-xl shadow-md border border-gray-700 transition"
            >
              <div className="mb-4">
                <FaUserClock className="w-16 h-16 text-sky-500 mx-auto" />
              </div>

              <p className="text-sm text-gray-400">Membership ID</p>
              <p className="text-xl font-semibold text-white">
                {userData.membershipDetails.unique_id}
              </p>

              <hr className="my-3 w-12 border-gray-600" />

              <p className="text-sm text-gray-400">
                Member Since:{" "}
                {new Date(
                  userData.membershipDetails.date_registered
                ).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-400">
                Next Renewal:{" "}
                {new Date(
                  userData.membershipDetails.expiryDate
                ).toLocaleDateString()}
              </p>

              {/* ✅ Show Renew Button if expired or expiring soon ****NOte */}
              {/* {isMembershipExpiringSoon() && (
                <button
                  onClick={handleRenewMembership}
                  className="mt-4 px-6 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-full transition"
                >
                  Renew Membership
                </button>
              )}  */}
            </motion.div>

            {/* Right Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 text-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 transition"
            >
              <p className="text-lg font-semibold mb-3">
                Category:{" "}
                <span className="text-sky-400">
                  {userData.membershipDetails.mem_category}
                </span>
              </p>

              <div className="bg-gray-800 p-4 rounded space-y-2 border border-gray-700">
                <p>
                  <span className="font-bold text-gray-200">Name:</span>{" "}
                  {userData.membershipDetails.org_name}
                </p>

                <p className="text-sm flex items-center gap-2 text-gray-300">
                  <FaPhoneAlt /> {""}
                  {userData.membershipDetails.phone}
                </p>
                <p className="text-sm flex items-center gap-2 text-gray-300">
                  <FaMobile /> {userData.membershipDetails.mobile}
                </p>
                <p className="text-sm flex items-center gap-2 text-gray-300">
                  <FaEnvelope /> {userData.membershipDetails.email}
                </p>

                <div className="mt-3">
                  <p className="font-semibold text-gray-200">
                    Social Profile(s):
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sky-400 text-xl">
                    {userData.membershipDetails.facebook && (
                      <a
                        href={`${userData.membershipDetails.facebook}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaFacebookF />
                      </a>
                    )}
                    {userData.membershipDetails.twitter && (
                      <a
                        href={`${userData.membershipDetails.twitter}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaXTwitter />
                      </a>
                    )}
                    {userData.membershipDetails.linkedin && (
                      <a
                        href={`${userData.membershipDetails.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedinIn />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ✅ Corporate Members Accordion */}
          {userData.membershipDetails.mem_category?.toLowerCase() ===
            "corporate" &&
            userData.membershipDetails.members && (
              <div className="mt-8">
                <p className="text-xl font-semibold text-white mb-4 border-b pb-2 border-gray-600">
                  Corporate Members
                </p>
                <AccordionMembers
                  members={JSON.parse(
                    userData.membershipDetails.members
                  ).filter((m) => m.name)}
                />
              </div>
            )}
        </>
      ) : (
        <div className="bg-gray-900 p-6 rounded-lg text-red-400 border border-red-600">
          ❌ You have not taken any membership yet.
        </div>
      )}
    </motion.div>
  );
}

function AccordionMembers({ members }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-gray-700">
      {members.map((member, idx) => (
        <div key={idx} className="p-3">
          <button
            onClick={() => toggleAccordion(idx)}
            className="w-full flex justify-between items-center text-left text-white font-semibold focus:outline-none hover:text-primary transition"
          >
            <span>{member.name}</span>
            {openIndex === idx ? (
              <FaChevronUp className="text-primary" />
            ) : (
              <FaChevronDown className="text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-2 p-3 bg-gray-800 rounded-lg border border-gray-700"
              >
                <p className="text-gray-400 font-medium">
                  {member.designation || "No Designation"}
                </p>
                <p className="text-xs flex items-center gap-2 mt-1">
                  <FaEnvelope className="text-xs" /> {member.email || "N/A"}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaPhoneAlt className="text-xs" /> {member.mobile || "N/A"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
