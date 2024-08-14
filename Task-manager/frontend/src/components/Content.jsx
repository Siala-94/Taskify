import Divider from "./Divider";
import PlusIcon from "../assets/icons/PlusIcon";

import PriorityIcon from "../assets/icons/PriorityIcon";
import LabelIcon from "../assets/icons/LabelIcon";
import Folder from "../assets/icons/Folder";
import { useState } from "react";

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-4 h-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
      />
    </svg>
  );
}
function DropDownButton({ text, children }) {
  return (
    <div className="flex dropdown dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-neutral btn-xs ">
        {children}
        {text}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
}

function TaskAdder(props) {
  return (
    <div
      className="card-rounded flex  w-96 flex-row hover:text-primary "
      onClick={props.onClick}
    >
      <PlusIcon />
      <span className="text-sm font-extralight ">add task</span>
    </div>
  );
}

function ExpandedTaskAdder(props) {
  const [inputVal, setInputVal] = useState("");
  const [descriptionVal, setDescriptionVal] = useState("");

  const handleClick = () => {
    props.handleSetTasks(inputVal, descriptionVal);
    props.onClick(false);
    setInputVal("");
    setDescriptionVal("");
  };

  return (
    <div className="card w-fit bg-base-200 gap-2">
      <form>
        <label className="input mb-1 border input-primary input-xs flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="text-sm grow"
            placeholder="Task name"
          />
        </label>
        <label className="input input-primary input-xs flex items-center gap-2">
          <input
            type="text"
            value={descriptionVal}
            onChange={(e) => setDescriptionVal(e.target.value)}
            className="text-sm grow"
            placeholder="Task description"
          />
        </label>
      </form>

      <div className="card-actions flex-wrap bg-base-200">
        <DropDownButton text="Due date">
          <CalendarIcon />
        </DropDownButton>
        <DropDownButton text="Priority">
          <PriorityIcon />
        </DropDownButton>
        <DropDownButton text="Filter">
          <LabelIcon />
        </DropDownButton>
        <DropDownButton text="Project">
          <Folder />
        </DropDownButton>
      </div>
      <button className="btn btn-primary btn-xs" onClick={handleClick}>
        <span className="text text-sx">add</span>
      </button>
      <button className="btn btn-neutral btn-xs" onClick={props.onClick}>
        cancel
      </button>
    </div>
  );
}
function Tasks({ tasks, setTasks }) {
  if (tasks.length === 0) {
    return <></>;
  }

  function handleChecked(taskId) {
    const updatedTaskList = tasks.filter((t) => t.id !== taskId);
    setTimeout(() => {
      setTasks(updatedTaskList);
    }, 400);
  }

  return (
    <div className="card w-96  p-2">
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={() => handleChecked(task.id)}
                className="checkbox checkbox-sm hover:checkbox-primary"
              />
              <div className="card">
                <span className="label-text">{task.name}</span>
                <span className="text font-thin text-sm">
                  {task.description}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionName(props) {
  return <h1 className="text-4xl font-bold">{props.name}</h1>;
}

export default function Content(props) {
  const [isPressed, setIsPressed] = useState(false);
  const [tasks, setTasks] = useState([]);

  function handleSetTasks(taskName, taskDescription) {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      description: taskDescription,
      isChecked: false,
    };
    setTasks([...tasks, newTask]);
  }
  return (
    <>
      <div className="card mt-5 ml-5 flex flex-col gap-5  w-full items-stretch">
        <SectionName name={props.section} />
        <Tasks tasks={tasks} setTasks={setTasks} />

        {isPressed ? (
          <ExpandedTaskAdder
            handleSetTasks={handleSetTasks}
            onClick={() => setIsPressed(!isPressed)}
          />
        ) : (
          <TaskAdder onClick={() => setIsPressed(!isPressed)} />
        )}
      </div>
    </>
  );
}
