"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import DashboardHeader from "@/components/dashboard/DashboardHeader";

import DashboardSidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { errorToast, successToast } from "@/components/alert/notify";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, []);

  const [collapsed, setCollapsed] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false,
  );

  const handleLogout = () => {
    logout();

    router.push("/login");
  };

  const handleDeleteAccount = async (email) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/delete-account`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("token");

        logout();

        successToast(data.message);

        router.push("/register");
      } else {
        errorToast(data.message);
      }
    } catch (error) {
      console.log(error);

      errorToast("Something went wrong");
    }
  };

  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-white dark:bg-homeBg">
        {/* SIDEBAR */}
        <DashboardSidebar
          handleLogout={handleLogout}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          open={open}
          setOpen={setOpen}
          handleDeleteAccount={handleDeleteAccount}
        />

        {/* MAIN */}
        <main
          className={`p-6 transition-all duration-200
         ml-0

    ${collapsed ? "lg:ml-[90px] sm:ml-[80px]" : "lg:ml-[300px] sm:ml-[80px]"}
          `}
        >
          <DashboardHeader
            handleLogout={handleLogout}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setOpen={setOpen}
            open={open}
          />

          <div className="mt-10">{children}</div>
        </main>
      </section>
    </ProtectedRoute>
  );
}
