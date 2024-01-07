import React, { useRef } from "react";
import { useAuth } from "../../contexts/auth";

const Register = () => {
  const registerRef = useRef(null);

  const { registerUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(registerRef.current);
    const data = Object.fromEntries(formData);
    registerUser(data);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
      <h1 className="text-3xl text-center font-bold text-blue-500">Register</h1>
      <form
        onSubmit={handleSubmit}
        ref={registerRef}
        className="flex flex-col justify-center gap-4 container"
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="border border-gray-400 px-4 py-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="border border-gray-400 px-4 py-2 rounded-md"
        />
        <button
          type="submit"
          className="border border-gray-400 px-4 py-2 rounded-md bg-blue-500 text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
