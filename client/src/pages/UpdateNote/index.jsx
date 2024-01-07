import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";

const UpdateNote = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff");

  const { user } = useAuth();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const note = {
      title,
      description,
      color,
    };

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify(note),
      }
    );

    const data = await res.json();

    if (data.success) {
      setTitle("");
      setDescription("");
      setColor("#ffffff");
      toast.success("Note created");
      navigate("/notes");
    }

    if (!data.success) {
      toast.error(data.error);
    }
  };

  const getNote = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`,
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
      setTitle(data.data.title);
      setDescription(data.data.description);
      setColor(data.data.color);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-4 p-4 min-h-screen items-center justify-center">
      <form className="flex flex-col gap-4 container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-100 px-4 py-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-100 px-4 py-2 rounded-md"
        />

        <select
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="bg-gray-100 px-4 py-2 rounded-md"
        >
          <option value="#ffffff">White</option>
          <option value="#ff0000">Red</option>
          <option value="#00ff00">Green</option>
          <option value="#0000ff">Blue</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};

export default UpdateNote;
