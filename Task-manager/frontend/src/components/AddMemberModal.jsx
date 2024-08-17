import React, { useState } from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import axios from "axios";
import TrashIcon from "../assets/icons/TrashIcon";
import { useNavigate } from "react-router-dom";

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

const AddMemberModal = ({ project, reload, eHandle, handleSetProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberList, setMemberList] = useState([]);
  const navigate = useNavigate(); // Correctly using useNavigate here
  const URL = "http://localhost:3000";

  console.log(memberList);

  const handleNewMembers = async (e) => {
    e.preventDefault();

    let listOfMemberIDs = [];
    try {
      for (const member of memberList) {
        const res = await axios.get(`${URL}/email/${member}`);
        listOfMemberIDs.push(res.data._id);
      }
    } catch (error) {
      console.error(error);
    }
    try {
      const res = await axios.post(`${URL}/project/add/member`, {
        projectId: project._id,
        memberIds: listOfMemberIDs,
      });

      setIsOpen(false); // Close the modal after submission
      setMemberName(""); // Reset the project name input
      eHandle(false);

      navigate("/"); // Now navigate should work
      console.log("ja");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        className="btn justify-start btn-xs bg-base-300 border-base-300 hover:text-primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <PlusIcon />
        add member
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <form className="card-body" onSubmit={handleNewMembers}>
          <div className="form-control flex flex-row">
            <input
              className="input w-full input-bordered"
              placeholder="email"
              value={memberName}
              onChange={(e) => {
                setMemberName(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => {
                setMemberList([...memberList, memberName]);
                setMemberName("");
              }}
            >
              <PlusIcon />
            </button>
          </div>
          <div className="flex flex-row gap-2">
            {memberList.map((member, index) => {
              return (
                <div key={index} className="badge">
                  {member}{" "}
                  <button
                    onClick={() =>
                      setMemberList(
                        memberList.filter((_, i) => i !== index) // Corrected usage of index
                      )
                    }
                    className=""
                  >
                    <TrashIcon />
                  </button>
                </div>
              );
            })}
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

export default AddMemberModal;
