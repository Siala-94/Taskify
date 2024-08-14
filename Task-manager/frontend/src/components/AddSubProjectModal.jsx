import React, { useState } from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
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

const AddSubProjectModal = ({ user, projectID, reload }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const URL = "http://localhost:3000";

  const handleNewProject = async (e) => {
    e.preventDefault();

    const members = [user._id];
    try {
      const res = await axios.post(
        `${URL}/project/addSubProject/${projectID}`,
        {
          name: projectName,
          members: members,
        }
      );

      setIsOpen(false); // Close the modal after submission
      setProjectName(""); // Reset the project name input
      reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        className=" hover:text-primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <PlusIcon />
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
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          </div>
          <div className="hero flex justify-end mt-4">
            <button
              className="btn bg-base-100"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              cancel
            </button>
            <button className="btn bg-base-100 ml-6" type="submit">
              submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddSubProjectModal;
