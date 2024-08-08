import React from "react";

const Input = (props) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <input
        type={`${props.type}`}
        className="grow"
        placeholder={props.placeholder}
      />
    </label>
  );
};

export default Input;
