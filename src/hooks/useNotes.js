"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH NOTES
  const fetchNotes = async () => {
    try {
      setLoading(true);

      const res = await api.get("/notes");

      setNotes(res.data.notes);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE NOTE
  const createNote = async (data) => {
    const res = await api.post("/notes/create", data);

    setNotes((prev) => [res.data.note, ...prev]);

    return res.data.note;
  };

  // UPDATE NOTE (IMPORTANT FIX)
  const updateNote = async (id, data) => {
    const res = await api.put(`/notes/${id}`, data);

    const updatedNote = res.data.note;

    setNotes((prev) =>
      prev.map((note) => (note._id === id ? updatedNote : note)),
    );

    return updatedNote;
  };

  // DELETE NOTE (optional but useful)
  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`);

    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  };
};

export default useNotes;
