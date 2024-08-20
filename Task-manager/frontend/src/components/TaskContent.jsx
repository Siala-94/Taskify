import React, { useState, useEffect } from "react";
import axios from "axios";
import { deleteTask } from "../api/taskApi";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon";
import ChevronRightIcon from "../assets/icons/ChevronRightIcon";
import CalendarIcon from "../assets/icons/CalendarIcon";

import TaskModal from "./TaskModal";
export const Task = ({
  task,
  reload,
  user,
  project,
  eHandler,
  handleSetCommentsIsOpen,
}) => {
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
    await deleteTask(task._id);
    reload();
    handleSetCommentsIsOpen(false);
  };

  const handleTaskClick = () => {
    eHandler(task); // Set the current task when clicked
    handleSetCommentsIsOpen(true);
  };
  const priorityClasses = {
    p1: "badge-error",
    p2: "badge-warning",
    p3: "badge-primary",
    p4: "badge-base-100",
    // Add more priorities here if needed
  };
  return (
    <>
      <li key={task._id}>
        <div className="ml-5 mr-10 w-5/6 flex">
          <div className="flex transition-transform duration-300 w-full bg-base-300/20 flex-row items-center mt-2">
            <TaskModal
              user={user}
              project={project}
              reload={reload}
              parentTaskID={task._id}
              type="subtask"
            />
            <div
              className=" bg-base-100 border border-base-100 hover:bg-base-100 hover:text-primary hover:border-base-100"
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
            </div>
            <input
              className="checkbox checkbox-sm ml-2"
              type="checkbox"
              onChange={handleDelete}
            />
            <div
              className="flex flex-row  hover:bg-neutral justify-between items-center gap-2 w-full bg-warning-primary border border-base-100 ml-2"
              onClick={handleTaskClick}
            >
              <div className="flex ml-7 flex-col gap-1">
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

                <span
                  className={`badge text-xs ml-2 ${
                    priorityClasses[task.priority] || ""
                  }`}
                >
                  ! {task.priority}
                </span>
              </div>
            </div>
            {project !== "Today" && project !== "Upcoming" && (
              <TaskModal
                user={user}
                taskID={task._id}
                project={project}
                reload={reload}
                currentTask={task}
                type="edit"
              ></TaskModal>
            )}
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
                handleSetCommentsIsOpen={handleSetCommentsIsOpen}
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
  handleSetCommentsIsOpen,
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
          handleSetCommentsIsOpen={handleSetCommentsIsOpen}
        />
      ))}
    </ul>
  );
};

export default TaskContent;
