import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please provide a user id"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxlength: [40, "Title cannot be more than 40 characters"],
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, "Description cannot be more than 200 characters"],
  },
  color: {
    type: String,
    default: "#ffffff",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Note", NoteSchema);
