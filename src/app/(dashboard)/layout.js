"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import DashboardHeader from "@/components/dashboard/DashboardHeader";

import DashboardSidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, []);

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();

    router.push("/login");
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
        />

        {/* MAIN */}
        <main
          className={`p-6 transition-all duration-200

         sm:ml-[66px]
          lg:${collapsed ? "ml-[90px]" : "ml-[280px]"}
          `}
        >
          <DashboardHeader
            handleLogout={handleLogout}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setOpen={setOpen}
          />

          <div className="mt-10">{children}</div>
        </main>
      </section>
    </ProtectedRoute>
  );
}
