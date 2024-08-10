import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../atomic/Logo.jsx";
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const SaveUserToDB = async (uid, email) => {
    try {
      await axios.post("http://localhost:3000/register/add", {
        firebaseUid: uid,
        email: email,
        projects: [],
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("creating user");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("added user");
      const user = userCredential.user;
      console.log(user);
      alert("Account created successfully!");
      await SaveUserToDB(user.uid, user.email);
      alert("User saved to database!");
      navigate("/"); // Use navigate to redirect to the login page
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  return (
    <>
      <Logo base="bg-base-100" />
      <div className="hero bg-base-100 min-h-screen">
        <div className="hero-content w-5/6 flex-col ">
          <div className="card bg-base-100 text-center w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <form className="card-body" onSubmit={handleSignUp}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Create an account
                </button>
              </div>
              <p>
                Already have an account?
                <Link to="/" className="link">
                  sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
