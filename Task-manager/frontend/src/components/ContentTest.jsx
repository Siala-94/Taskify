import React, { useState, useEffect } from "react";
import axios from "axios";
import Divider from "./Divider.jsx";
import CalendarIcon from "../assets/icons/CalendarIcon.jsx";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon.jsx";
import ChevronRightIcon from "../assets/icons/ChevronRightIcon.jsx";
import AddTaskModal from "./AddTaskModal.jsx";
import AddSubTaskModal from "./AddSubTaskModal.jsx";

const Task = ({ task, reload, user, project }) => {
  console.log(task);
  const [isOpen, setIsOpen] = useState(false);
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zero
    const day = String(date.getDate()).padStart(2, "0"); // Pad day with zero

    return `${year}:${month}:${day}`;
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/task/delete/${task._id}`);
      console.log(`Task ${task._id} deleted successfully`);
      reload();
    } catch (error) {
      console.error(`Error deleting task ${task._id}:`, error);
    }
  };

  return (
    <li>
      <div className=" ml-5 mr-10  flex justify-">
        <div className=" flex bg-base-300/70  flex-row items-center border border-base-300/60 mt-2">
          <AddSubTaskModal
            user={user}
            project={project}
            reload={reload}
            parentTaskID={task._id}
          />
          <button
            className="btn btn-xs bg-base-100 border border-base-100 hover:bg-base-100 hover:text-primary hover:border-base-100 "
            onClick={handleToggle}
          >
            {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </button>
          <button className="flex  mt-2">
            <input
              className="checkbox ml-2"
              type="checkbox"
              onChange={handleDelete}
            />
          </button>
          <div className="flex flex-col ml-2">
            <span>{task.name}</span>
            <span className="text-xs w-36 overflow-hidden text-ellipsis whitespace-nowrap">
              {task.description}
            </span>
          </div>
          <div className="flex flex-row ml-10">
            <span className="badge text-xs flex items-center">
              <CalendarIcon />
              <span className="ml-1">{formatDate(task.dueDate)}</span>
            </span>
            <span className="badge text-xs ml-2">{task.assignedTo}</span>
            <span className="badge text-xs ml-2">{task.priority}</span>
          </div>
        </div>

        <div className="flex flex-row ">
          <div className="flex flex-col">
            <button className="btn btn-xs mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5"
              >
                <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
              </svg>
            </button>
            <button className="btn btn-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5"
              >
                <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z" />
              </svg>
            </button>
          </div>

          <span className=" text-secondary/30 justify-items-end bg-base-200">
            time
          </span>
        </div>
      </div>

      {/* Render subtasks if task is expanded */}
      {isOpen && task.subTask && task.subTask.length > 0 && (
        <ul className="ml-6">
          <div></div>

          {task.subTasks.map((subtask) => (
            <Task
              key={subtask._id}
              task={subtask}
              reload={reload}
              user={user}
              project={project}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const ContentTest = ({ user, project }) => {
  const [taskList, setTaskList] = useState([]);
  console.log(taskList);

  const populateTaskList = (tasks) => {
    const taskMap = new Map();

    // Initialize all tasks in the map
    tasks.forEach((task) => {
      taskMap.set(task._id, { ...task, subTasks: [] });
    });

    // Build the hierarchy of subtasks
    tasks.forEach((task) => {
      if (task.subTask && task.subTask.length > 0) {
        task.subTask.forEach((subTaskId) => {
          const subTask = taskMap.get(subTaskId);
          if (subTask) {
            taskMap.get(task._id).subTasks.push(subTask);
          }
        });
      }
    });

    // Determine the root tasks (tasks that are not subtasks of any other task)
    const nestedTasks = tasks
      .filter(
        (task) => !tasks.some((t) => t.subTask && t.subTask.includes(task._id))
      )
      .map((task) => taskMap.get(task._id));

    return nestedTasks;
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/task/get/allTasks/${project._id}`
      );
      const populatedTasks = populateTaskList(response.data);
      setTaskList(populatedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (project._id) {
      fetchTasks();
    }
  }, [project]);

  return (
    <div className="flex flex-col w-full">
      <div className="text-6xl ml-10">
        {project.name ? project.name : project}
      </div>
      <AddTaskModal user={user} project={project} reload={fetchTasks} />
      <div className="mt-4 w-full">
        <ul>
          {taskList.map((task) => (
            <Task
              key={task._id}
              task={task}
              reload={fetchTasks}
              user={user}
              project={project}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentTest;
