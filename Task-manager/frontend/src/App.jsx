import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import ApplicationPage from "./pages/ApplicationPage";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserById } from "./api/userApi";

const App = () => {
  const [user, setUser] = useState(null);

  const handleSetUser = async (u) => {
    try {
      const data = await getUserById(u.uid);
      setUser(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? handleSetUser(user) : setUser(null);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <ApplicationPage user={user} /> : <LandingPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/application/*"
          element={user ? <ApplicationPage user={user} /> : <LandingPage />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
