import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import ApplicationPage from "./pages/ApplicationPage";
import { Link } from "react-router-dom";
const App = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <Link to="/" className=" text-primary text-3xl">
          Taskify
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/application" element={<ApplicationPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
