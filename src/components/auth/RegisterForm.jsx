"use client";

import { useState } from "react";

import Link from "next/link";

import { motion } from "framer-motion";

import { fadeInUp } from "@/animations";

import { useRouter } from "next/navigation";

import CountrySelect from "@/components/common/CountrySelect";

import {
  User,
  Mail,
  Phone,
  LockKeyhole,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import "@/styles/animations.css";

import OTPVerification from "@/components/auth/OTPVerification";

import { errorToast, successToast } from "../alert/notify";

import api from "@/services/api";

const RegisterForm = () => {
  const router = useRouter();

  const [country, setCountry] = useState("");

  const [showOTP, setShowOTP] = useState(false);

  const [generatedOTP, setGeneratedOTP] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      // agar koi letter ya symbol type kare
      if (/[^0-9]/.test(value)) {
        errorToast("Only numbers are allowed in mobile");
      }

      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // VALIDATION
  const validateForm = () => {
    let newErrors = {};

    // NAME
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // EMAIL
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // MOBILE
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    // COUNTRY
    if (!country) {
      newErrors.country = "Please select country";
    }

    // PASSWORD
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // CONFIRM PASSWORD
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    // Optional: show first error toast only
    const firstError = Object.values(newErrors)[0];
    if (firstError) errorToast(firstError);

    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATE FORM
    const isValid = validateForm();

    if (!isValid) return;

    try {
      const response = await api.post("/api/auth/send-otp", {
        email: formData.email,
        mobile: formData.mobile,
      });

      setGeneratedOTP(response.data.otp);

      setShowOTP(true);

      successToast("OTP sent successfully");
    } catch (error) {
      errorToast(error.response?.data?.message || "Something went wrong");
    }
  };

  // OTP SCREEN
  if (showOTP) {
    return (
      <OTPVerification
        otp={generatedOTP}
        formData={{
          ...formData,
          country,
        }}
      />
    );
  }

  return (
    <section className="min-h-screen px-6 py-10 lg:px-16 flex items-center relative">
      {/* HOME LINK */}
      <Link
        href="/"
        className="
    absolute
    top-6
    left-6

    h-11
    w-11

    flex
    items-center
    justify-center

    rounded-2xl

    bg-white/10
    backdrop-blur-xl

    border
    border-white/10

    text-white

    hover:bg-brand
    hover:scale-105

    transition-all
    duration-300
  "
      >
        <ArrowLeft size={20} />
      </Link>

      <main className="w-full grid lg:pt-0 pt-14 grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="text-white pt-10">
          <h1 className="text-5xl fade-in-up lg:text-7xl font-black leading-tight tracking-tight">
            Manage Your
            <span className="block text-brand">Workspace.</span>
          </h1>

          <p className="mt-8 text-lg fade-in-up-soft leading-9 text-gray-300 max-w-xl">
            Sign in to your personal dashboard to manage tasks, organize keep
            notes, update your profile, and stay productive in one secure
            workspace.
          </p>
        </div>

        {/* FORM */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl "
        >
          <form onSubmit={handleSubmit} className="space-y-6 p-2 sm:p-8">
            {/* NAME */}
            <div>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-200"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border-b border-white/20 bg-transparent py-3 pl-8 text-white outline-none placeholder:text-gray-300 focus:border-brand transition-all"
                />
              </div>

              {errors.name && (
                <p className="text-red-400 text-sm mt-2">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-200"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border-b border-white/20 bg-transparent py-3 pl-8 text-white outline-none placeholder:text-gray-300 focus:border-brand transition-all"
                />
              </div>

              {errors.email && (
                <p className="text-red-400 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            {/* COUNTRY + MOBILE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* COUNTRY */}
              <div>
                <CountrySelect
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />

                {errors.country && (
                  <p className="text-red-400 text-sm mt-2">{errors.country}</p>
                )}
              </div>

              {/* MOBILE */}
              <div>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-200"
                  />

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    className="w-full border-b border-white/20 bg-transparent py-3 pl-8 text-white outline-none placeholder:text-gray-300 focus:border-brand transition-all"
                  />
                </div>

                {errors.mobile && (
                  <p className="text-red-400 text-sm mt-2">{errors.mobile}</p>
                )}
              </div>
            </div>

            {/* PASSWORDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PASSWORD */}
              <div>
                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-200"
                  />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full border-b border-white/20 bg-transparent py-3 pl-8 text-white outline-none placeholder:text-gray-300 focus:border-brand transition-all"
                  />
                </div>

                {errors.password && (
                  <p className="text-red-400 text-sm mt-2">{errors.password}</p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <div className="relative">
                  <ShieldCheck
                    size={18}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-200"
                  />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full border-b border-white/20 bg-transparent py-3 pl-8 text-white outline-none placeholder:text-gray-300 focus:border-brand transition-all"
                  />
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* BUTTON */}
            <div className="pt-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -2 }}
                type="submit"
                className="w-full bg-brand py-4 rounded font-semibold text-white shadow-lg shadow-brand/30"
              >
                Create Account
              </motion.button>
            </div>

            {/* LOGIN LINK */}
            <p className="text-center text-gray-300 pt-2">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-brand font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </main>
    </section>
  );
};

export default RegisterForm;
