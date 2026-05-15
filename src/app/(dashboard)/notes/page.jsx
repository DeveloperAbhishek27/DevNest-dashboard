"use client";

import { useState } from "react";
import useNotes from "@/hooks/useNotes";

import CreateNoteModal from "@/components/dashboard/notes/CreateNoteModal";
import NoteCard from "@/components/dashboard/notes/NoteCard";
import ViewNoteModal from "@/components/dashboard/notes/ViewNoteModal";
import EditNoteModal from "@/components/dashboard/notes/EditNoteModal";
import DeleteNoteModal from "@/components/dashboard/notes/DeleteNoteModal";

const NotesPage = () => {
  const { notes, loading, updateNote, createNote, deleteNote } = useNotes();

  // CREATE
  const [openCreate, setOpenCreate] = useState(false);

  // VIEW
  const [viewNote, setViewNote] = useState(null);

  // EDIT
  const [editNote, setEditNote] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className="p-6 text-white">
      {/* HEADER */}
      <div
        className="
    flex
    flex-col
    sm:flex-row

    sm:items-center
    sm:justify-between

    gap-4

    mb-8
  "
      >
        {/* LEFT */}
        <div>
          <h1
            className="
        text-2xl
        sm:text-3xl
        md:text-4xl

        font-bold

        text-brand
        dark:text-white
      "
          >
            Notes
          </h1>

          <p
            className="
        text-sm
        sm:text-base

        text-gray-400

        mt-1
      "
          >
            Save your ideas & thoughts
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => setOpenCreate(true)}
          className="
      w-full
      sm:w-auto

      px-5
      sm:px-6

      py-3

      rounded-2xl

      bg-brand

      text-sm
      sm:text-base

      text-white
      font-semibold

      shadow-lg

      hover:opacity-90
      active:scale-[0.98]

      transition-all
      duration-300
    "
        >
          + Create Note
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[160px] rounded-3xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : notes?.length === 0 ? (
        <div className="text-center mt-20 text-gray-400">
          <h2 className="text-xl font-semibold">No Notes Yet</h2>
          <p className="text-sm mt-2">Create your first note to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onView={() => setViewNote(note)}
              onEdit={() => {
                setEditNote(note);
                setOpenEdit(true);
              }}
              onDelete={() => {
                setSelectedNote(note);
                setDeleteOpen(true);
              }}
            />
          ))}

          {openEdit && (
            <EditNoteModal
              open={openEdit}
              setOpen={setOpenEdit}
              note={editNote}
              updateNote={updateNote}
            />
          )}
        </div>
      )}

      {openCreate && (
        <CreateNoteModal
          open={openCreate}
          setOpen={setOpenCreate}
          createNote={createNote}
        />
      )}

      {/* VIEW MODAL */}
      {viewNote && <ViewNoteModal note={viewNote} setNote={setViewNote} />}
      {deleteOpen && (
        <DeleteNoteModal
          open={deleteOpen}
          setOpen={setDeleteOpen}
          note={selectedNote}
          deleteNote={deleteNote}
        />
      )}
    </div>
  );
};

export default NotesPage;
