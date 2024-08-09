import React from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import Input from "../molecular/Input.jsx";

export default function TestModal(props) {
  const [showModal, setShowModal] = React.useState(false);

  // Function to close modal when clicking outside of it
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-backdrop") {
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
        {props.text}
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            id="modal-backdrop"
            onClick={handleOutsideClick}
          >
            <div className="card w-1/3">
              {/*content*/}
              <div
                className="card-body bg-neutral"
                onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
              >
                <span className="card-title"> Add project</span>
                <label className="input input-bordered flex gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="project name"
                  ></input>
                </label>

                <div className="card flex-row justify-end gap-3">
                  <button className="btn">cancel</button>
                  <button className="btn ">save</button>
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
