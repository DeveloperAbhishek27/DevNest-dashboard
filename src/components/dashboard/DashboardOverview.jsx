"use client";

import { useAuth } from "@/context/AuthContext";
import useNotes from "@/hooks/useNotes";
import { FileText, Loader } from "lucide-react";

const DashboardOverview = () => {
  const { user } = useAuth();
  const { notes, loading } = useNotes();

  return (
    <section>
      {/* HEADER */}
      <h1 className="text-3xl font-black text-black dark:text-white">
        Welcome Back, {user?.name}
      </h1>

      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Here is your real dashboard overview
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* NOTES (REAL DATA) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10">
          <div className="flex items-center justify-between">
            <FileText className="text-brand" size={22} />
            <span className="text-xs text-gray-500">
              {loading ? "Loading..." : "Live"}
            </span>
          </div>

          <p className="mt-4 text-4xl font-black text-black dark:text-white">
            {loading ? (
              <Loader className="animate-spin" size={28} />
            ) : (
              notes?.length || 0
            )}
          </p>

          <h2 className="text-sm text-gray-500 mt-1">Total Notes</h2>
        </div>

        {/* PLACEHOLDER (NO FAKE DATA) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10">
          <p className="text-gray-500 text-sm">Projects (Coming soon)</p>
          <p className="mt-4 text-2xl font-bold text-gray-400">—</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10">
          <p className="text-gray-500 text-sm">Tasks (Coming soon)</p>
          <p className="mt-4 text-2xl font-bold text-gray-400">—</p>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;
