import React, { useState, useEffect } from "react";
import Divider from "./Divider.jsx";
import Modal from "../atomic/Modal.jsx";
import TestModal from "./TestModal.jsx";
import CalendarIcon from "../assets/icons/CalendarIcon.jsx";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon.jsx";
import ChevronRightIcon from "../assets/icons/ChevronRightIcon.jsx";
import AddProjectModal from "./AddProjectModal.jsx";

const SubTask = (props) => {
  return (
    <>
      <div className="border-base-300 ml-10 mr-10 flex justify-between pl-10">
        <div className="flex flex-row">
          <span className="badge text-xs">9</span>
          <input className="checkbox ml-2"></input>
          <div className="flex flex-col ml-2">
            <span>{props.taskName ? props.taskName : "task"}</span>
            <span className="text-xs">
              {props.description ? props.description : "description"}
            </span>
          </div>
          <div className="flex flex-row ml-10">
            <span className="badge text-xs flex items-center">
              <CalendarIcon />
              <span className="ml-1">{props.date ? props.date : "date"}</span>
            </span>
            <span className="badge text-xs ml-2">
              {props.assignedTo ? props.assignedTo : "assignedTo"}
            </span>
            <span className="badge text-xs ml-2">
              {props.priority ? props.priority : "p!"}
            </span>
          </div>
        </div>
        <span className="justify-items-end bg-base-200">time</span>
      </div>
      <Divider />
    </>
  );
};

const Task = (props) => {
  return (
    <>
      <div className="border-base-300 ml-10 mr-10 flex justify-between">
        <div className="flex flex-row">
          <span className="badge text-xs">9</span>
          <input className="checkbox ml-2"></input>
          <div className="flex flex-col ml-2">
            <span>{props.taskName ? props.taskName : "task"}</span>
            <span className="text-sm">
              {props.description ? props.description : "description"}
            </span>
          </div>
          <div className="flex flex-row ml-10">
            <span className="badge text-xs flex items-center">
              <CalendarIcon />
              <span className="ml-1">{props.date ? props.date : "date"}</span>
            </span>
            <span className="badge text-xs ml-2">
              {props.assignedTo ? props.assignedTo : "assignedTo"}
            </span>
            <span className="badge text-xs ml-2">
              {props.priority ? props.priority : "p!"}
            </span>
          </div>
        </div>
        <span className="justify-items-end bg-base-200">time</span>
      </div>
    </>
  );
};

const ContentTest = ({ user, project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);

  return (
    <>
      <div className="flex flex-col w-1/3">
        <div className="text-6xl ml-10">
          {project.name ? project.name : project}
        </div>
        <div>group by</div>
        <div>sort by</div>
        <div className="ml-10 mt-4">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </button>
          <div className="ml-4">
            <Task />
            {isOpen && <div className="ml-4"></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentTest;
