import React, { useState } from "react";
import axios from "axios";

import TrashIcon from "../assets/icons/TrashIcon";

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

const RemoveMemberModal = ({ projectID, memberID, reload, eHandle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const URL = "http://localhost:3000";

  const handleRemoveMember = async (e) => {
    e.preventDefault();

    try {
      console.log(projectID);
      const res = await axios.put(`${URL}/project/delete/member`, {
        projectId: projectID,
        memberId: memberID,
      });
      setIsOpen(false); // Close the modal after submission
      reload();
      eHandle();
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
        <TrashIcon />
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <form className="card-body" onSubmit={handleRemoveMember}>
          <div className="form-control">
            Are you sure you want to remove this member?
          </div>
          <div className="hero flex justify-end mt-4">
            <button className="btn bg-base-100 ml-6" type="submit">
              delete
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default RemoveMemberModal;
