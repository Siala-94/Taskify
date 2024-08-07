import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="hero bg-base-100 min-h-screen">
        <div className="hero-content flex-col ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Sign in to start managing your tasks and projects today!
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
                  <Link to="/registe" className="label-text-alt link link-hove">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <Link to="/application" className="btn btn-primary">
                  Login
                </Link>
              </div>
              <p>
                don't have an account?
                <Link to="/register" className="link">
                  Register now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
