"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
