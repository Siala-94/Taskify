import React, { useState } from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTaskForm = ({ eHandler, project, reload }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("p4");
  const [assignedTo, setAssignedTo] = useState("");
  const members = project.members;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      name: taskName,
      description: description,
      dueDate: dueDate,
      priority: priority,
      project: project._id,
    };

    try {
      const res = await axios.post("http://localhost:3000/task/add", taskData);
      console.log("Task added:", res.data);

      // Reset states after successful submission
      setTaskName("");
      setDescription("");
      setDueDate(new Date());
      setPriority("p4");
      setAssignedTo("");

      // Close the modal
      eHandler(false);

      // Reload the tasks or data
      reload();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  return (
    <form className="card-body" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          className="input input-bordered"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        />
      </div>
      <div className="form-control">
        <textarea
          className="textarea input-bordered"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>

      <div className="form-control">
        <input
          className="input input-bordered "
          type="date"
          placeholder="Date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
        />
      </div>

      <div className="form-control">
        <select
          className="select input-bordered"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        >
          <option>p1</option>
          <option>p2</option>
          <option>p3</option>
          <option selected>p4</option>
        </select>
      </div>

      <div className="form-control">
        assign task to
        <select
          className="select input-bordered"
          placeholder="assign task to"
          value={assignedTo}
          onChange={(e) => {
            setAssignedTo(e.target.value);
          }}
        >
          <option selected default></option>
          <option>hassan</option>
        </select>
      </div>

      <div className="hero flex justify-end mt-4">
        <button
          className="btn bg-base-100"
          type="button"
          onClick={() => eHandler(false)}
        >
          cancel
        </button>
        <button className="btn bg-base-100 ml-6" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};

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

const AddTaskModal = ({ user, project, reload }) => {
  const [isOpen, setIsOpen] = useState(false);

  const URL = "http://localhost:3000";

  const handleNewProject = async (e) => {
    e.preventDefault();
    const members = [user._id];
    try {
      const res = await axios.post(`${URL}/task/add`, {
        name: taskName,
        members: members,
      });

      setIsOpen(false); // Close the modal after submission
      setTaskName(""); // Reset the project name input
      reload(); // Call the reload function to refresh the project list
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
        add task
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <AddTaskForm eHandler={setIsOpen} project={project} reload={reload} />
      </Modal>
    </>
  );
};

export default AddTaskModal;
