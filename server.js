import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import notes from "./routes/notes.js";
import { connectDB } from "./config/db.js";

dotenv.config({
  path: "./config/config.env",
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/notes", notes);

app.listen(3000, () => {
  try {
    connectDB();
    console.log("Server is running on port 3000");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit with failure.
    process.exit(1);
  }
});
