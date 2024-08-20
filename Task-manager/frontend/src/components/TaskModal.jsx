import React, { useState, useEffect } from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import axios from "axios";
import { addSubTask, editTask } from "../api/taskApi";
import { getProjectByUserObjectId } from "../api/projectApi";
const TaskForm = ({
  user,
  eHandler,
  project,
  reload,
  currentTask = "",
  parentTaskID = "",
}) => {
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
      const responseData = await getProjectByUserObjectId(user._id);
      setListOfProjects(responseData);
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
      members: project?.members || [user._id], // Handle undefined project
    };

    const res = currentTask
      ? await editTask(currentTask._id, taskData)
      : await addSubTask(parentTaskID, taskData);

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
  };

  return (
    <form className="card-body" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          className="input input-bordered"
          placeholder={currentTask.name}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <textarea
          className="textarea input-bordered"
          placeholder={currentTask.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-control">
        <input
          className="input input-bordered"
          type="date"
          value={dueDate || currentTask.date || ""}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="form-control">
        <select
          className="select input-bordered"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
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
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          {project && <option value={project._id}>{project.name}</option>}
          <option value="Inbox">Inbox</option>
          {listOfProject
            .filter((lp) => lp._id !== project?._id)
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

const TaskModal = ({
  user,
  project,
  reload,
  currentTask = "",
  parentTaskID = "",
  type,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getButtonLabel = () => {
    switch (type) {
      case "subtask":
        return (
          <>
            <PlusIcon /> Add Subtask
          </>
        );
      case "edit":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        );
      case "add":
      default:
        return (
          <>
            <PlusIcon /> Add Task
          </>
        );
    }
  };
  return (
    <>
      <button
        className="btn justify-start btn-xs bg-base-100 border-base-100 hover:bg-base-100 hover:border-base-100 hover:text-primary"
        onClick={() => setIsOpen(true)}
      >
        {getButtonLabel(type)}
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TaskForm
          user={user}
          eHandler={setIsOpen}
          project={project}
          reload={reload}
          currentTask={currentTask}
          parentTaskID={parentTaskID}
        />
      </Modal>
    </>
  );
};

export default TaskModal;
