import React from "react";
import { Link } from "react-router-dom";
const Logo = (props) => {
  return (
    <div className={`navbar ${props.base} w-1/5`}>
      <Link to="/" className=" text-primary text-3xl">
        Taskify
      </Link>
    </div>
  );
};

export default Logo;
