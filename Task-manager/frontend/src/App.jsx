import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import ApplicationPage from "./pages/ApplicationPage";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });
    return () => unsubscribe();
  }, [auth, user]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <ApplicationPage user={user} /> : <LandingPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/application"
          element={user ? <ApplicationPage user={user} /> : <LandingPage />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
