import React, { useState, useEffect } from "react";
import axios from "axios";
import AddSubTaskModal from "./AddSubTaskModal";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon";
import ChevronRightIcon from "../assets/icons/ChevronRightIcon";
import CalendarIcon from "../assets/icons/CalendarIcon";
import EditTaskModal from "./EditTaskModal";
export const Task = ({ task, reload, user, project, eHandler }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

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

  const handleTaskClick = () => {
    eHandler(task); // Set the current task when clicked
  };

  return (
    <>
      <li key={task._id}>
        <div className="ml-5 mr-10 w-full flex">
          <div className="flex w- full bg-base-300/20 flex-row items-center mt-2">
            <AddSubTaskModal
              user={user}
              project={project}
              reload={reload}
              parentTaskID={task._id}
            />
            <button
              className="btn btn-xs bg-base-100 border border-base-100 hover:bg-base-100 hover:text-primary hover:border-base-100"
              onClick={handleToggle}
            >
              {isOpen ? (
                <>
                  <ChevronDownIcon />
                </>
              ) : (
                <>
                  <ChevronRightIcon />
                </>
              )}
            </button>

            <button
              className="flex flex-row justify-start btn w-full bg-warning-primary border border-base-100 ml-2"
              onClick={handleTaskClick}
            >
              <input
                className="checkbox checkbox-sm ml-2"
                type="checkbox"
                onChange={handleDelete}
              />
              <div className="flex flex-col gap-1">
                {" "}
                <span className="text-lg">{task.name}</span>
                <span className="text-xs w-20 overflow-hidden text-ellipsis whitespace-nowrap">
                  {task.description}
                </span>
              </div>

              <div className="flex flex-row ml-10">
                <span className="indicator-itembadge text-xs flex items-center">
                  <CalendarIcon />{" "}
                  {task.dueDate ? (
                    <>
                      <span className="ml-1">{formatDate(task.dueDate)}</span>
                    </>
                  ) : (
                    <></>
                  )}
                </span>
                <span className="badge bg-base-200 text-xs ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>

                  {task.assignedTo ? <>{task.assignedTo}</> : {}}
                </span>

                <span className="badge text-xs ml-2">! {task.priority}</span>
              </div>
            </button>
            <EditTaskModal
              taskID={task._id}
              project={project}
              reload={reload}
            ></EditTaskModal>
          </div>
        </div>

        {isOpen && task.subTasks && task.subTasks.length > 0 && (
          <ul className="ml-6">
            {task.subTasks.map((subtask) => (
              <Task
                key={subtask._id}
                task={subtask}
                reload={reload}
                user={user}
                project={project}
                eHandler={eHandler}
              />
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

const TaskContent = ({
  taskList,
  fetchTasks,
  user,
  project,
  handleTaskSelection,
}) => {
  return (
    <ul className="w-full">
      {taskList.map((task) => (
        <Task
          key={task._id}
          task={task}
          reload={fetchTasks}
          user={user}
          project={project}
          eHandler={handleTaskSelection}
        />
      ))}
    </ul>
  );
};

export default TaskContent;
