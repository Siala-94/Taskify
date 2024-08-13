import React, { useState } from "react";
import PlusIcon from "../assets/icons/PlusIcon";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity ${
        isOpen ? "visible bg-base-100/60 opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing modal
        className="modal-box relative bg-base-300 p-4 rounded-md shadow-md w-full max-w-md"
      >
        {children}
      </div>
    </div>
  );
};

const AddProjectModal = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleNewProject = async (e) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button
        className=" btn btn-xs hover:text-primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <PlusIcon />
        add project
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <form className="card-body" onSubmit={handleNewProject}>
          <div className="form-control">
            <input
              className="input input-bordered"
              placeholder="project name"
            ></input>
          </div>
        </form>

        <div className="hero flex justify-end">
          <button className="btn bg-base-100 " onClick={() => setIsOpen(false)}>
            cancel
          </button>
          <button className="btn bg-base-100 ml-6" type="submit">
            submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddProjectModal;
