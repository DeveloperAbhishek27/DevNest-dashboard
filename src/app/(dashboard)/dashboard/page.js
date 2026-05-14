"use client";

import DashboardOverview from "@/components/dashboard/DashboardOverview";

import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return <DashboardOverview user={user} />;
}
