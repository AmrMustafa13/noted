import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const handleDeleteNote = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      }
    );

    const data = await res.json();

    setNotes(notes.filter((note) => note._id !== id));

    if (data.success) {
      toast.success("Note deleted");
    }
  };

  const getAllNotes = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      }
    );

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setNotes(data.data);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container py-8 flex flex-col gap-4">
      {notes.length === 0 && (
        <h1 className="text-2xl  font-bold">No notes found</h1>
      )}

      <div className=" flex flex-wrap gap-4 p-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="flex flex-col gap-4 p-4 items-center justify-center rounded-md  text-gray-800"
            style={{ backgroundColor: note.color }}
          >
            <h1 className="text-2xl font-bold">{note.title}</h1>
            <p className="text-xl">{note.description}</p>
            <button>
              <Link
                to={`/notes/update/${note._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update Note
              </Link>
            </button>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleDeleteNote(note._id)}
            >
              Delete Note
            </button>
          </div>
        ))}
      </div>

      <button>
        <Link
          to="/notes/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Note
        </Link>
      </button>
    </div>
  );
};

export default Notes;
