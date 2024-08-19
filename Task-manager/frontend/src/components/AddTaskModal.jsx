import React, { useState, useEffect } from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import axios from "axios";

const AddTaskForm = ({ user, eHandler, project, reload }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("p4");
  const [selectedProject, setSelectedProject] = useState(project?._id || "");
  const [listOfProject, setListOfProjects] = useState([]);

  useEffect(() => {
    if (project) {
      setSelectedProject(project._id || "");
    } else {
      setSelectedProject(""); // or set to a default value like "Inbox"
    }
  }, [project]);

  useEffect(() => {
    const populateListOfProjects = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/project/get/${user._id}`
        );
        setListOfProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    populateListOfProjects();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      name: taskName,
      description: description,
      dueDate: dueDate,
      priority: priority,
      comments: [],
      project: selectedProject === "Inbox" ? null : selectedProject,
      members: project?.members ? project.members : [user._id], // Handle undefined project
    };

    try {
      const res = await axios.post("http://localhost:3000/task/add", taskData);
      console.log("Task added:", res.data);

      // Reset states after successful submission
      setTaskName("");
      setDescription("");
      setDueDate("");
      setPriority("p4");
      setSelectedProject(project?._id || "");

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
          <option value="p1">p1</option>
          <option value="p2">p2</option>
          <option value="p3">p3</option>
          <option value="p4">p4</option>
        </select>
      </div>

      <div className="form-control">
        choose project
        <select
          className="select input-bordered"
          value={selectedProject}
          onChange={(e) => {
            setSelectedProject(e.target.value);
          }}
        >
          {/* Default selected project */}
          {project && <option value={project._id}>{project.name}</option>}
          <option value="Inbox">Inbox</option>
          {listOfProject
            .filter((lp) => lp._id !== project?._id) // Filter out the current project
            .map((lp) => (
              <option key={lp._id} value={lp._id}>
                {lp.name}
              </option>
            ))}
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

  return (
    <>
      <button
        className="btn ml-7 justify-start btn-xs bg-base-100 border-base-100 hover:bg-base-100 hover:border-base-100 hover:text-primary"
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
        <AddTaskForm
          user={user}
          eHandler={setIsOpen}
          project={project}
          reload={reload}
        />
      </Modal>
    </>
  );
};

export default AddTaskModal;
