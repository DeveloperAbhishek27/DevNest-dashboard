"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

const useCountries = () => {
  const [countries, setCountries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/countries");
        console.log("countries state:", countries);
        setCountries(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return {
    countries,
    loading,
    error,
  };
};

export default useCountries;
