import React, { useState } from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import Input from "../molecular/Input.jsx";

export default function TestModal({ projectId, addProject }) {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      setShowModal(false);
    }
  };

  const handleSave = () => {
    if (projectName.trim()) {
      addProject(projectId, projectName);
      setProjectName("");
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        className=" bg-base-neutral text-left text-primary flex justify-start"
        onClick={() => setShowModal(true)}
      >
        <PlusIcon />
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            id="modal-backdrop"
            onClick={handleOutsideClick}
          >
            <div className="card w-1/3">
              <div
                className="card-body bg-neutral"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="card-title">Add project</span>
                <label className="input input-bordered flex gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </label>

                <div className="card flex-row justify-end gap-3">
                  <button className="btn" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className="btn" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
