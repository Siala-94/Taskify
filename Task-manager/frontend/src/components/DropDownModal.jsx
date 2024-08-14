import React, { useState } from "react";
import EllipsisVertical from "../assets/icons/EllipsisVertical";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex  items-center transition-opacity ${
        isOpen ? "visible   " : "invisible opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing modal
        className="bg-base-200 mt-20 p-4 rounded-md "
      >
        {children}
      </div>
    </div>
  );
};

const DropDownModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="btn justify-start btn-xs bg-base-300 border-base-300 hover:text-primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <EllipsisVertical />
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default DropDownModal;
