import React from "react";
import Divider from "./Divider";
import Modal from "../atomic/Modal.jsx";

const ContentTest = () => {
  return (
    <div className="w-full flex-col ">
      <h1 className="text-5xl text-left m-10"> inbox</h1>
      <Modal text="add task" />
    </div>
  );
};

export default ContentTest;
