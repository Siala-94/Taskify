import React from "react";

const ModalButton = () => {
  return (
    <button
      htmlFor="my_modal_7"
      className="btn btn-xs border-base-100 bg-base-100 hover:text-primary hover:bg-base-100 justify-start ml-4 "
    >
      <PlusIcon />
      {props.text}
    </button>
  );
};

export default ModalButton;
