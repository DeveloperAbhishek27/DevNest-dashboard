import api from "@/services/api";
import { useState } from "react";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const updateProfile = async ({ name, mobile, imageFile }) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);

      formData.append("mobile", mobile);

      if (imageFile) {
        formData.append("profilePicture", imageFile);
      }

      const response = await api.put("/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    loading,
  };
};
