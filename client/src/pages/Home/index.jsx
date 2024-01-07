import React from "react";

const Home = () => {
  return (
    <div className="container flex flex-col justify-center items-center gap-8 min-h-screen">
      <h1 className="text-6xl text-center font-bold text-blue-500">Noted</h1>
      <p className="text-2xl text-center text-gray-700">
        The best notes app in the world. You can write your notes here and
        access them from anywhere!
      </p>
    </div>
  );
};

export default Home;
