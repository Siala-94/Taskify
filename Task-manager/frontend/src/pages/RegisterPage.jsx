import React from "react";
import { Link } from "react-router-dom";
const RegisterPage = () => {
  return (
    <>
      <div className="hero bg-base-100 min-h-screen">
        <div className="hero-content w-5/6 flex-col ">
          <div className="card bg-base-100 text-center  w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-2xl font-bold ">Create an account</h1>
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
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
                  required
                />
                <label className="label">
                  <span className="label-text"> Confirm password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Create an account</button>
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
