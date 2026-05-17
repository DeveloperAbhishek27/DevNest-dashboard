"use client";

import Link from "next/link";

import { useState } from "react";

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { fadeInUp } from "@/animations";

import api from "@/services/api";

import { errorToast, successToast } from "../alert/notify";
import { ArrowLeft } from "lucide-react";
import "@/styles/animations.css";
import ForgotPasswordModal from "./ForgotPasswordModal";

const LoginForm = () => {
  const router = useRouter();

  const { fetchUser } = useAuth();
  const [openForgot, setOpenForgot] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      successToast(response.data);

      localStorage.setItem("token", response.data.token);

      await fetchUser();

      successToast("Login Successful");

      router.push("/dashboard");
    } catch (error) {
      console.log(error);

      errorToast(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-6 py-10 lg:px-16 flex items-center justify-center">
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
      <main className="w-full grid  lg:pt-0 pt-14 grid-cols-1 lg:grid-cols-2 gap-16 justify-center items-center">
        <div className="text-white">
          <h1 className="text-5xl font-heading text-stroke  tracking-[1px]  fade-in-up lg:text-7xl font-black leading-tight ">
            Access Your
            <span className="block text-brand">Dashboard.</span>
          </h1>

          <p className="mt-8 text-lg fade-in-up-soft leading-9 text-gray-300 max-w-xl">
            Login to manage your tasks, keep notes, profile, and everything
            inside your personal workspace.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full fade-in-up  max-w-xl p-2 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border-b border-white/50 bg-transparent py-3 text-white outline-none placeholder:text-gray-300 focus:border-brand transition-all"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border-b border-white/50 bg-transparent py-3 text-white outline-none placeholder:text-gray-300 focus:border-brand transition-all"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpenForgot(true)}
                className="text-sm text-gray-300 hover:text-brand transition-all"
              >
                Forgot Password?
              </button>
            </div>

            {/* BUTTON */}
            <div className="pt-6">
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                type="submit"
                disabled={loading}
                className="w-full bg-brand py-4 rounded font-semibold text-white"
              >
                {loading ? "Logging in..." : "Login"}
              </motion.button>
            </div>

            {/* REGISTER LINK */}
            <p className="text-center text-gray-300 pt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-brand font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </main>
      <ForgotPasswordModal open={openForgot} setOpen={setOpenForgot} />
    </section>
  );
};

export default LoginForm;
