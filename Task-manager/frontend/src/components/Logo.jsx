import React from "react";

const Logo = ({ handleLinkClick }) => {
  return (
    <div className="navbar bg-base-300">
      <button
        className="btn flex hover:bg-base-100 items-center bg-base-300 border-base-300 text-primary text-3xl"
        onClick={handleLinkClick}
      >
        Taskify
      </button>
    </div>
  );
};

export default Logo;
