import React from "react";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import UpdateNote from "./pages/UpdateNote";
import PrivateRoutes from "./utils/PrivateRoutes";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/create" element={<CreateNote />} />
          <Route path="/notes/update/:id" element={<UpdateNote />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
