"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import DashboardHeader from "@/components/dashboard/DashboardHeader";

import DashboardSidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const { user, logout } = useAuth();

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
          user={user}
          setCollapsed={setCollapsed}
        />

        {/* MAIN */}
        <main
          className={`p-4 sm:p-6 transition-all duration-200

          ml-[80px]
          ${collapsed ? "lg:ml-[90px]" : "lg:ml-[280px]"}
          `}
        >
          <DashboardHeader user={user} handleLogout={handleLogout} />

          <div className="mt-10">{children}</div>
        </main>
      </section>
    </ProtectedRoute>
  );
}
