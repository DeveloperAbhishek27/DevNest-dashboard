"use client";

import ProfileCard from "@/components/dashboard/ProfileCard";

import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, setUser } = useAuth();

  return <ProfileCard user={user} setUser={setUser} />;
}
