import React from "react";
import { Link } from "react-router-dom";
const Logo = ({ handleLinkClick }) => {
  return (
    <div className="navbar bg-base-300">
      <button
        onClick={() => {
          handleLinkClick();
        }}
        className="btn flex hover:bg-base-100 items-center bg-base-300 border-base-300 text-primary text-3xl"
      >
        Taskify
      </button>
    </div>
  );
};

export default Logo;
