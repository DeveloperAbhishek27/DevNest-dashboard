import { useEffect, useState } from "react";

import api from "@/services/api";

let globalUser = null;

if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    globalUser = JSON.parse(storedUser);
  }
}

let listeners = [];

const useProfile = () => {
  const [user, setUserState] = useState(globalUser);

  const setUser = (data) => {
    globalUser = data;

    localStorage.setItem("user", JSON.stringify(data));

    listeners.forEach((cb) => cb(data));
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");

      globalUser = res.data.user;

      localStorage.setItem("user", JSON.stringify(globalUser));

      setUserState(globalUser);

      listeners.forEach((cb) => cb(globalUser));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    listeners.push(setUserState);

    if (!globalUser) fetchProfile();
    else setUserState(globalUser);

    return () => {
      listeners = listeners.filter((l) => l !== setUserState);
    };
  }, []);

  return {
    user,
    setUser,
    fetchProfile,
  };
};

export default useProfile;
